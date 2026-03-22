// ─── FIREBASE CONFIG & ALL SERVICE FUNCTIONS ───
// TODO: Replace ALL placeholder values with your Firebase project config
// Get from: Firebase Console → Project Settings → Your Apps → Config

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, arrayUnion, arrayRemove, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// ═══════════════════════════════════════════════════════════
// CLOUDINARY CONFIG
// ═══════════════════════════════════════════════════════════

// Cloudinary config — reads from .env file
// TODO: Add these to your .env file:
// VITE_CLOUDINARY_CLOUD_NAME=djgpgncqk
// VITE_CLOUDINARY_UPLOAD_PRESET=ishira_products
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

// ═══════════════════════════════════════════════════════════
// CLOUDINARY UPLOAD HELPERS
// ═══════════════════════════════════════════════════════════

// Upload image to Cloudinary and return the secure URL
// No API key needed in frontend — uses unsigned upload preset
async function uploadToCloudinary(imageFile, onProgress) {
  try {
    // If no Cloudinary config, return empty string
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      console.warn('Cloudinary not configured. Storing image as base64.');
      return await convertToBase64(imageFile);
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'ishira_products'); // organizes in Cloudinary dashboard

    // Use XMLHttpRequest to track upload progress
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          // Return optimized URL with auto quality and format
          const optimizedUrl = data.secure_url.replace(
            '/upload/',
            '/upload/q_auto,f_auto,w_800/'
          );
          resolve(optimizedUrl);
        } else {
          reject(new Error('Cloudinary upload failed'));
        }
      });

      xhr.addEventListener('error', () => reject(new Error('Network error during upload')));

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Fallback to base64 if Cloudinary fails
    return await convertToBase64(imageFile);
  }
}

// Fallback: convert image to base64 string
// Used when Cloudinary is not configured
function convertToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(imageFile);
  });
}

// ═══════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════

export async function addProduct(productData, imageFile, onProgress) {
  try {
    let imageUrl = "";

    // Upload image if provided
    if (imageFile) {
      if (onProgress) onProgress(10); // show started
      imageUrl = await uploadToCloudinary(imageFile, (percent) => {
        // Map Cloudinary progress (0-100) to our progress bar (10-90)
        if (onProgress) onProgress(10 + Math.round(percent * 0.8));
      });
      if (onProgress) onProgress(95);
    }

    // Save product to Firestore
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      imageUrl,
      createdAt: serverTimestamp()
    });

    if (onProgress) onProgress(100);
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error adding product:", error);
    return { id: null, error: error.message };
  }
}

export async function getProducts() {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], error: error.message };
  }
}

export function subscribeToProducts(callback) {
  return onSnapshot(collection(db, "products"), (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(products);
  }, (error) => {
    console.error("Error subscribing to products:", error);
  });
}

export function subscribeToProductsByCategory(category, callback) {
  // Build query: if 'All', fetch everything; otherwise filter by category
  const q = category === 'All'
    ? query(collection(db, "products"))
    : query(collection(db, "products"), where("category", "==", category));

  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(products);
  }, (error) => {
    console.error("Error subscribing to products by category:", error);
  });
}

export async function updateProduct(id, updates, newImageFile, onProgress) {
  try {
    let imageUrl = updates.imageUrl || "";

    // Upload new image if provided
    if (newImageFile) {
      if (onProgress) onProgress(10);
      imageUrl = await uploadToCloudinary(newImageFile, (percent) => {
        if (onProgress) onProgress(10 + Math.round(percent * 0.8));
      });
      if (onProgress) onProgress(95);
    }

    // Update Firestore document
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, { ...updates, imageUrl, updatedAt: serverTimestamp() });

    if (onProgress) onProgress(100);
    return { error: null };
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: error.message };
  }
}

export async function deleteProduct(id) {
  try {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
    return { error: null };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════════

export async function placeOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "pending",
      whatsappSent: true,
      createdAt: serverTimestamp()
    });

    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error placing order:", error);
    return { id: null, error: error.message };
  }
}

