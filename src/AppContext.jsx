// ─── REACT CONTEXT: GLOBAL STATE + ALL HANDLERS ───

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  signUp as firebaseSignUp,
  signIn as firebaseSignIn,
  signOutUser as firebaseSignOut,
  onAuthChange,
  getAuthErrorMessage,
  subscribeToProducts,
  subscribeToProductsByCategory,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleWishlistItem,
  getWishlist,
  placeOrder,
  subscribeToUserOrders,
  subscribeToAllOrders,
  updateOrderStatus,
  submitMessage,
  subscribeToMessages,
  markMessageRead,
  createUserProfile,
  getUserProfile,
  saveMeasurements
} from './firebase';

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919XXXXXXXXX";
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "ishira@admin2024";

// Demo mode detection
const isDemoModeDetected = !import.meta.env.VITE_FIREBASE_API_KEY ||
  import.meta.env.VITE_FIREBASE_API_KEY === "your_api_key_here";

export const IS_DEMO = isDemoModeDetected;

export const SAMPLE_PRODUCTS = [
  { id:"p1", name:"Kanjivaram Silk Saree",    category:"Saree",  price:8500,  originalPrice:10000, description:"A timeless Kanjivaram silk saree with rich zari borders and traditional temple motifs. Perfect for weddings.", imageUrl:"", inStock:true },
  { id:"p2", name:"Organza Floral Saree",     category:"Saree",  price:4200,  originalPrice:5500,  description:"Lightweight organza saree with delicate floral embroidery. Ideal for festive occasions.", imageUrl:"", inStock:true },
  { id:"p3", name:"Heavy Zari Blouse",        category:"Blouse", price:2800,  originalPrice:3500,  description:"Heavily embellished blouse with gold zari work and mirror accents. Custom stitching available.", imageUrl:"", inStock:true },
  { id:"p4", name:"Mirror Work Blouse",       category:"Blouse", price:1950,  originalPrice:2400,  description:"Contemporary mirror-work blouse with geometric patterns. Multiple neckline designs available.", imageUrl:"", inStock:true },
  { id:"p5", name:"Gold Thread Kuchu (Pair)", category:"Kuchu",  price:350,   originalPrice:450,   description:"Handcrafted saree tassel pair with gold thread and pearl drops.", imageUrl:"", inStock:true },
  { id:"p6", name:"Pearl Drop Kuchu (Pair)",  category:"Kuchu",  price:450,   originalPrice:580,   description:"Premium saree kuchu with cascading pearl drops and gold thread weave.", imageUrl:"", inStock:true },
  { id:"p7", name:"Kids Lehenga Set",         category:"Kids",   price:5600,  originalPrice:6800,  description:"Beautifully crafted lehenga set for little girls. Includes choli, lehenga, and dupatta.", imageUrl:"", inStock:true },
  { id:"p8", name:"Embroidered Kids Frock",   category:"Kids",   price:1200,  originalPrice:1600,  description:"Elegant embroidered frock for girls. Available in sizes 2-12 years.", imageUrl:"", inStock:true },
];