export function subscribeToUserOrders(userId, callback) {
  // Try compound query first (requires Firestore composite index on userId + createdAt)
  return onSnapshot(
    query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    ),
    (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(orders);
    },
    (error) => {
      console.warn("Compound query failed (index may be needed). Falling back to simple query.", error.message);
      // Fallback: query without orderBy (no composite index needed), sort client-side
      onSnapshot(
        query(
          collection(db, "orders"),
          where("userId", "==", userId)
        ),
        (snapshot) => {
          const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Sort client-side: newest first
          orders.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.createdAt?.toDate?.() || new Date(0);
            return dateB - dateA;
          });
          callback(orders);
        },
        (fallbackError) => {
          console.error("Error fetching user orders:", fallbackError);
          callback([]);
        }
      );
    }
  );
}

export function subscribeToAllOrders(callback) {
  return onSnapshot(
    query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    ),
    (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(orders);
    },
    (error) => {
      console.error("Error subscribing to all orders:", error);
    }
  );
}

export async function updateOrderStatus(orderId, status) {
  try {
    const docRef = doc(db, "orders", orderId);
    await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
    return { error: null };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════════════

export async function createUserProfile(uid, { name, email, phone }) {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, {
      name,
      email,
      phone,
      createdAt: serverTimestamp(),
      measurements: null
    });
    return { error: null };
  } catch (error) {
    console.error("Error creating user profile:", error);
    return { error: error.message };
  }
}

export async function getUserProfile(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { data: { id: uid, ...snapshot.data() }, error: null };
    }
    return { data: null, error: "User profile not found" };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { data: null, error: error.message };
  }
}

export async function updateUserProfile(uid, updates) {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { error: error.message };
  }
}

export async function saveMeasurements(uid, measurements) {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, {
      measurements,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { error: null };
  } catch (error) {
    console.error("Error saving measurements:", error);
    return { error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════
// WISHLIST
// ═══════════════════════════════════════════════════════════

export async function toggleWishlistItem(uid, productId) {
  try {
    const docRef = doc(db, "wishlists", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().items && docSnap.data().items.includes(productId)) {
      // Remove from wishlist
      await setDoc(docRef, {
        items: arrayRemove(productId),
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { action: 'removed', error: null };
    } else {
      // Add to wishlist
      await setDoc(docRef, {
        items: arrayUnion(productId),
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { action: 'added', error: null };
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return { action: null, error: error.message };
  }
}

export async function getWishlist(uid) {
  try {
    const docRef = doc(db, "wishlists", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data().items || [], error: null };
    }
    return { data: [], error: null };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { data: [], error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════
// MESSAGES (Contact Form)
// ═══════════════════════════════════════════════════════════

export async function submitMessage({ name, phone, message }) {
  try {
    await addDoc(collection(db, "messages"), {
      name,
      phone,
      message,
      read: false,
      createdAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    console.error("Error submitting message:", error);
    return { error: error.message };
  }
}

export function subscribeToMessages(callback) {
  return onSnapshot(
    query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    ),
    (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    },
    (error) => {
      console.error("Error subscribing to messages:", error);
    }
  );
}

export async function markMessageRead(messageId) {
  try {
    const docRef = doc(db, "messages", messageId);
    await updateDoc(docRef, { read: true });
    return { error: null };
  } catch (error) {
    console.error("Error marking message as read:", error);
    return { error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════

export async function signUp(email, password, name, phone) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const profileError = await createUserProfile(user.uid, { name, email, phone });
    if (profileError.error) {
      throw new Error(profileError.error);
    }

    return { user, error: null };
  } catch (error) {
    console.error("Error signing up:", error);
    return { user: null, error: error.message };
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Error signing in:", error);
    return { user: null, error: error.message };
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error: error.message };
  }
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// ═══════════════════════════════════════════════════════════
// ERROR HELPER
// ═══════════════════════════════════════════════════════════

export function getAuthErrorMessage(code) {
  const messages = {
    "auth/email-already-in-use": "This email is already registered. Please sign in.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/user-not-found": "No account found with this email.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };
  return messages[code] || "Something went wrong. Please try again.";
}