// ═══════════════════════════════════════════════════════════
// CONTEXT & PROVIDER
// ═══════════════════════════════════════════════════════════

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ─── Products
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // ─── Auth
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ─── Cart
  const [cart, setCart] = useState([]);

  // ─── Wishlist
  const [wishlist, setWishlist] = useState([]);

  // ─── Orders
  const [userOrders, setUserOrders] = useState([]);

  // ─── Admin
  // FIX: Bug 6 - Initialize admin panel with sample orders and messages in demo mode
  const [allOrders, setAllOrders] = useState([
    {
      id: 'ORD001',
      items: [{name:'Kanjivaram Silk Saree', quantity:1, price:8500}],
      totalAmount: 8500,
      customerName: 'Priya Gowda',
      customerPhone: '9876543210',
      customerAddress: 'Hassan, Karnataka - 573201',
      status: 'confirmed',
      createdAt: { toDate: () => new Date('2024-03-15') }
    },
    {
      id: 'ORD002',
      items: [{name:'Mirror Work Blouse', quantity:1, price:1950}],
      totalAmount: 1950,
      customerName: 'Kavitha Nair',
      customerPhone: '9845672310',
      customerAddress: 'Mysuru, Karnataka - 570001',
      status: 'pending',
      createdAt: { toDate: () => new Date('2024-03-18') }
    }
  ]);
  const [allMessages, setAllMessages] = useState([
    {
      id: 'MSG001',
      name: 'Rekha Gowda',
      phone: '9876543210',
      message: 'I need a custom blouse stitched for my wedding. Can I visit your shop?',
      read: false,
      createdAt: { toDate: () => new Date('2024-03-20') }
    },
    {
      id: 'MSG002',
      name: 'Ananya Kumar',
      phone: '9845672310',
      message: 'Do you have heavy silk sarees for a reception? What are the price ranges?',
      read: true,
      createdAt: { toDate: () => new Date('2024-03-19') }
    }
  ]);
  const [adminMode, setAdminMode] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  // ─── UI
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState('profile');
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ─── Demo Mode
  const [isDemoMode, setIsDemoMode] = useState(isDemoModeDetected);

  // ─── Upload Progress
  const [uploadProgress, setUploadProgress] = useState(0);

  // ═══════════════════════════════════════════════════════════
  // TOAST HANDLER
  // ═══════════════════════════════════════════════════════════

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => {
      const updated = [...prev, { id, message, type }];
      return updated.slice(-3);
    });

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  // ═══════════════════════════════════════════════════════════
  // PRODUCTS LOADING
  // ═══════════════════════════════════════════════════════════

  // Products loading — re-subscribes when activeFilter changes
  useEffect(() => {
    setProductsLoading(true);
    if (IS_DEMO) {
      // Demo mode: filter SAMPLE_PRODUCTS client-side
      const filtered = activeFilter === 'All'
        ? SAMPLE_PRODUCTS
        : SAMPLE_PRODUCTS.filter(p => p.category === activeFilter);
      setProducts(filtered);
      setProductsLoading(false);
    } else {
      // Firebase: subscribe with category filter for real-time updates
      const unsub = subscribeToProductsByCategory(activeFilter, (prods) => {
        setProducts(prods);
        setProductsLoading(false);
      });
      return () => unsub();
    }
  }, [activeFilter]);

  // ═══════════════════════════════════════════════════════════
  // AUTH HANDLERS
  // ═══════════════════════════════════════════════════════════

  const handleSignUp = useCallback(async (email, password, name, phone) => {
    try {
      const { user, error } = await firebaseSignUp(email, password, name, phone);
      if (error) {
        showToast(getAuthErrorMessage(error), 'error');
        return { error };
      }

      const profileResult = await getUserProfile(user.uid);
      if (profileResult.data) {
        setUserProfile(profileResult.data);
      }

      const wishlistResult = await getWishlist(user.uid);
      setWishlist(wishlistResult.data || []);

      setActiveModal(null);
      showToast(`Welcome, ${name}! 🌸`, 'success');
      return { error: null };
    } catch (error) {
      showToast('Sign up failed. Please try again.', 'error');
      return { error: error.message };
    }
  }, [showToast]);

  const handleSignIn = useCallback(async (email, password) => {
    try {
      const { user, error } = await firebaseSignIn(email, password);
      if (error) {
        showToast(getAuthErrorMessage(error), 'error');
        return { error };
      }

      const profileResult = await getUserProfile(user.uid);
      if (profileResult.data) {
        setUserProfile(profileResult.data);
      }

      const wishlistResult = await getWishlist(user.uid);
      setWishlist(wishlistResult.data || []);

      subscribeToUserOrders(user.uid, (orders) => {
        setUserOrders(orders);
      });

      setActiveModal(null);
      showToast('Signed in successfully! 🌸', 'success');
      return { error: null };
    } catch (error) {
      showToast('Sign in failed. Please try again.', 'error');
      return { error: error.message };
    }
  }, [showToast]);

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await firebaseSignOut();
      if (error) {
        showToast('Sign out failed.', 'error');
        return { error };
      }

      setCurrentUser(null);
      setUserProfile(null);
      setWishlist([]);
      setUserOrders([]);
      setCart([]);
      setAdminMode(false);
      showToast('Signed out successfully', 'success');
      return { error: null };
    } catch (error) {
      showToast('Sign out failed.', 'error');
      return { error: error.message };
    }
  }, [showToast]);

  // ═══════════════════════════════════════════════════════════
  // CART HANDLERS
  // ═══════════════════════════════════════════════════════════

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added to cart 🛍️`, 'success');
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Removed from cart', 'info');
  }, [showToast]);

  const updateCartQty = useCallback((productId, delta) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // ═══════════════════════════════════════════════════════════
  // WISHLIST HANDLER
  // ═══════════════════════════════════════════════════════════

  // FIX: Bug 5 - handleWishlistToggle with optimistic updates
  const handleWishlistToggle = useCallback(async (productId) => {
    if (!currentUser) {
      setActiveModal('auth');
      showToast('Sign in to save to wishlist', 'info');
      return;
    }

    // Toggle in local state immediately (optimistic update)
    const isInWishlist = wishlist.includes(productId);
    if (isInWishlist) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Added to wishlist ♥', 'success');
    }

    // Sync to Firebase if not demo
    if (!IS_DEMO) {
      try {
        await toggleWishlistItem(currentUser.uid, productId);
      } catch (error) {
        showToast('Failed to sync wishlist', 'error');
      }
    }
  }, [currentUser, wishlist, IS_DEMO, showToast]);

  // ═══════════════════════════════════════════════════════════
  // CHECKOUT & WHATSAPP
  // ═══════════════════════════════════════════════════════════

  const buildWhatsAppMessage = useCallback((formData) => {
    const itemsList = cart.map(i =>
      `• ${i.name} × ${i.quantity} — ₹${(i.price * i.quantity).toLocaleString('en-IN')}`
    ).join('\n');

    return `Hi Ishira House of Fashion! 🌸\n\n*New Order from ${formData.name}*\n\n*Items Ordered:*\n${itemsList}\n\n*Total: ₹${getCartTotal().toLocaleString('en-IN')}*\n\n*Delivery Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}${formData.email ? '\nEmail: ' + formData.email : ''}\n\nPlease confirm availability and delivery timeline. Thank you!`;
  }, [cart, getCartTotal]);

  const handlePlaceOrder = useCallback(async (formData) => {
    try {
      // FIX: Bug 6 - Add new order to admin panel state with measurements if logged in
      const newOrder = {
        id: 'ORD' + Date.now(),
        items: cart.map(i => ({name:i.name, quantity:i.quantity, price:i.price})),
        totalAmount: getCartTotal(),
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        customerEmail: formData.email || '',
        userId: currentUser?.uid || null,
        measurements: userProfile?.measurements || null,
        status: 'pending',
        createdAt: { toDate: () => new Date() }
      };
      setAllOrders(prev => [newOrder, ...prev]);
      if (currentUser) { setUserOrders(prev => [newOrder, ...prev]); }

      const orderData = {
        items: cart,
        totalAmount: getCartTotal(),
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        customerCity: formData.city,
        customerPincode: formData.pincode,
        customerEmail: formData.email || '',
        userId: currentUser?.uid || null,
        isGuest: !currentUser,
        measurements: userProfile?.measurements || null
      };

      if (!IS_DEMO) {
        const result = await placeOrder(orderData);
        if (result.error) {
          showToast('Failed to place order', 'error');
          return;
        }
      }

      const message = buildWhatsAppMessage(formData);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        '_blank'
      );

      clearCart();
      setActiveModal(null);
      setCartOpen(false);
      showToast('Order placed! Check WhatsApp to confirm 🌸', 'success');
    } catch (error) {
      showToast('Error placing order', 'error');
    }
  }, [cart, currentUser, userProfile, IS_DEMO, getCartTotal, buildWhatsAppMessage, clearCart, showToast]);

  // ═══════════════════════════════════════════════════════════
  // ADMIN HANDLERS
  // ═══════════════════════════════════════════════════════════

  const handleLogoClick = useCallback(() => {
    setLogoClickCount(prev => prev + 1);

    if (logoClickCount + 1 === 3) {
      showToast('Keep clicking... 2 more!', 'info');
    }

    if (logoClickCount + 1 === 5) {
      setActiveModal('admin-gate');
      setLogoClickCount(0);
    }

    setTimeout(() => {
      setLogoClickCount(0);
    }, 3000);
  }, [logoClickCount, showToast]);

  // FIX: Bug 6 - verifyAdminPassword with demo data support
  const verifyAdminPassword = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      setAdminMode(true);

      // In demo mode, allOrders and allMessages already have sample data
      // In production, subscribe to real data
      if (!IS_DEMO) {
        subscribeToAllOrders((orders) => {
          setAllOrders(orders);
        });

        subscribeToMessages((messages) => {
          setAllMessages(messages);
        });
      }

      setActiveModal(null);
      showToast('Welcome, Admin! 👑', 'success');
      return true;
    } else {
      showToast('Incorrect password. Try again.', 'error');
      return false;
    }
  }, [IS_DEMO, showToast]);

  const handleAdminAddProduct = useCallback(async (productData, imageFile) => {
    try {
      const result = await addProduct(productData, imageFile, (progress) => {
        setUploadProgress(progress);
      });
      if (result.error) {
        showToast('Failed to add product', 'error');
        return;
      }
      setUploadProgress(0);
      showToast('Product added successfully! ✓', 'success');
    } catch (error) {
      showToast('Error adding product', 'error');
      setUploadProgress(0);
    }
  }, [showToast]);

  const handleAdminUpdateProduct = useCallback(async (id, updates, imageFile) => {
    try {
      const result = await updateProduct(id, updates, imageFile, (progress) => {
        setUploadProgress(progress);
      });
      if (result.error) {
        showToast('Failed to update product', 'error');
        return;
      }
      setUploadProgress(0);
      showToast('Product updated successfully! ✓', 'success');
    } catch (error) {
      showToast('Error updating product', 'error');
      setUploadProgress(0);
    }
  }, [showToast]);

  const handleAdminDeleteProduct = useCallback(async (id) => {
    // FIX: Bug 2 - Remove from local products state immediately
    setProducts(prev => prev.filter(p => p.id !== id));
    
    // Delete from Firebase if not demo
    if (!IS_DEMO) {
      try {
        const result = await deleteProduct(id);
        if (result.error) {
          showToast('Failed to delete: ' + result.error, 'error');
        }
      } catch (error) {
        showToast('Error deleting product', 'error');
      }
    }
  }, [IS_DEMO, showToast]);

  const handleAdminUpdateOrderStatus = useCallback(async (orderId, status) => {
    // FIX: Bug 1 - Update local state first (optimistic)
    setAllOrders(prev =>
      prev.map(o => o.id === orderId ? {...o, status} : o)
    );
    setUserOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
    
    // Update Firebase if not demo
    if (!IS_DEMO) {
      try {
        const result = await updateOrderStatus(orderId, status);
        if (result.error) {
          showToast('Failed to update status', 'error');
        }
      } catch (error) {
        showToast('Error updating order', 'error');
      }
    }
    showToast('Status updated to ' + status, 'success');
  }, [IS_DEMO, showToast]);

  const handleAdminMarkMessageRead = useCallback(async (messageId) => {
    // Update local state immediately (optimistic)
    setAllMessages(prev =>
      prev.map(m => m.id === messageId ? {...m, read: true} : m)
    );
    
    // Update Firebase if not demo
    if (!IS_DEMO) {
      try {
        const result = await markMessageRead(messageId);
        if (result.error) {
          showToast('Failed to mark message', 'error');
        }
      } catch (error) {
        showToast('Error marking message', 'error');
      }
    }
  }, [IS_DEMO, showToast]);

  // ═══════════════════════════════════════════════════════════
  // MOUNT EFFECTS
  // ═══════════════════════════════════════════════════════════

  useEffect(() => {
    let ordersUnsub = null;

    const unsubscribe = onAuthChange(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user profile (includes measurements)
        try {
          const profileResult = await getUserProfile(user.uid);
          if (profileResult.data) {
            setUserProfile(profileResult.data);
          }
        } catch (e) {
          console.error('Error loading profile:', e);
        }

        // Fetch wishlist
        try {
          const wishlistResult = await getWishlist(user.uid);
          setWishlist(wishlistResult.data || []);
        } catch (e) {
          console.error('Error loading wishlist:', e);
        }

        // Subscribe to user orders (cleanup previous subscription first)
        if (ordersUnsub) {
          ordersUnsub();
          ordersUnsub = null;
        }
        try {
          ordersUnsub = subscribeToUserOrders(user.uid, (orders) => {
            setUserOrders(orders);
          });
        } catch (e) {
          console.error('Error subscribing to orders:', e);
        }
      } else {
        // User logged out — clean up
        if (ordersUnsub) {
          ordersUnsub();
          ordersUnsub = null;
        }
        setUserProfile(null);
        setWishlist([]);
        setUserOrders([]);
      }
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
      if (ordersUnsub) {
        ordersUnsub();
      }
    };
  }, []);

  // ═══════════════════════════════════════════════════════════
  // BROWSER HISTORY & BACK BUTTON MANAGEMENT
  // ═══════════════════════════════════════════════════════════

  const [popstateActive, setPopstateActive] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setPopstateActive(true);
      // Close any open modals/drawers
      if (activeModal || accountOpen || cartOpen || selectedProduct) {
        setActiveModal(null);
        setAccountOpen(false);
        setCartOpen(false);
        setSelectedProduct(null);
      }
      
      // Update filter based on URL hash
      const hash = window.location.hash.toLowerCase();
      if (hash === '#sarees') setActiveFilter('Saree');
      else if (hash === '#blouses') setActiveFilter('Blouse');
      else if (hash === '#kuchu') setActiveFilter('Kuchu');
      else if (hash === '#kids') setActiveFilter('Kids');
      else setActiveFilter('All');
      
      setTimeout(() => setPopstateActive(false), 50);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeModal, accountOpen, cartOpen, selectedProduct]);

  // Push state for category tab navigation
  useEffect(() => {
    if (!popstateActive) {
      if (activeFilter === 'All') {
        if (window.location.hash) {
          window.history.pushState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        const map = { Saree: 'sarees', Blouse: 'blouses', Kuchu: 'kuchu', Kids: 'kids' };
        const newHash = `#${map[activeFilter]}`;
        if (window.location.hash !== newHash) {
          window.history.pushState(null, '', newHash);
        }
      }
    }
  }, [activeFilter, popstateActive]);

  // Push state to trap back button when modal opens
  const [modalStatePushed, setModalStatePushed] = useState(false);
  useEffect(() => {
    const isAnyModalOpen = activeModal || accountOpen || cartOpen || !!selectedProduct;
    if (isAnyModalOpen && !modalStatePushed && !popstateActive) {
      window.history.pushState({ modal: true }, '', window.location.hash || window.location.pathname + window.location.search);
      setModalStatePushed(true);
    } else if (!isAnyModalOpen && modalStatePushed) {
      setModalStatePushed(false);
    }
  }, [activeModal, accountOpen, cartOpen, selectedProduct, modalStatePushed, popstateActive]);

  // ═══════════════════════════════════════════════════════════
  // CONTEXT VALUE
  // ═══════════════════════════════════════════════════════════

  const value = {
    // State
    products,
    productsLoading,
    currentUser,
    userProfile,
    authLoading,
    cart,
    wishlist,
    userOrders,
    allOrders,
    allMessages,
    adminMode,
    activeModal,
    selectedProduct,
    activeFilter,
    accountOpen,
    activeAccountTab,
    cartOpen,
    toasts,
    isDemoMode,
    uploadProgress,

    // Setters
    setActiveModal,
    setSelectedProduct,
    setActiveFilter,
    setAccountOpen,
    setActiveAccountTab,
    setCartOpen,
    setAdminMode,
    setAllOrders,
    setAllMessages,
    setUserOrders,
    setUserProfile,
    setUploadProgress,

    // Handlers
    showToast,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    getCartTotal,
    getCartCount,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleWishlistToggle,
    handlePlaceOrder,
    handleLogoClick,
    verifyAdminPassword,
    handleAdminAddProduct,
    handleAdminUpdateProduct,
    handleAdminDeleteProduct,
    handleAdminUpdateOrderStatus,
    handleAdminMarkMessageRead,

    // Constants
    WHATSAPP_NUMBER,
    ADMIN_PASSWORD,
    IS_DEMO,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════
// CUSTOM HOOK
// ═══════════════════════════════════════════════════════════

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
