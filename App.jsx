import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  Cable,
  Search,
  ShoppingBag,
  Heart,
  User,
  Home,
  Grid,
  ChevronLeft,
  ChevronRight,
  Bell,
  Check,
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Sparkles,
  Wifi,
  WifiOff,
  Camera,
  Image as ImageIcon,
  Settings,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Share2,
  Menu,
  SlidersHorizontal,
  ArrowRight,
  Star,
  Lock,
  Eye,
  EyeOff,
  Compass,
  RefreshCw,
} from "lucide-react";

/**
 * ============================================================================
 * 1. APP CONFIGURATION
 * ============================================================================
 */
const APP_CONFIG = {
  appName: "Apple Store MY",
  legalName: "Apple Malaysia Sdn. Bhd.",
  appVersion: "4.18.0-my",
  buildNumber: 20261121,
  metadata: {
    description: "Official Apple Store Mobile Experience for Malaysia",
    supportEmail: "mysupport@apple.com",
    supportPhone: "1800-80-6419",
    storeLocation: "Apple The Exchange TRX, Kuala Lumpur",
  },
  features: {
    enableApplePay: true,
    enableFPX: true,
    enableGrabPay: true,
    enableExpressPickupTRX: true,
    enableTradeIn: true,
    enableARPreview: true,
    enableOfflineMode: true,
  },
};

/**
 * ============================================================================
 * 2. CONSTANTS & ENVIRONMENT
 * ============================================================================
 */
const ENV_CONSTANTS = {
  api: {
    baseUrl: "https://api.store.apple.com/my/v4",
    timeoutMs: 8000,
    retryAttempts: 2,
  },
  market: {
    countryCode: "MY",
    countryName: "Malaysia",
    taxRateSST: 0.0, // Malaysia SST exemption on personal computing/phones or included in MSRP
    freeShippingThresholdMYR: 250,
    standardShippingFeeMYR: 15,
    expressShippingFeeMYR: 35,
    eastMalaysiaSurchargeMYR: 20, // Sabah & Sarawak
    states: [
      "WP Kuala Lumpur",
      "Selangor",
      "Pulau Pinang",
      "Johor",
      "Perak",
      "Negeri Sembilan",
      "Melaka",
      "Pahang",
      "Kedah",
      "Terengganu",
      "Kelantan",
      "Perlis",
      "Sabah",
      "Sarawak",
      "WP Putrajaya",
      "WP Labuan",
    ],
  },
  currency: {
    code: "MYR",
    symbol: "RM",
    locale: "en-MY",
    decimals: 2,
  },
  language: {
    default: "en-MY",
    supported: [
      { code: "en-MY", label: "English (Malaysia)" },
      { code: "ms-MY", label: "Bahasa Melayu" },
      { code: "zh-MY", label: "简体中文" },
    ],
  },
  storageKeys: {
    AUTH_USER: "@apple_my_auth_user_v1",
    SECURE_TOKEN: "@apple_my_secure_token_v1",
    CART_ITEMS: "@apple_my_cart_v1",
    WISHLIST_IDS: "@apple_my_wishlist_v1",
    ORDERS_LIST: "@apple_my_orders_v1",
    ADDRESSES: "@apple_my_addresses_v1",
    ONBOARDING_DONE: "@apple_my_onboarding_done_v1",
    APP_SETTINGS: "@apple_my_settings_v1",
  },
};

/**
 * ============================================================================
 * 3. THEME & DESIGN SYSTEM
 * ============================================================================
 */
const THEME = {
  colors: {
    light: {
      bgPrimary: "#F5F5F7",
      bgSecondary: "#FFFFFF",
      bgTertiary: "#E8E8ED",
      textPrimary: "#1D1D1F",
      textSecondary: "#6E6E73",
      textTertiary: "#86868B",
      accent: "#0071E3",
      accentHover: "#0077ED",
      accentSoft: "rgba(0, 113, 227, 0.1)",
      border: "#D2D2D7",
      borderSubtle: "rgba(0, 0, 0, 0.06)",
      success: "#28CD41",
      warning: "#FF9F0A",
      danger: "#FF3B30",
      cardGlass: "rgba(255, 255, 255, 0.82)",
    },
    dark: {
      bgPrimary: "#000000",
      bgSecondary: "#1C1C1E",
      bgTertiary: "#2C2C2E",
      textPrimary: "#F5F5F7",
      textSecondary: "#A1A1A6",
      textTertiary: "#6E6E73",
      accent: "#2997FF",
      accentHover: "#40A9FF",
      accentSoft: "rgba(41, 151, 255, 0.15)",
      border: "#38383A",
      borderSubtle: "rgba(255, 255, 255, 0.08)",
      success: "#32D74B",
      warning: "#FFD60A",
      danger: "#FF453A",
      cardGlass: "rgba(28, 28, 30, 0.84)",
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif',
    scale: {
      hero: "text-3xl font-bold tracking-tight",
      h1: "text-2xl font-bold tracking-tight",
      h2: "text-xl font-semibold tracking-tight",
      h3: "text-base font-semibold",
      body: "text-sm font-normal",
      caption: "text-xs font-medium",
      micro: "text-[11px] font-medium tracking-wide uppercase",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: "10px",
    md: "16px",
    lg: "22px",
    xl: "28px",
    pill: "9999px",
  },
  shadows: {
    soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
    elevated: "0 12px 32px rgba(0, 0, 0, 0.12)",
  },
  tokens: {
    headerHeight: 56,
    tabBarHeight: 68,
    statusBarHeight: 44,
  },
};

/**
 * ============================================================================
 * 4. GLOBAL STYLES (Injected CSS for Smooth Scrollbars & Apple-like Animations)
 * ============================================================================
 */
const GlobalStyles = () => (
  <style>{`
    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes sheetSlideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    @keyframes pulseSubtle {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.55; }
    }
    .animate-fade-up {
      animation: fadeSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-sheet-up {
      animation: sheetSlideUp 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-pulse-subtle {
      animation: pulseSubtle 1.8s infinite ease-in-out;
    }
  `}</style>
);

/**
 * ============================================================================
 * 5. DEVICE & PLATFORM
 * ============================================================================
 */
const useDevicePlatform = () => {
  const [platform, setPlatform] = useState("ios"); // 'ios' | 'android'
  const [dimensions, setDimensions] = useState({ width: 393, height: 852 });
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) {
        setKeyboardOpen(true);
      }
    };
    const handleFocusOut = () => setKeyboardOpen(false);
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const deviceConfig = useMemo(
    () => ({
      platform,
      isIOS: platform === "ios",
      isAndroid: platform === "android",
      safeArea: {
        top: platform === "ios" ? 44 : 28,
        bottom: platform === "ios" ? 24 : 12,
      },
      statusBar: {
        style: "adaptive",
        carrier: "Maxis 5G",
        battery: 94,
      },
      dimensions,
      keyboardOpen,
      togglePlatform: () =>
        setPlatform((prev) => (prev === "ios" ? "android" : "ios")),
    }),
    [platform, dimensions, keyboardOpen]
  );

  return deviceConfig;
};

/**
 * ============================================================================
 * 13. DATA MODELS & SCHEMAS (Validators & Factories)
 * ============================================================================
 */
const Schemas = {
  createProduct: (raw) => ({
    id: String(raw.id),
    categoryId: String(raw.categoryId),
    name: String(raw.name),
    tagline: String(raw.tagline || ""),
    description: String(raw.description || ""),
    basePriceMYR: Number(raw.basePriceMYR || 0),
    badge: raw.badge || null,
    rating: Number(raw.rating || 4.9),
    reviewCount: Number(raw.reviewCount || 128),
    image: String(raw.image),
    gallery: Array.isArray(raw.gallery) ? raw.gallery : [raw.image],
    colors: Array.isArray(raw.colors) ? raw.colors : [],
    storages: Array.isArray(raw.storages) ? raw.storages : [],
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    specs: Array.isArray(raw.specs) ? raw.specs : [],
    inStock: raw.inStock !== false,
    stockCount: Number(raw.stockCount ?? 15),
    trxPickupAvailable: raw.trxPickupAvailable !== false,
  }),
  createCartItem: ({ product, selectedColor, selectedStorage, selectedSize, quantity = 1, unitPriceMYR }) => ({
    cartItemId: `${product.id}_${selectedColor?.name || "std"}_${selectedStorage?.label || "std"}_${selectedSize?.label || "std"}`,
    productId: product.id,
    name: product.name,
    image: product.image,
    selectedColor,
    selectedStorage,
    selectedSize,
    quantity: Math.max(1, Number(quantity)),
    unitPriceMYR: Number(unitPriceMYR),
  }),
  createAddress: (data) => ({
    id: data.id || `addr_${Date.now()}`,
    label: data.label || "Home",
    recipientName: data.recipientName || "",
    phone: data.phone || "",
    line1: data.line1 || "",
    line2: data.line2 || "",
    postcode: data.postcode || "",
    city: data.city || "",
    state: data.state || "WP Kuala Lumpur",
    isDefault: Boolean(data.isDefault),
  }),
  createOrder: (data) => ({
    orderNumber: `MY${Math.floor(10000000 + Math.random() * 90000000)}`,
    createdAt: new Date().toISOString(),
    status: "Processing",
    items: data.items || [],
    customer: data.customer || {},
    shippingAddress: data.shippingAddress || {},
    deliveryMethod: data.deliveryMethod || "standard",
    paymentMethod: data.paymentMethod || "apple_pay",
    promoCode: data.promoCode || null,
    summary: data.summary || {},
    timeline: [
      { title: "Order Placed", time: "Just now", completed: true },
      { title: "Processing at Apple Malaysia", time: "Estimated today", completed: true },
      { title: "Shipped via DHL Express MY", time: "Tomorrow", completed: false },
      { title: "Delivered", time: "In 2–3 business days", completed: false },
    ],
  }),
};

/**
 * ============================================================================
 * 16 & 17. LOCAL STORAGE & SECURE STORAGE
 * ============================================================================
 */
const LocalStorageService = {
  get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
  },
};

const SecureStorageService = {
  // Simulates encrypted Keychain / Keystore storage
  setToken(token) {
    try {
      const encoded = btoa(`MY_KEYCHAIN::${token}`);
      window.localStorage.setItem(ENV_CONSTANTS.storageKeys.SECURE_TOKEN, encoded);
    } catch (e) {
      // ignore
    }
  },
  getToken() {
    try {
      const raw = window.localStorage.getItem(ENV_CONSTANTS.storageKeys.SECURE_TOKEN);
      if (!raw) return null;
      const decoded = atob(raw);
      return decoded.replace("MY_KEYCHAIN::", "");
    } catch (e) {
      return null;
    }
  },
  clearToken() {
    LocalStorageService.remove(ENV_CONSTANTS.storageKeys.SECURE_TOKEN);
  },
};

/**
 * ============================================================================
 * 19. PRODUCT CATALOG (Malaysia Pricing in MYR / RM)
 * ============================================================================
 */
const CATEGORIES_DATA = [
  { id: "iphone", name: "iPhone", subtitle: "Titanium. So strong. So light.", icon: "Smartphone" },
  { id: "mac", name: "Mac", subtitle: "Supercharged by Apple silicon.", icon: "Laptop" },
  { id: "ipad", name: "iPad", subtitle: "Lovable. Drawable. Magical.", icon: "Tablet" },
  { id: "watch", name: "Apple Watch", subtitle: "Smarter. Brighter. Mightier.", icon: "Watch" },
  { id: "airpods", name: "AirPods", subtitle: "Adaptive Audio. Pure magic.", icon: "Headphones" },
  { id: "accessories", name: "Accessories", subtitle: "MagSafe, cases & essentials.", icon: "Cable" },
];

const PRODUCT_CATALOG_RAW = [
  {
    id: "iphone-16-pro-max",
    categoryId: "iphone",
    name: "iPhone 16 Pro Max",
    tagline: "Hello, Apple Intelligence.",
    description:
      "Forged in aerospace-grade titanium with the A18 Pro chip, Camera Control, and a 6.9-inch Super Retina XDR display.",
    basePriceMYR: 5999,
    badge: "New",
    rating: 4.95,
    reviewCount: 842,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Desert Titanium", hex: "#C2A88F" },
      { name: "Natural Titanium", hex: "#9A9893" },
      { name: "White Titanium", hex: "#F2F1ED" },
      { name: "Black Titanium", hex: "#2C2C2E" },
    ],
    storages: [
      { label: "256GB", priceDeltaMYR: 0 },
      { label: "512GB", priceDeltaMYR: 1000 },
      { label: "1TB", priceDeltaMYR: 2000 },
    ],
    sizes: [{ label: '6.9" Display', priceDeltaMYR: 0 }],
    specs: [
      "6.9-inch Super Retina XDR display with ProMotion",
      "A18 Pro chip with 6-core GPU",
      "48MP Fusion + 48MP Ultra Wide + 5x Telephoto",
      "Up to 33 hours video playback",
    ],
    stockCount: 18,
  },
  {
    id: "iphone-16",
    categoryId: "iphone",
    name: "iPhone 16",
    tagline: "A total powerhouse.",
    description:
      "Featuring Camera Control, Action button, A18 chip, and vibrant colour-infused back glass.",
    basePriceMYR: 3999,
    badge: "Popular",
    rating: 4.88,
    reviewCount: 519,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Ultramarine", hex: "#4D69D8" },
      { name: "Teal", hex: "#509E9B" },
      { name: "Pink", hex: "#F3A6C8" },
      { name: "Black", hex: "#232325" },
    ],
    storages: [
      { label: "128GB", priceDeltaMYR: 0 },
      { label: "256GB", priceDeltaMYR: 500 },
      { label: "512GB", priceDeltaMYR: 1500 },
    ],
    sizes: [
      { label: '6.1" iPhone 16', priceDeltaMYR: 0 },
      { label: '6.7" iPhone 16 Plus', priceDeltaMYR: 500 },
    ],
    specs: [
      "Super Retina XDR OLED display",
      "A18 chip with 5-core GPU",
      "Advanced dual-camera system (48MP Fusion)",
      "USB-C connector & MagSafe",
    ],
    stockCount: 25,
  },
  {
    id: "macbook-pro-14-m4",
    categoryId: "mac",
    name: 'MacBook Pro 14"',
    tagline: "Mind-blowing. Head-turning.",
    description:
      "Powered by the M4 Pro chip with Liquid Retina XDR display, Thunderbolt 5 ports, and up to 24 hours battery life.",
    basePriceMYR: 6999,
    badge: "M4 Chip",
    rating: 4.97,
    reviewCount: 410,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Space Black", hex: "#242527" },
      { name: "Silver", hex: "#E3E4E6" },
    ],
    storages: [
      { label: "512GB SSD", priceDeltaMYR: 0 },
      { label: "1TB SSD", priceDeltaMYR: 800 },
      { label: "2TB SSD", priceDeltaMYR: 2400 },
    ],
    sizes: [
      { label: "16GB Unified Memory", priceDeltaMYR: 0 },
      { label: "24GB Unified Memory", priceDeltaMYR: 800 },
    ],
    specs: [
      "Apple M4 chip with 10-core CPU & 10-core GPU",
      "14.2-inch Liquid Retina XDR display",
      "Three Thunderbolt 4 ports, HDMI, SDXC, MagSafe 3",
      "Magic Keyboard with Touch ID (MY/US Layout)",
    ],
    stockCount: 9,
  },
  {
    id: "macbook-air-13-m3",
    categoryId: "mac",
    name: 'MacBook Air 13"',
    tagline: "Lean. Mean. M3 machine.",
    description:
      "Strikingly thin and fast so you can work, play or create anywhere in Malaysia.",
    basePriceMYR: 4799,
    badge: "Best Value",
    rating: 4.92,
    reviewCount: 678,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Midnight", hex: "#2E3642" },
      { name: "Starlight", hex: "#F0E5D3" },
      { name: "Space Grey", hex: "#7D7E80" },
      { name: "Silver", hex: "#E3E4E6" },
    ],
    storages: [
      { label: "256GB SSD", priceDeltaMYR: 0 },
      { label: "512GB SSD", priceDeltaMYR: 800 },
    ],
    sizes: [
      { label: '13.6" Liquid Retina', priceDeltaMYR: 0 },
      { label: '15.3" Liquid Retina', priceDeltaMYR: 900 },
    ],
    specs: [
      "Apple M3 chip with 8-core CPU",
      "Up to 18 hours of battery life",
      "1080p FaceTime HD camera",
      "Fanless silent aluminum enclosure",
    ],
    stockCount: 14,
  },
  {
    id: "ipad-pro-m4",
    categoryId: "ipad",
    name: "iPad Pro (M4)",
    tagline: "Thinpossible.",
    description:
      "The thinnest Apple product ever created, featuring Ultra Retina XDR tandem OLED and Apple M4 performance.",
    basePriceMYR: 4599,
    badge: "Ultra Retina XDR",
    rating: 4.94,
    reviewCount: 289,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Space Black", hex: "#252628" },
      { name: "Silver", hex: "#E2E3E5" },
    ],
    storages: [
      { label: "256GB", priceDeltaMYR: 0 },
      { label: "512GB", priceDeltaMYR: 900 },
      { label: "1TB", priceDeltaMYR: 2700 },
    ],
    sizes: [
      { label: '11" Wi-Fi', priceDeltaMYR: 0 },
      { label: '13" Wi-Fi', priceDeltaMYR: 1400 },
    ],
    specs: [
      "Tandem OLED Ultra Retina XDR display",
      "Apple M4 chip with Neural Engine",
      "Supports Apple Pencil Pro & Magic Keyboard",
      "12MP Wide camera & LiDAR Scanner",
    ],
    stockCount: 11,
  },
  {
    id: "apple-watch-series-10",
    categoryId: "watch",
    name: "Apple Watch Series 10",
    tagline: "Thinstant classic.",
    description:
      "Our biggest display and thinnest design yet, with water temperature sensors and sleep apnea notifications.",
    basePriceMYR: 1799,
    badge: "New",
    rating: 4.89,
    reviewCount: 344,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Jet Black", hex: "#1B1B1D" },
      { name: "Rose Gold", hex: "#E7C5B8" },
      { name: "Silver Aluminum", hex: "#E0E2E5" },
    ],
    storages: [{ label: "GPS", priceDeltaMYR: 0 }, { label: "GPS + Cellular", priceDeltaMYR: 450 }],
    sizes: [
      { label: "42mm", priceDeltaMYR: 0 },
      { label: "46mm", priceDeltaMYR: 150 },
    ],
    specs: [
      "Wide-angle Always-On Retina OLED display",
      "S10 SiP with Double Tap gesture",
      "Faster charging: 80% in 30 minutes",
      "Water resistant 50m",
    ],
    stockCount: 22,
  },
  {
    id: "airpods-pro-2",
    categoryId: "airpods",
    name: "AirPods Pro (2nd Gen)",
    tagline: "Adaptive Audio. Now playing.",
    description:
      "Up to 2x more Active Noise Cancellation, Personalized Spatial Audio, and MagSafe Charging Case (USB-C).",
    basePriceMYR: 1099,
    badge: "USB-C",
    rating: 4.96,
    reviewCount: 1290,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    colors: [{ name: "White", hex: "#F8F8FA" }],
    storages: [{ label: "MagSafe Case (USB-C)", priceDeltaMYR: 0 }],
    sizes: [{ label: "Standard Fit (XS/S/M/L tips)", priceDeltaMYR: 0 }],
    specs: [
      "Apple H2 headphone chip",
      "Active Noise Cancellation & Transparency mode",
      "IP54 dust, sweat and water resistant",
      "Up to 30 hours listening time with case",
    ],
    stockCount: 40,
  },
  {
    id: "magsafe-charger-2m",
    categoryId: "accessories",
    name: "MagSafe Charger (2m)",
    tagline: "Snap into fast wireless charging.",
    description:
      "Perfectly aligned magnets attach to your iPhone 16 for faster wireless charging up to 25W.",
    basePriceMYR: 219,
    badge: "25W Fast Charge",
    rating: 4.82,
    reviewCount: 215,
    image:
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=800&q=80",
    colors: [{ name: "Silver / White", hex: "#ECEEF0" }],
    storages: [{ label: "2 Meter Woven Cable", priceDeltaMYR: 0 }],
    sizes: [{ label: "Qi2 & MagSafe Compatible", priceDeltaMYR: 0 }],
    specs: [
      "Up to 25W faster wireless charging",
      "Braided 2-meter USB-C integrated cable",
      "Compatible with iPhone 12 and later",
    ],
    stockCount: 55,
  },
];

const PRODUCT_CATALOG = PRODUCT_CATALOG_RAW.map(Schemas.createProduct);

/**
 * ============================================================================
 * 25. UTILITIES & FORMATTING (MYR, Date, Phone, Address)
 * ============================================================================
 */
const Formatters = {
  currencyMYR(amount) {
    const num = Number(amount || 0);
    return `RM ${num.toLocaleString("en-MY", {
      minimumFractionDigits: num % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  },
  dateMY(isoString) {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-MY", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "21 Nov 2026";
    }
  },
  phoneMY(input) {
    const digits = String(input || "").replace(/\D/g, "");
    if (digits.startsWith("60")) {
      return `+60 ${digits.slice(2, 4)}-${digits.slice(4, 8)} ${digits.slice(8, 12)}`.trim();
    }
    if (digits.startsWith("01")) {
      return `+60 ${digits.slice(1, 3)}-${digits.slice(3, 7)} ${digits.slice(7, 11)}`.trim();
    }
    return input;
  },
  addressMY(addr) {
    if (!addr) return "";
    return [addr.line1, addr.line2, `${addr.postcode} ${addr.city}`, `${addr.state}, Malaysia`]
      .filter(Boolean)
      .join(", ");
  },
};

/**
 * ============================================================================
 * 20 & 23. PRODUCT MANAGEMENT LOGIC & BUSINESS LOGIC
 * ============================================================================
 */
const BusinessLogic = {
  calculateVariantPrice(product, selectedStorage, selectedSize) {
    if (!product) return 0;
    const storageDelta = selectedStorage?.priceDeltaMYR || 0;
    const sizeDelta = selectedSize?.priceDeltaMYR || 0;
    return product.basePriceMYR + storageDelta + sizeDelta;
  },
  validateStock(product, requestedQty) {
    if (!product || !product.inStock || product.stockCount <= 0) {
      return { valid: false, message: "Out of stock in Malaysia warehouse" };
    }
    if (requestedQty > product.stockCount) {
      return { valid: false, message: `Only ${product.stockCount} units available` };
    }
    return { valid: true, message: "In Stock & Ready to Ship" };
  },
  evaluatePromoCode(code, subtotalMYR) {
    const clean = String(code || "").trim().toUpperCase();
    if (!clean) return { valid: false, discountMYR: 0, label: "" };
    if (clean === "MERDEKA100" && subtotalMYR >= 1000) {
      return { valid: true, discountMYR: 100, label: "Merdeka Special (-RM 100)" };
    }
    if (clean === "TRX50" && subtotalMYR >= 500) {
      return { valid: true, discountMYR: 50, label: "Apple TRX Welcome (-RM 50)" };
    }
    if (clean === "EDU5") {
      return {
        valid: true,
        discountMYR: Math.round(subtotalMYR * 0.05),
        label: "Malaysia Education 5% Off",
      };
    }
    return { valid: false, discountMYR: 0, label: "Invalid or ineligible promo code" };
  },
  calculateShippingMY(subtotalMYR, deliveryMethod, state) {
    if (deliveryMethod === "pickup_trx") return 0;
    const isEastMY = state === "Sabah" || state === "Sarawak" || state === "WP Labuan";
    const surcharge = isEastMY ? ENV_CONSTANTS.market.eastMalaysiaSurchargeMYR : 0;

    if (deliveryMethod === "express") {
      return ENV_CONSTANTS.market.expressShippingFeeMYR + surcharge;
    }
    if (subtotalMYR >= ENV_CONSTANTS.market.freeShippingThresholdMYR) {
      return surcharge;
    }
    return ENV_CONSTANTS.market.standardShippingFeeMYR + surcharge;
  },
  calculateCartSummary({ items, promoCode, deliveryMethod = "standard", state = "WP Kuala Lumpur" }) {
    const subtotalMYR = items.reduce((sum, item) => sum + item.unitPriceMYR * item.quantity, 0);
    const promo = this.evaluatePromoCode(promoCode, subtotalMYR);
    const discountMYR = promo.valid ? promo.discountMYR : 0;
    const shippingMYR = items.length > 0 ? this.calculateShippingMY(subtotalMYR, deliveryMethod, state) : 0;
    const totalMYR = Math.max(0, subtotalMYR - discountMYR + shippingMYR);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      itemCount,
      subtotalMYR,
      discountMYR,
      promoLabel: promo.label,
      promoValid: promo.valid,
      shippingMYR,
      totalMYR,
      installment24MoMYR: Math.ceil(totalMYR / 24),
    };
  },
};

/**
 * ============================================================================
 * 12. SERVICES & API (Simulated Async REST Client with Latency & Offline Fallback)
 * ============================================================================
 */
const ApiClient = {
  async request(fn, delayMs = 240) {
    await new Promise((res) => setTimeout(res, delayMs));
    return fn();
  },
};

const ProductService = {
  async getAllProducts() {
    return ApiClient.request(() => PRODUCT_CATALOG, 180);
  },
  async getProductsByCategory(categoryId) {
    return ApiClient.request(
      () => PRODUCT_CATALOG.filter((p) => p.categoryId === categoryId),
      150
    );
  },
  async searchProducts(query) {
    const q = String(query || "").trim().toLowerCase();
    return ApiClient.request(() => {
      if (!q) return PRODUCT_CATALOG;
      return PRODUCT_CATALOG.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryId.toLowerCase().includes(q)
      );
    }, 120);
  },
};

const CategoryService = {
  getCategories() {
    return CATEGORIES_DATA;
  },
};

const OrderService = {
  async submitOrder(orderPayload) {
    return ApiClient.request(() => Schemas.createOrder(orderPayload), 450);
  },
};

/**
 * ============================================================================
 * 24. FORM HANDLING & VALIDATION
 * ============================================================================
 */
const Validators = {
  email(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || "").trim());
  },
  phoneMY(val) {
    const clean = String(val || "").replace(/[\s-]/g, "");
    return /^(\+?60|0)1[0-9]{8,9}$/.test(clean);
  },
  postcodeMY(val) {
    return /^[0-9]{5}$/.test(String(val || "").trim());
  },
  required(val) {
    return String(val || "").trim().length > 0;
  },
};

/**
 * ============================================================================
 * 10. CONTEXT & STATE MANAGEMENT
 * ============================================================================
 */
const AppContext = createContext(null);
const AuthContext = createContext(null);
const ProductContext = createContext(null);
const CartContext = createContext(null);
const CheckoutContext = createContext(null);
const OrderContext = createContext(null);

const GlobalProviders = ({ children }) => {
  // 10.1 AppContext State
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(ENV_CONSTANTS.language.default);
  const [isOnline, setIsOnline] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [activeSheet, setActiveSheet] = useState(null);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(() =>
    LocalStorageService.get(ENV_CONSTANTS.storageKeys.ONBOARDING_DONE, false)
  );
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Apple The Exchange TRX",
      body: "Same-day Express Pickup is now available for iPhone 16 Pro Max in Kuala Lumpur.",
      time: "12m ago",
      read: false,
    },
    {
      id: "notif-2",
      title: "0% EPP Installment Plan",
      body: "Enjoy 24-month 0% interest with Maybank, CIMB & Public Bank cards.",
      time: "3h ago",
      read: true,
    },
  ]);

  // 35. Analytics & Logging
  const logEvent = useCallback((eventName, payload = {}) => {
    // Structured analytics telemetry hook
    if (process.env.NODE_ENV !== "production") {
      // Silent structured event buffer
    }
  }, []);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 2800);
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingCompleted(true);
    LocalStorageService.set(ENV_CONSTANTS.storageKeys.ONBOARDING_DONE, true);
  }, []);

  // 10.2 AuthContext State (14 & 15 Authentication & Authorization)
  const [user, setUser] = useState(() =>
    LocalStorageService.get(ENV_CONSTANTS.storageKeys.AUTH_USER, {
      id: "usr_my_8821",
      name: "Aiman Hakim",
      email: "aiman.hakim@icloud.com",
      phone: "+60 12-345 6789",
      tier: "Apple Malaysia Member",
      avatar: null,
    })
  );

  const [addresses, setAddresses] = useState(() =>
    LocalStorageService.get(ENV_CONSTANTS.storageKeys.ADDRESSES, [
      Schemas.createAddress({
        id: "addr_kl_1",
        label: "Home (Kuala Lumpur)",
        recipientName: "Aiman Hakim",
        phone: "+60 12-345 6789",
        line1: "Unit 18-04, The Troika, Persiaran KLCC",
        line2: "Kuala Lumpur City Centre",
        postcode: "50450",
        city: "Kuala Lumpur",
        state: "WP Kuala Lumpur",
        isDefault: true,
      }),
    ])
  );

  const login = useCallback(
    (email, password) => {
      const mockUser = {
        id: `usr_${Date.now()}`,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        email,
        phone: "+60 12-889 4410",
        tier: "Apple Malaysia Member",
        avatar: null,
      };
      setUser(mockUser);
      LocalStorageService.set(ENV_CONSTANTS.storageKeys.AUTH_USER, mockUser);
      SecureStorageService.setToken(`jwt_my_${Date.now()}`);
      showToast(`Welcome back, ${mockUser.name}`, "success");
      return true;
    },
    [showToast]
  );

  const register = useCallback(
    ({ name, email, phone }) => {
      const newUser = {
        id: `usr_${Date.now()}`,
        name,
        email,
        phone: Formatters.phoneMY(phone),
        tier: "Apple Malaysia Member",
        avatar: null,
      };
      setUser(newUser);
      LocalStorageService.set(ENV_CONSTANTS.storageKeys.AUTH_USER, newUser);
      SecureStorageService.setToken(`jwt_my_${Date.now()}`);
      showToast("Apple ID created for Malaysia Store", "success");
      return true;
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    LocalStorageService.remove(ENV_CONSTANTS.storageKeys.AUTH_USER);
    SecureStorageService.clearToken();
    showToast("Signed out of Apple ID", "info");
  }, [showToast]);

  const saveAddress = useCallback(
    (newAddr) => {
      const formatted = Schemas.createAddress(newAddr);
      setAddresses((prev) => {
        const updated = formatted.isDefault
          ? prev.map((a) => ({ ...a, isDefault: false }))
          : [...prev];
        const idx = updated.findIndex((a) => a.id === formatted.id);
        if (idx >= 0) updated[idx] = formatted;
        else updated.unshift(formatted);
        LocalStorageService.set(ENV_CONSTANTS.storageKeys.ADDRESSES, updated);
        return updated;
      });
      showToast("Malaysia delivery address saved", "success");
    },
    [showToast]
  );

  // 10.3 ProductContext State
  const [products] = useState(PRODUCT_CATALOG);
  const [wishlistIds, setWishlistIds] = useState(() =>
    LocalStorageService.get(ENV_CONSTANTS.storageKeys.WISHLIST_IDS, ["iphone-16-pro-max"])
  );

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(productId);
        const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
        LocalStorageService.set(ENV_CONSTANTS.storageKeys.WISHLIST_IDS, next);
        showToast(exists ? "Removed from Saved Items" : "Saved to Wishlist", "info");
        return next;
      });
    },
    [showToast]
  );

  // 10.4 CartContext State (21. Shopping Cart Logic)
  const [cartItems, setCartItems] = useState(() =>
    LocalStorageService.get(ENV_CONSTANTS.storageKeys.CART_ITEMS, [
      Schemas.createCartItem({
        product: PRODUCT_CATALOG[6], // AirPods Pro 2
        selectedColor: PRODUCT_CATALOG[6].colors[0],
        selectedStorage: PRODUCT_CATALOG[6].storages[0],
        selectedSize: PRODUCT_CATALOG[6].sizes[0],
        quantity: 1,
        unitPriceMYR: 1099,
      }),
    ])
  );
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    LocalStorageService.set(ENV_CONSTANTS.storageKeys.CART_ITEMS, cartItems);
  }, [cartItems]);

  const addToCart = useCallback(
    ({ product, selectedColor, selectedStorage, selectedSize, quantity = 1 }) => {
      const unitPriceMYR = BusinessLogic.calculateVariantPrice(
        product,
        selectedStorage,
        selectedSize
      );
      const newItem = Schemas.createCartItem({
        product,
        selectedColor,
        selectedStorage,
        selectedSize,
        quantity,
        unitPriceMYR,
      });

      setCartItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.cartItemId === newItem.cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(product.stockCount, updated[existingIndex].quantity + quantity),
          };
          return updated;
        }
        return [...prev, newItem];
      });
      logEvent("add_to_cart", { productId: product.id, price: unitPriceMYR });
      showToast(`Added ${product.name} to Bag`, "success");
    },
    [logEvent, showToast]
  );

  const updateCartQuantity = useCallback((cartItemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (cartItemId) => {
      setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      showToast("Item removed from Bag", "info");
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setPromoCode("");
  }, []);

  // 10.5 CheckoutContext State (22. Checkout Logic)
  const [deliveryMethod, setDeliveryMethod] = useState("standard"); // 'standard' | 'express' | 'pickup_trx'
  const [paymentMethod, setPaymentMethod] = useState("apple_pay"); // 'apple_pay' | 'fpx' | 'card' | 'grabpay'
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses[0]?.id || "addr_kl_1"
  );

  const activeAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || addresses[0] || null,
    [addresses, selectedAddressId]
  );

  const cartSummary = useMemo(
    () =>
      BusinessLogic.calculateCartSummary({
        items: cartItems,
        promoCode,
        deliveryMethod,
        state: activeAddress?.state || "WP Kuala Lumpur",
      }),
    [cartItems, promoCode, deliveryMethod, activeAddress]
  );

  // 10.6 OrderContext State
  const [orders, setOrders] = useState(() =>
    LocalStorageService.get(ENV_CONSTANTS.storageKeys.ORDERS_LIST, [
      {
        orderNumber: "MY84920194",
        createdAt: "2026-11-15T10:30:00.000Z",
        status: "Delivered",
        items: [
          {
            cartItemId: "magsafe-charger-2m_std",
            productId: "magsafe-charger-2m",
            name: "MagSafe Charger (2m)",
            image: PRODUCT_CATALOG[7].image,
            selectedColor: { name: "Silver / White", hex: "#ECEEF0" },
            selectedStorage: { label: "2 Meter Woven Cable" },
            quantity: 1,
            unitPriceMYR: 219,
          },
        ],
        customer: { name: "Aiman Hakim", email: "aiman.hakim@icloud.com" },
        shippingAddress: addresses[0],
        deliveryMethod: "standard",
        paymentMethod: "apple_pay",
        summary: {
          itemCount: 1,
          subtotalMYR: 219,
          discountMYR: 0,
          shippingMYR: 15,
          totalMYR: 234,
        },
        timeline: [
          { title: "Order Placed", time: "15 Nov, 10:30 AM", completed: true },
          { title: "Dispatched from Shah Alam Hub", time: "15 Nov, 4:15 PM", completed: true },
          { title: "Out for Delivery (DHL MY)", time: "16 Nov, 9:05 AM", completed: true },
          { title: "Delivered to Kuala Lumpur", time: "16 Nov, 1:42 PM", completed: true },
        ],
      },
    ])
  );

  const placeOrder = useCallback(
    async (customerNote = "") => {
      setIsLoadingGlobal(true);
      try {
        const newOrder = await OrderService.submitOrder({
          items: cartItems,
          customer: {
            name: user?.name || activeAddress?.recipientName || "Guest Customer",
            email: user?.email || "guest@apple.com.my",
            phone: user?.phone || activeAddress?.phone || "+60 12-000 0000",
            note: customerNote,
          },
          shippingAddress: activeAddress,
          deliveryMethod,
          paymentMethod,
          promoCode,
          summary: cartSummary,
        });

        setOrders((prev) => {
          const updated = [newOrder, ...prev];
          LocalStorageService.set(ENV_CONSTANTS.storageKeys.ORDERS_LIST, updated);
          return updated;
        });
        clearCart();
        return newOrder;
      } finally {
        setIsLoadingGlobal(false);
      }
    },
    [
      cartItems,
      user,
      activeAddress,
      deliveryMethod,
      paymentMethod,
      promoCode,
      cartSummary,
      clearCart,
    ]
  );

  const theme = darkMode ? THEME.colors.dark : THEME.colors.light;

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        theme,
        language,
        setLanguage,
        isOnline,
        setIsOnline,
        toast,
        showToast,
        activeModal,
        setActiveModal,
        activeSheet,
        setActiveSheet,
        isLoadingGlobal,
        setIsLoadingGlobal,
        onboardingCompleted,
        completeOnboarding,
        notifications,
        setNotifications,
        logEvent,
      }}
    >
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated: Boolean(user),
          login,
          register,
          logout,
          addresses,
          saveAddress,
        }}
      >
        <ProductContext.Provider
          value={{
            products,
            categories: CATEGORIES_DATA,
            wishlistIds,
            toggleWishlist,
          }}
        >
          <CartContext.Provider
            value={{
              cartItems,
              addToCart,
              updateCartQuantity,
              removeFromCart,
              clearCart,
              promoCode,
              setPromoCode,
              cartSummary,
            }}
          >
            <CheckoutContext.Provider
              value={{
                deliveryMethod,
                setDeliveryMethod,
                paymentMethod,
                setPaymentMethod,
                selectedAddressId,
                setSelectedAddressId,
                activeAddress,
              }}
            >
              <OrderContext.Provider value={{ orders, placeOrder }}>
                {children}
              </OrderContext.Provider>
            </CheckoutContext.Provider>
          </CartContext.Provider>
        </ProductContext.Provider>
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};

/**
 * ============================================================================
 * 11. CUSTOM HOOKS
 * ============================================================================
 */
const useApp = () => useContext(AppContext);
const useAuth = () => useContext(AuthContext);
const useProducts = () => useContext(ProductContext);
const useCart = () => useContext(CartContext);
const useCheckout = () => useContext(CheckoutContext);
const useOrders = () => useContext(OrderContext);

/**
 * ============================================================================
 * 6. NAVIGATION (Stack, Tab, Drawer, Navigation Guards & Deep Linking)
 * ============================================================================
 */
const NavigationContext = createContext(null);

const NavigationProvider = ({ children }) => {
  const { onboardingCompleted, showToast } = useApp();
  const { isAuthenticated } = useAuth();

  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("home"); // 'home' | 'shop' | 'search' | 'bag' | 'account'
  const [stack, setStack] = useState([]); // Array of { name, params }
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Splash timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  // Navigation Guards for protected screens
  const protectedScreens = ["Checkout", "Orders", "OrderDetails", "Address"];

  const navigate = useCallback(
    (name, params = {}) => {
      if (protectedScreens.includes(name) && !isAuthenticated) {
        showToast("Please sign in with your Apple ID to continue", "warning");
        setStack((prev) => [...prev, { name: "Login", params: { redirectTo: name, redirectParams: params } }]);
        return;
      }

      if (["home", "shop", "search", "bag", "account"].includes(name.toLowerCase())) {
        setActiveTab(name.toLowerCase());
        setStack([]);
        setDrawerOpen(false);
        return;
      }

      setStack((prev) => [...prev, { name, params }]);
      setDrawerOpen(false);
    },
    [isAuthenticated, showToast]
  );

  const goBack = useCallback(() => {
    setStack((prev) => (prev.length > 0 ? prev.slice(0, -1) : []));
  }, []);

  const resetToTab = useCallback((tabName) => {
    setStack([]);
    setActiveTab(tabName);
  }, []);

  // 30. Deep Linking Handler
  const handleDeepLink = useCallback(
    (url) => {
      if (url.includes("product/")) {
        const id = url.split("product/")[1];
        const prod = PRODUCT_CATALOG.find((p) => p.id === id);
        if (prod) navigate("ProductDetails", { product: prod });
      } else if (url.includes("trx")) {
        showToast("Deep Link: Apple The Exchange TRX Store", "info");
        navigate("Home");
      }
    },
    [navigate, showToast]
  );

  const currentScreen = stack.length > 0 ? stack[stack.length - 1] : null;

  return (
    <NavigationContext.Provider
      value={{
        showSplash,
        onboardingCompleted,
        activeTab,
        setActiveTab,
        stack,
        currentScreen,
        navigate,
        goBack,
        resetToTab,
        drawerOpen,
        setDrawerOpen,
        handleDeepLink,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

const useNavigation = () => useContext(NavigationContext);

/**
 * ============================================================================
 * 7. COMPONENTS (Buttons, Inputs, Cards, Badges, Modals, Sheets, Lists)
 * ============================================================================
 */
const CategoryIcon = ({ name, size = 20, className = "" }) => {
  const map = {
    Smartphone: <Smartphone size={size} className={className} />,
    Laptop: <Laptop size={size} className={className} />,
    Tablet: <Tablet size={size} className={className} />,
    Watch: <Watch size={size} className={className} />,
    Headphones: <Headphones size={size} className={className} />,
    Cable: <Cable size={size} className={className} />,
  };
  return map[name] || <Sparkles size={size} className={className} />;
};

const AppleButton = ({
  children,
  onClick,
  variant = "primary", // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = "md",
  fullWidth = false,
  disabled = false,
  icon = null,
  className = "",
}) => {
  const { theme } = useApp();
  const sizes = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const getStyle = () => {
    if (disabled) {
      return {
        backgroundColor: theme.bgTertiary,
        color: theme.textTertiary,
        cursor: "not-allowed",
      };
    }
    switch (variant) {
      case "primary":
        return { backgroundColor: theme.accent, color: "#FFFFFF" };
      case "secondary":
        return {
          backgroundColor: theme.bgTertiary,
          color: theme.textPrimary,
        };
      case "danger":
        return { backgroundColor: theme.danger, color: "#FFFFFF" };
      case "ghost":
        return { backgroundColor: "transparent", color: theme.accent };
      default:
        return { backgroundColor: theme.accent, color: "#FFFFFF" };
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={getStyle()}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all active:scale-[0.98] ${
        sizes[size]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};

const AppleInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error = "",
  rightElement = null,
  maxLength,
}) => {
  const { theme } = useApp();
  return (
    <div className="w-full mb-3">
      {label && (
        <label
          style={{ color: theme.textSecondary }}
          className="block text-xs font-medium mb-1.5 ml-1"
        >
          {label}
        </label>
      )}
      <div
        style={{
          backgroundColor: theme.bgSecondary,
          borderColor: error ? theme.danger : theme.border,
        }}
        className="flex items-center border rounded-2xl px-3.5 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-blue-500/30"
      >
        <input
          type={type}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ color: theme.textPrimary }}
          className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
        />
        {rightElement}
      </div>
      {error && (
        <p style={{ color: theme.danger }} className="text-[11px] mt-1 ml-1 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

const AppleBadge = ({ children, tone = "accent" }) => {
  const { theme } = useApp();
  const tones = {
    accent: { bg: theme.accentSoft, color: theme.accent },
    success: { bg: "rgba(40, 205, 65, 0.14)", color: theme.success },
    warning: { bg: "rgba(255, 159, 10, 0.16)", color: theme.warning },
    neutral: { bg: theme.bgTertiary, color: theme.textSecondary },
  };
  const current = tones[tone] || tones.accent;
  return (
    <span
      style={{ backgroundColor: current.bg, color: current.color }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight"
    >
      {children}
    </span>
  );
};

const PriceDisplay = ({ amountMYR, size = "md", showInstallment = false }) => {
  const { theme } = useApp();
  const sizes = {
    sm: "text-sm font-semibold",
    md: "text-base font-bold",
    lg: "text-2xl font-bold",
  };
  return (
    <div>
      <span style={{ color: theme.textPrimary }} className={sizes[size]}>
        {Formatters.currencyMYR(amountMYR)}
      </span>
      {showInstallment && (
        <p style={{ color: theme.textSecondary }} className="text-[11px] mt-0.5">
          or {Formatters.currencyMYR(Math.ceil(amountMYR / 24))}/mo. for 24 mo. at 0% EPP*
        </p>
      )}
    </div>
  );
};

const ProductImage = ({ src, alt, className = "h-36 w-full" }) => {
  const { theme } = useApp();
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      style={{ backgroundColor: theme.bgTertiary }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse-subtle bg-gradient-to-tr from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700" />
      )}
      {errored ? (
        <div className="w-full h-full flex flex-col items-center justify-center opacity-50">
          <ImageIcon size={24} />
          <span className="text-[10px] mt-1">Apple Malaysia</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

const ProductCard = ({ product, compact = false }) => {
  const { theme } = useApp();
  const { navigate } = useNavigation();
  const { wishlistIds, toggleWishlist } = useProducts();
  const isSaved = wishlistIds.includes(product.id);

  return (
    <div
      onClick={() => navigate("ProductDetails", { product })}
      style={{
        backgroundColor: theme.bgSecondary,
        borderColor: theme.borderSubtle,
      }}
      className="group relative rounded-3xl border p-3.5 shadow-sm transition-all active:scale-[0.99] cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="relative">
          <ProductImage
            src={product.image}
            alt={product.name}
            className={compact ? "h-28 w-full" : "h-36 w-full"}
          />
          {product.badge && (
            <div className="absolute top-2 left-2">
              <AppleBadge tone="accent">{product.badge}</AppleBadge>
            </div>
          )}
          <button
            type="button"
            aria-label="Save product"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            style={{ backgroundColor: theme.cardGlass }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm"
          >
            <Heart
              size={15}
              className={isSaved ? "fill-red-500 text-red-500" : ""}
              style={{ color: isSaved ? "#FF3B30" : theme.textPrimary }}
            />
          </button>
        </div>

        <div className="mt-3">
          <p style={{ color: theme.textTertiary }} className="text-[11px] font-medium uppercase">
            {product.categoryId}
          </p>
          <h3
            style={{ color: theme.textPrimary }}
            className="text-sm font-semibold leading-snug line-clamp-1 mt-0.5"
          >
            {product.name}
          </h3>
          {!compact && (
            <p
              style={{ color: theme.textSecondary }}
              className="text-xs line-clamp-1 mt-0.5"
            >
              {product.tagline}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t flex items-center justify-between" style={{ borderColor: theme.borderSubtle }}>
        <PriceDisplay amountMYR={product.basePriceMYR} size="sm" />
        <span
          style={{ backgroundColor: theme.accent, color: "#FFF" }}
          className="text-[11px] font-semibold px-3 py-1 rounded-full"
        >
          Buy
        </span>
      </div>
    </div>
  );
};

const HeaderBar = ({
  title,
  showBack = false,
  showDrawer = false,
  rightAction = null,
}) => {
  const { theme, notifications } = useApp();
  const { goBack, navigate, setDrawerOpen } = useNavigation();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      style={{
        backgroundColor: theme.cardGlass,
        borderColor: theme.borderSubtle,
      }}
      className="sticky top-0 z-30 backdrop-blur-xl border-b px-4 h-14 flex items-center justify-between"
    >
      <div className="flex items-center gap-2 min-w-[60px]">
        {showBack && (
          <button
            type="button"
            onClick={goBack}
            style={{ color: theme.accent }}
            className="flex items-center gap-0.5 text-sm font-medium py-1 -ml-1"
          >
            <ChevronLeft size={22} />
            <span>Back</span>
          </button>
        )}
        {showDrawer && (
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            style={{ color: theme.textPrimary }}
            className="p-1.5 rounded-full hover:opacity-75"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      <h1
        style={{ color: theme.textPrimary }}
        className="text-base font-semibold tracking-tight truncate max-w-[200px]"
      >
        {title}
      </h1>

      <div className="flex items-center justify-end gap-2 min-w-[60px]">
        {rightAction || (
          <button
            type="button"
            onClick={() => navigate("Notifications")}
            style={{ color: theme.textPrimary }}
            className="relative p-1.5 rounded-full"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};

const BottomTabBar = () => {
  const { theme } = useApp();
  const { activeTab, navigate } = useNavigation();
  const { cartSummary } = useCart();

  const tabs = [
    { id: "home", label: "For You", icon: Home },
    { id: "shop", label: "Products", icon: Grid },
    { id: "search", label: "Search", icon: Search },
    { id: "bag", label: "Bag", icon: ShoppingBag, badge: cartSummary.itemCount },
    { id: "account", label: "Account", icon: User },
  ];

  return (
    <nav
      style={{
        backgroundColor: theme.cardGlass,
        borderColor: theme.borderSubtle,
      }}
      className="sticky bottom-0 z-30 backdrop-blur-xl border-t px-2 pt-1.5 pb-4 flex items-center justify-around"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => navigate(tab.id)}
            className="relative flex flex-col items-center justify-center w-16 py-1 transition-transform active:scale-95"
          >
            <div className="relative">
              <Icon
                size={21}
                style={{ color: active ? theme.accent : theme.textSecondary }}
                strokeWidth={active ? 2.3 : 1.8}
              />
              {tab.badge > 0 && (
                <span
                  style={{ backgroundColor: theme.accent }}
                  className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              style={{ color: active ? theme.accent : theme.textSecondary }}
              className="text-[10px] font-semibold mt-1"
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => {
  const { theme } = useApp();
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-14 animate-fade-up">
      <div
        style={{ backgroundColor: theme.bgTertiary, color: theme.textSecondary }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
      >
        <Icon size={28} />
      </div>
      <h3 style={{ color: theme.textPrimary }} className="text-lg font-semibold">
        {title}
      </h3>
      <p style={{ color: theme.textSecondary }} className="text-xs mt-1.5 max-w-[260px] leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <AppleButton onClick={onAction} size="sm">
            {actionLabel}
          </AppleButton>
        </div>
      )}
    </div>
  );
};

/**
 * ============================================================================
 * 9. LAYOUTS (MainLayout, AuthLayout, ProductLayout, DetailLayout, CheckoutLayout)
 * ============================================================================
 */
const MainLayout = ({ title, children, showDrawer = true, rightAction = null }) => {
  const { theme } = useApp();
  return (
    <div
      style={{ backgroundColor: theme.bgPrimary }}
      className="flex-1 flex flex-col min-h-0 overflow-hidden"
    >
      <HeaderBar title={title} showDrawer={showDrawer} rightAction={rightAction} />
      <main className="flex-1 overflow-y-auto no-scrollbar pb-6">{children}</main>
      <BottomTabBar />
    </div>
  );
};

const DetailLayout = ({ title, children, footer = null, rightAction = null }) => {
  const { theme } = useApp();
  return (
    <div
      style={{ backgroundColor: theme.bgPrimary }}
      className="flex-1 flex flex-col min-h-0 overflow-hidden animate-fade-up"
    >
      <HeaderBar title={title} showBack rightAction={rightAction} />
      <main className="flex-1 overflow-y-auto no-scrollbar pb-6">{children}</main>
      {footer && (
        <div
          style={{
            backgroundColor: theme.cardGlass,
            borderColor: theme.borderSubtle,
          }}
          className="backdrop-blur-xl border-t px-4 py-3 pb-5"
        >
          {footer}
        </div>
      )}
    </div>
  );
};

const AuthLayout = ({ title, subtitle, children }) => {
  const { theme } = useApp();
  return (
    <div
      style={{ backgroundColor: theme.bgPrimary }}
      className="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar animate-fade-up"
    >
      <HeaderBar title={title} showBack />
      <div className="px-5 pt-6 pb-10">
        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-4 shadow-md">
          <Sparkles size={24} />
        </div>
        <h2 style={{ color: theme.textPrimary }} className="text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <p style={{ color: theme.textSecondary }} className="text-xs mt-1.5 mb-6 leading-relaxed">
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
};

const CheckoutLayout = ({ title, step, children, footer }) => {
  const { theme } = useApp();
  return (
    <div
      style={{ backgroundColor: theme.bgPrimary }}
      className="flex-1 flex flex-col min-h-0 overflow-hidden animate-fade-up"
    >
      <HeaderBar title={title} showBack />
      <div
        style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
        className="px-4 py-2.5 border-b flex items-center justify-between text-xs"
      >
        <span style={{ color: theme.textSecondary }}>Checkout Malaysia (MYR)</span>
        <AppleBadge tone="accent">Step {step} of 3</AppleBadge>
      </div>
      <main className="flex-1 overflow-y-auto no-scrollbar p-4">{children}</main>
      {footer && (
        <div
          style={{
            backgroundColor: theme.cardGlass,
            borderColor: theme.borderSubtle,
          }}
          className="backdrop-blur-xl border-t p-4 pb-5"
        >
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * ============================================================================
 * 26. SCREENS (All 19 Screens Implemented)
 * ============================================================================
 */

// 26.1 SplashScreen
const SplashScreen = () => (
  <div className="flex-1 bg-black text-white flex flex-col items-center justify-center px-6">
    <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-5 shadow-2xl border border-white/15">
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3" />
      </svg>
    </div>
    <h1 className="text-xl font-semibold tracking-tight">Apple Store</h1>
    <p className="text-xs text-neutral-400 mt-1">Malaysia • Kuala Lumpur</p>
  </div>
);

// 26.2 OnboardingScreen
const OnboardingScreen = () => {
  const { completeOnboarding, theme } = useApp();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Apple Store Malaysia",
      desc: "Shop the latest iPhone, Mac, iPad and Apple Watch with official Malaysian Ringgit (MYR) pricing and free delivery.",
      badge: "Official Store MY",
    },
    {
      title: "Pickup at Apple The Exchange TRX",
      desc: "Order online and pick up your items in as little as 2 hours at our flagship Kuala Lumpur store.",
      badge: "Express Pickup",
    },
    {
      title: "0% Easy Payment Plan",
      desc: "Split your purchase up to 24 months with Maybank, CIMB, Public Bank, or pay seamlessly via FPX & Apple Pay.",
      badge: "Flexible MYR Payments",
    },
  ];

  return (
    <div
      style={{ backgroundColor: theme.bgPrimary }}
      className="flex-1 flex flex-col justify-between p-6 animate-fade-up"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={completeOnboarding}
          style={{ color: theme.textSecondary }}
          className="text-xs font-semibold"
        >
          Skip
        </button>
      </div>

      <div className="my-auto text-center">
        <AppleBadge tone="accent">{slides[slide].badge}</AppleBadge>
        <div
          style={{ backgroundColor: theme.bgSecondary }}
          className="w-44 h-44 mx-auto my-6 rounded-[36px] shadow-lg flex items-center justify-center"
        >
          <Sparkles size={56} style={{ color: theme.accent }} />
        </div>
        <h2 style={{ color: theme.textPrimary }} className="text-2xl font-bold tracking-tight">
          {slides[slide].title}
        </h2>
        <p style={{ color: theme.textSecondary }} className="text-xs mt-3 leading-relaxed px-2">
          {slides[slide].desc}
        </p>
      </div>

      <div>
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: idx === slide ? theme.accent : theme.border,
              }}
              className={`h-1.5 rounded-full transition-all ${idx === slide ? "w-6" : "w-1.5"}`}
            />
          ))}
        </div>
        <AppleButton
          fullWidth
          onClick={() => {
            if (slide < slides.length - 1) setSlide(slide + 1);
            else completeOnboarding();
          }}
        >
          {slide < slides.length - 1 ? "Continue" : "Start Shopping in MYR"}
        </AppleButton>
      </div>
    </div>
  );
};

// 26.3 HomeScreen
const HomeScreen = () => {
  const { theme } = useApp();
  const { products, categories } = useProducts();
  const { navigate } = useNavigation();

  return (
    <MainLayout title="For You">
      <div className="px-4 pt-4 space-y-6 animate-fade-up">
        {/* Hero Banner */}
        <div
          onClick={() => navigate("ProductDetails", { product: products[0] })}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-stone-900 text-white p-5 shadow-lg cursor-pointer"
        >
          <div className="relative z-10 max-w-[230px]">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">
              Now Available in Malaysia
            </span>
            <h2 className="text-2xl font-bold tracking-tight leading-tight">
              iPhone 16 Pro Max
            </h2>
            <p className="text-xs text-neutral-300 mt-1.5">
              From {Formatters.currencyMYR(5999)} or RM 250/mo. with 0% EPP.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full">
              <span>Shop Now</span>
              <ArrowRight size={14} />
            </div>
          </div>
          <img
            src={products[0].image}
            alt="iPhone 16 Pro Max"
            className="absolute right-[-18px] bottom-[-12px] w-40 h-44 object-cover rounded-2xl opacity-90 rotate-6"
          />
        </div>

        {/* Apple TRX Store Location Banner (32. Location Services) */}
        <div
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.borderSubtle,
          }}
          className="rounded-2xl border p-3.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: theme.accentSoft, color: theme.accent }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            >
              <MapPin size={18} />
            </div>
            <div>
              <p style={{ color: theme.textPrimary }} className="text-xs font-semibold">
                Apple The Exchange TRX
              </p>
              <p style={{ color: theme.textSecondary }} className="text-[11px]">
                Open today until 10:00 PM • 2-hr Pickup
              </p>
            </div>
          </div>
          <AppleBadge tone="success">Open</AppleBadge>
        </div>

        {/* Category Quick Pills */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: theme.textPrimary }} className="text-base font-bold">
              Shop by Product
            </h3>
            <button
              type="button"
              onClick={() => navigate("shop")}
              style={{ color: theme.accent }}
              className="text-xs font-semibold"
            >
              See All
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate("Products", { category: cat })}
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderSubtle,
                }}
                className="shrink-0 border rounded-2xl px-3.5 py-2.5 flex items-center gap-2 transition-transform active:scale-95"
              >
                <CategoryIcon name={cat.icon} size={16} />
                <span style={{ color: theme.textPrimary }} className="text-xs font-semibold">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: theme.textPrimary }} className="text-base font-bold">
              The Latest in Malaysia
            </h3>
            <span style={{ color: theme.textTertiary }} className="text-[11px]">
              Prices in MYR
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Promo Card */}
        <div
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.borderSubtle,
          }}
          className="rounded-3xl border p-4"
        >
          <AppleBadge tone="warning">Malaysia Exclusive</AppleBadge>
          <h4 style={{ color: theme.textPrimary }} className="text-sm font-bold mt-2">
            Use code MERDEKA100 at Checkout
          </h4>
          <p style={{ color: theme.textSecondary }} className="text-xs mt-1">
            Enjoy RM 100 instant rebate on orders above RM 1,000 + Free DHL Express delivery across Peninsular Malaysia.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

// 26.4 CategoryScreen
const CategoryScreen = () => {
  const { theme } = useApp();
  const { categories, products } = useProducts();
  const { navigate } = useNavigation();

  return (
    <MainLayout title="Products">
      <div className="px-4 pt-4 space-y-3 animate-fade-up">
        <p style={{ color: theme.textSecondary }} className="text-xs">
          Explore the complete Apple lineup with official Malaysia warranty & MYR pricing.
        </p>
        {categories.map((cat) => {
          const count = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <div
              key={cat.id}
              onClick={() => navigate("Products", { category: cat })}
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderSubtle,
              }}
              className="rounded-3xl border p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-3.5">
                <div
                  style={{ backgroundColor: theme.accentSoft, color: theme.accent }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                >
                  <CategoryIcon name={cat.icon} size={22} />
                </div>
                <div>
                  <h3 style={{ color: theme.textPrimary }} className="text-base font-bold">
                    {cat.name}
                  </h3>
                  <p style={{ color: theme.textSecondary }} className="text-xs mt-0.5">
                    {cat.subtitle}
                  </p>
                  <span style={{ color: theme.accent }} className="text-[11px] font-semibold mt-1 inline-block">
                    {count} {count === 1 ? "model" : "models"} available
                  </span>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: theme.textTertiary }} />
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
};

// 26.5 ProductsScreen
const ProductsScreen = ({ params }) => {
  const { theme } = useApp();
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price_asc' | 'price_desc'

  const category = params?.category;
  const filtered = useMemo(() => {
    const base = category
      ? products.filter((p) => p.categoryId === category.id)
      : products;
    if (sortBy === "price_asc") return [...base].sort((a, b) => a.basePriceMYR - b.basePriceMYR);
    if (sortBy === "price_desc") return [...base].sort((a, b) => b.basePriceMYR - a.basePriceMYR);
    return base;
  }, [products, category, sortBy]);

  return (
    <DetailLayout title={category?.name || "All Products"}>
      <div className="px-4 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span style={{ color: theme.textSecondary }} className="text-xs font-medium">
            Showing {filtered.length} products
          </span>
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal size={13} style={{ color: theme.textSecondary }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                backgroundColor: theme.bgSecondary,
                color: theme.textPrimary,
                borderColor: theme.border,
              }}
              className="text-xs font-medium rounded-full px-3 py-1.5 border outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </DetailLayout>
  );
};

// 26.6 ProductDetailsScreen (20. Product Management Logic: Variants, Color, Storage, Size, Stock)
const ProductDetailsScreen = ({ params }) => {
  const { theme, showToast } = useApp();
  const { addToCart } = useCart();
  const { wishlistIds, toggleWishlist } = useProducts();
  const { navigate } = useNavigation();

  const product = params?.product || PRODUCT_CATALOG[0];
  const isSaved = wishlistIds.includes(product.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [selectedStorage, setSelectedStorage] = useState(product.storages[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);

  const finalPriceMYR = useMemo(
    () => BusinessLogic.calculateVariantPrice(product, selectedStorage, selectedSize),
    [product, selectedStorage, selectedSize]
  );

  const stockInfo = useMemo(
    () => BusinessLogic.validateStock(product, quantity),
    [product, quantity]
  );

  const handleAddToBag = () => {
    if (!stockInfo.valid) {
      showToast(stockInfo.message, "danger");
      return;
    }
    addToCart({
      product,
      selectedColor,
      selectedStorage,
      selectedSize,
      quantity,
    });
  };

  return (
    <DetailLayout
      title={product.name}
      rightAction={
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => showToast("Product link copied to clipboard", "info")}
            style={{ color: theme.textPrimary }}
            className="p-1.5"
          >
            <Share2 size={18} />
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="p-1.5"
          >
            <Heart
              size={18}
              className={isSaved ? "fill-red-500 text-red-500" : ""}
              style={{ color: isSaved ? "#FF3B30" : theme.textPrimary }}
            />
          </button>
        </div>
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <div>
            <p style={{ color: theme.textSecondary }} className="text-[11px]">
              Total (Incl. SST)
            </p>
            <PriceDisplay amountMYR={finalPriceMYR * quantity} size="md" />
          </div>
          <AppleButton
            onClick={handleAddToBag}
            disabled={!stockInfo.valid}
            icon={<ShoppingBag size={16} />}
          >
            Add to Bag
          </AppleButton>
        </div>
      }
    >
      <div className="px-4 pt-4 space-y-5">
        <ProductImage src={product.image} alt={product.name} className="h-60 w-full" />

        <div>
          <div className="flex items-center justify-between">
            {product.badge && <AppleBadge tone="accent">{product.badge}</AppleBadge>}
            <div className="flex items-center gap-1 text-xs font-medium">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span style={{ color: theme.textPrimary }}>{product.rating}</span>
              <span style={{ color: theme.textTertiary }}>({product.reviewCount})</span>
            </div>
          </div>

          <h2 style={{ color: theme.textPrimary }} className="text-2xl font-bold mt-2">
            {product.name}
          </h2>
          <p style={{ color: theme.accent }} className="text-xs font-semibold mt-0.5">
            {product.tagline}
          </p>
          <div className="mt-2">
            <PriceDisplay amountMYR={finalPriceMYR} size="lg" showInstallment />
          </div>
          <p style={{ color: theme.textSecondary }} className="text-xs mt-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Color Selector */}
        {product.colors.length > 0 && (
          <div>
            <p style={{ color: theme.textPrimary }} className="text-xs font-semibold mb-2">
              Finish: <span style={{ color: theme.textSecondary }}>{selectedColor?.name}</span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => {
                const active = selectedColor?.name === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    style={{
                      borderColor: active ? theme.accent : theme.border,
                      backgroundColor: theme.bgSecondary,
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all"
                  >
                    <span
                      style={{ backgroundColor: c.hex }}
                      className="w-4 h-4 rounded-full border border-black/15"
                    />
                    <span style={{ color: theme.textPrimary }} className="text-xs font-medium">
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size / Model Variant Selector */}
        {product.sizes.length > 0 && (
          <div>
            <p style={{ color: theme.textPrimary }} className="text-xs font-semibold mb-2">
              Model / Size
            </p>
            <div className="grid grid-cols-2 gap-2">
              {product.sizes.map((sz) => {
                const active = selectedSize?.label === sz.label;
                return (
                  <button
                    key={sz.label}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      borderColor: active ? theme.accent : theme.border,
                      backgroundColor: active ? theme.accentSoft : theme.bgSecondary,
                    }}
                    className="p-3 rounded-2xl border text-left transition-all"
                  >
                    <p style={{ color: theme.textPrimary }} className="text-xs font-semibold">
                      {sz.label}
                    </p>
                    <p style={{ color: theme.textSecondary }} className="text-[11px] mt-0.5">
                      {sz.priceDeltaMYR > 0
                        ? `+ ${Formatters.currencyMYR(sz.priceDeltaMYR)}`
                        : "Included"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Storage Selector */}
        {product.storages.length > 0 && (
          <div>
            <p style={{ color: theme.textPrimary }} className="text-xs font-semibold mb-2">
              Capacity
            </p>
            <div className="grid grid-cols-3 gap-2">
              {product.storages.map((st) => {
                const active = selectedStorage?.label === st.label;
                return (
                  <button
                    key={st.label}
                    type="button"
                    onClick={() => setSelectedStorage(st)}
                    style={{
                      borderColor: active ? theme.accent : theme.border,
                      backgroundColor: active ? theme.accentSoft : theme.bgSecondary,
                    }}
                    className="p-2.5 rounded-2xl border text-center transition-all"
                  >
                    <p style={{ color: theme.textPrimary }} className="text-xs font-bold">
                      {st.label}
                    </p>
                    <p style={{ color: theme.textSecondary }} className="text-[10px] mt-0.5">
                      {st.priceDeltaMYR > 0 ? `+RM ${st.priceDeltaMYR}` : "Base"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity & Stock Status */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-2xl border p-3.5 flex items-center justify-between"
        >
          <div>
            <p style={{ color: theme.success }} className="text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 size={14} /> {stockInfo.message}
            </p>
            <p style={{ color: theme.textSecondary }} className="text-[11px] mt-0.5">
              Free delivery in MY or 2-hr Pickup at TRX
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              style={{ backgroundColor: theme.bgTertiary, color: theme.textPrimary }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
            >
              <Minus size={14} />
            </button>
            <span style={{ color: theme.textPrimary }} className="text-sm font-bold w-4 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
              style={{ backgroundColor: theme.bgTertiary, color: theme.textPrimary }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Key Specs */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border p-4 space-y-2"
        >
          <h4 style={{ color: theme.textPrimary }} className="text-xs font-bold uppercase tracking-wider">
            Key Specifications
          </h4>
          {product.specs.map((spec, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <Check size={14} style={{ color: theme.accent }} className="shrink-0 mt-0.5" />
              <span style={{ color: theme.textSecondary }}>{spec}</span>
            </div>
          ))}
        </div>

        <div className="pb-2">
          <AppleButton
            variant="secondary"
            fullWidth
            size="sm"
            onClick={() => navigate("bag")}
          >
            View Shopping Bag
          </AppleButton>
        </div>
      </div>
    </DetailLayout>
  );
};

// 26.7 SearchScreen
const SearchScreen = () => {
  const { theme } = useApp();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(PRODUCT_CATALOG);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    let active = true;
    setSearching(true);
    ProductService.searchProducts(query).then((res) => {
      if (active) {
        setResults(res);
        setSearching(false);
      }
    });
    return () => {
      active = false;
    };
  }, [query]);

  const quickTags = ["iPhone 16 Pro", "M4", "MacBook Air", "AirPods", "MagSafe"];

  return (
    <MainLayout title="Search">
      <div className="px-4 pt-4 space-y-4">
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border }}
          className="flex items-center gap-2.5 border rounded-2xl px-3.5 py-2.5"
        >
          <Search size={17} style={{ color: theme.textTertiary }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Apple.com/my..."
            style={{ color: theme.textPrimary }}
            className="w-full bg-transparent text-sm outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}>
              <X size={16} style={{ color: theme.textTertiary }} />
            </button>
          )}
        </div>

        {!query && (
          <div>
            <p style={{ color: theme.textSecondary }} className="text-xs font-semibold mb-2">
              Trending in Malaysia
            </p>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  style={{ backgroundColor: theme.bgSecondary, color: theme.accent }}
                  className="text-xs font-medium px-3 py-1.5 rounded-full shadow-xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {searching ? (
          <div className="py-12 text-center text-xs" style={{ color: theme.textSecondary }}>
            Searching catalog...
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Matches Found"
            description={`We couldn't find any Apple products matching "${query}".`}
            actionLabel="Clear Search"
            onAction={() => setQuery("")}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((prod) => (
              <ProductCard key={prod.id} product={prod} compact />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// 26.8 WishlistScreen
const WishlistScreen = () => {
  const { products, wishlistIds } = useProducts();
  const { navigate } = useNavigation();
  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <DetailLayout title="Saved Items">
      <div className="px-4 pt-4">
        {savedProducts.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your Saved List is Empty"
            description="Tap the heart icon on any iPhone, Mac, or accessory to save it for later."
            actionLabel="Browse Products"
            onAction={() => navigate("shop")}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </DetailLayout>
  );
};

// 26.9 CartScreen
const CartScreen = () => {
  const { theme, showToast } = useApp();
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    promoCode,
    setPromoCode,
    cartSummary,
  } = useCart();
  const { navigate } = useNavigation();
  const [promoInput, setPromoInput] = useState(promoCode);

  const handleApplyPromo = () => {
    setPromoCode(promoInput);
    const check = BusinessLogic.evaluatePromoCode(promoInput, cartSummary.subtotalMYR);
    if (check.valid) showToast(`Applied: ${check.label}`, "success");
    else showToast(check.label, "warning");
  };

  return (
    <MainLayout title="Bag">
      <div className="px-4 pt-4 space-y-4">
        {cartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your Bag is Empty"
            description="Free delivery across Malaysia for orders over RM 250, or pick up at Apple The Exchange TRX."
            actionLabel="Explore Apple Store"
            onAction={() => navigate("home")}
          />
        ) : (
          <>
            {/* Free shipping banner */}
            <div
              style={{ backgroundColor: theme.accentSoft, color: theme.accent }}
              className="rounded-2xl px-3.5 py-2.5 text-xs font-semibold flex items-center gap-2"
            >
              <Truck size={16} />
              <span>
                {cartSummary.subtotalMYR >= 250
                  ? "Your order qualifies for FREE Standard Delivery in Malaysia!"
                  : `Add ${Formatters.currencyMYR(250 - cartSummary.subtotalMYR)} more for FREE delivery.`}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    backgroundColor: theme.bgSecondary,
                    borderColor: theme.borderSubtle,
                  }}
                  className="rounded-3xl border p-3.5 flex gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        style={{ color: theme.textPrimary }}
                        className="text-sm font-bold truncate"
                      >
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        style={{ color: theme.textTertiary }}
                        className="p-0.5"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p style={{ color: theme.textSecondary }} className="text-[11px] mt-0.5">
                      {[
                        item.selectedColor?.name,
                        item.selectedStorage?.label,
                        item.selectedSize?.label,
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <PriceDisplay amountMYR={item.unitPriceMYR * item.quantity} size="sm" />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          style={{ backgroundColor: theme.bgTertiary, color: theme.textPrimary }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{ color: theme.textPrimary }}
                          className="text-xs font-bold w-4 text-center"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          style={{ backgroundColor: theme.bgTertiary, color: theme.textPrimary }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <div
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderSubtle,
              }}
              className="rounded-3xl border p-3.5"
            >
              <p style={{ color: theme.textPrimary }} className="text-xs font-semibold mb-2">
                Promo or Education Code
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Try MERDEKA100 or EDU5"
                  style={{
                    backgroundColor: theme.bgPrimary,
                    color: theme.textPrimary,
                    borderColor: theme.border,
                  }}
                  className="flex-1 text-xs rounded-xl px-3 py-2 border outline-none uppercase"
                />
                <AppleButton size="sm" variant="secondary" onClick={handleApplyPromo}>
                  Apply
                </AppleButton>
              </div>
              {cartSummary.promoLabel && (
                <p
                  style={{
                    color: cartSummary.promoValid ? theme.success : theme.danger,
                  }}
                  className="text-[11px] font-medium mt-1.5"
                >
                  {cartSummary.promoLabel}
                </p>
              )}
            </div>

            {/* Summary Card */}
            <div
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderSubtle,
              }}
              className="rounded-3xl border p-4 space-y-2 text-xs"
            >
              <div className="flex justify-between">
                <span style={{ color: theme.textSecondary }}>Subtotal</span>
                <span style={{ color: theme.textPrimary }} className="font-semibold">
                  {Formatters.currencyMYR(cartSummary.subtotalMYR)}
                </span>
              </div>
              {cartSummary.discountMYR > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: theme.success }}>Promo Discount</span>
                  <span style={{ color: theme.success }} className="font-semibold">
                    - {Formatters.currencyMYR(cartSummary.discountMYR)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span style={{ color: theme.textSecondary }}>Estimated Shipping (MY)</span>
                <span style={{ color: theme.textPrimary }} className="font-semibold">
                  {cartSummary.shippingMYR === 0
                    ? "FREE"
                    : Formatters.currencyMYR(cartSummary.shippingMYR)}
                </span>
              </div>
              <div
                style={{ borderColor: theme.borderSubtle }}
                className="pt-2.5 border-t flex justify-between items-baseline"
              >
                <span style={{ color: theme.textPrimary }} className="text-sm font-bold">
                  Total (MYR)
                </span>
                <div className="text-right">
                  <span style={{ color: theme.textPrimary }} className="text-lg font-bold">
                    {Formatters.currencyMYR(cartSummary.totalMYR)}
                  </span>
                  <p style={{ color: theme.textTertiary }} className="text-[10px]">
                    Includes 0% SST / Duty Paid
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <AppleButton fullWidth onClick={() => navigate("Checkout")}>
                  Check Out ({Formatters.currencyMYR(cartSummary.totalMYR)})
                </AppleButton>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

// 26.10 CheckoutScreen
const CheckoutScreen = () => {
  const { theme, showToast } = useApp();
  const { cartSummary } = useCart();
  const {
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    activeAddress,
  } = useCheckout();
  const { placeOrder } = useOrders();
  const { navigate } = useNavigation();
  const [orderNote, setOrderNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const deliveryOptions = [
    {
      id: "standard",
      title: "Standard Courier (DHL / NinjaVan MY)",
      desc: "2–3 business days • Free over RM 250",
    },
    {
      id: "express",
      title: "Same-Day / Next-Day Express",
      desc: "Klang Valley, Penang & JB (+RM 35)",
    },
    {
      id: "pickup_trx",
      title: "Apple Store Pickup — The Exchange TRX",
      desc: "Ready in 2 hours • Kuala Lumpur (FREE)",
    },
  ];

  const paymentOptions = [
    { id: "apple_pay", label: "Apple Pay", sub: "Touch ID / Face ID Instant" },
    { id: "fpx", label: "FPX Online Banking", sub: "Maybank2u, CIMB Clicks, Public Bank, RHB" },
    { id: "card", label: "Credit / Debit Card (0% EPP)", sub: "Visa / Mastercard Malaysia" },
    { id: "grabpay", label: "GrabPay Malaysia", sub: "Earn GrabRewards points" },
  ];

  const handleConfirmOrder = async () => {
    if (deliveryMethod !== "pickup_trx" && !activeAddress) {
      showToast("Please add a Malaysian shipping address", "warning");
      return;
    }
    setSubmitting(true);
    const created = await placeOrder(orderNote);
    setSubmitting(false);
    navigate("OrderConfirmation", { order: created });
  };

  return (
    <CheckoutLayout
      title="Checkout"
      step={2}
      footer={
        <AppleButton fullWidth disabled={submitting} onClick={handleConfirmOrder}>
          {submitting
            ? "Authorizing MYR Payment..."
            : `Pay ${Formatters.currencyMYR(cartSummary.totalMYR)}`}
        </AppleButton>
      }
    >
      <div className="space-y-4">
        {/* Delivery Method */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border p-4 space-y-2.5"
        >
          <h3 style={{ color: theme.textPrimary }} className="text-sm font-bold">
            1. Delivery or Pickup
          </h3>
          {deliveryOptions.map((opt) => {
            const active = deliveryMethod === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDeliveryMethod(opt.id)}
                style={{
                  borderColor: active ? theme.accent : theme.border,
                  backgroundColor: active ? theme.accentSoft : "transparent",
                }}
                className="w-full p-3 rounded-2xl border text-left flex items-center justify-between"
              >
                <div>
                  <p style={{ color: theme.textPrimary }} className="text-xs font-semibold">
                    {opt.title}
                  </p>
                  <p style={{ color: theme.textSecondary }} className="text-[11px] mt-0.5">
                    {opt.desc}
                  </p>
                </div>
                {active && <CheckCircle2 size={18} style={{ color: theme.accent }} />}
              </button>
            );
          })}
        </div>

        {/* Shipping Address */}
        {deliveryMethod !== "pickup_trx" && (
          <div
            style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
            className="rounded-3xl border p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 style={{ color: theme.textPrimary }} className="text-sm font-bold">
                2. Shipping Address
              </h3>
              <button
                type="button"
                onClick={() => navigate("Address")}
                style={{ color: theme.accent }}
                className="text-xs font-semibold"
              >
                Change
              </button>
            </div>
            {activeAddress ? (
              <div className="text-xs space-y-1">
                <p style={{ color: theme.textPrimary }} className="font-semibold">
                  {activeAddress.recipientName} ({activeAddress.phone})
                </p>
                <p style={{ color: theme.textSecondary }} className="leading-relaxed">
                  {Formatters.addressMY(activeAddress)}
                </p>
              </div>
            ) : (
              <AppleButton size="sm" onClick={() => navigate("Address")}>
                Add Malaysia Address
              </AppleButton>
            )}
          </div>
        )}

        {/* Payment Method */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border p-4 space-y-2.5"
        >
          <h3 style={{ color: theme.textPrimary }} className="text-sm font-bold">
            3. Payment Method (MYR)
          </h3>
          {paymentOptions.map((pm) => {
            const active = paymentMethod === pm.id;
            return (
              <button
                key={pm.id}
                type="button"
                onClick={() => setPaymentMethod(pm.id)}
                style={{
                  borderColor: active ? theme.accent : theme.border,
                  backgroundColor: active ? theme.accentSoft : "transparent",
                }}
                className="w-full p-3 rounded-2xl border text-left flex items-center justify-between"
              >
                <div>
                  <p style={{ color: theme.textPrimary }} className="text-xs font-semibold">
                    {pm.label}
                  </p>
                  <p style={{ color: theme.textSecondary }} className="text-[11px] mt-0.5">
                    {pm.sub}
                  </p>
                </div>
                {active && <CheckCircle2 size={18} style={{ color: theme.accent }} />}
              </button>
            );
          })}
        </div>

        {/* Gift Message / Delivery Note */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border p-4"
        >
          <AppleInput
            label="Free Gift Engraving / Rider Note (Optional)"
            value={orderNote}
            onChange={setOrderNote}
            placeholder="e.g. Leave at condo guardhouse..."
          />
        </div>
      </div>
    </CheckoutLayout>
  );
};

// 26.11 OrderConfirmationScreen
const OrderConfirmationScreen = ({ params }) => {
  const { theme } = useApp();
  const { resetToTab, navigate } = useNavigation();
  const order = params?.order;

  return (
    <div
      style={{ backgroundColor: theme.bgPrimary }}
      className="flex-1 flex flex-col justify-between p-6 text-center animate-fade-up"
    >
      <div className="my-auto">
        <div
          style={{ backgroundColor: "rgba(40, 205, 65, 0.15)", color: theme.success }}
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5"
        >
          <CheckCircle2 size={44} />
        </div>
        <AppleBadge tone="success">Payment Confirmed (MYR)</AppleBadge>
        <h2 style={{ color: theme.textPrimary }} className="text-2xl font-bold mt-3">
          Thank you for your order.
        </h2>
        <p style={{ color: theme.textSecondary }} className="text-xs mt-2 leading-relaxed">
          Order <strong style={{ color: theme.textPrimary }}>#{order?.orderNumber}</strong> has been received by Apple Malaysia. We’ve sent a receipt to your email.
        </p>

        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="mt-6 rounded-3xl border p-4 text-left space-y-2 text-xs"
        >
          <div className="flex justify-between">
            <span style={{ color: theme.textSecondary }}>Amount Paid</span>
            <span style={{ color: theme.textPrimary }} className="font-bold">
              {Formatters.currencyMYR(order?.summary?.totalMYR || 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: theme.textSecondary }}>Fulfillment</span>
            <span style={{ color: theme.textPrimary }} className="font-semibold">
              {order?.deliveryMethod === "pickup_trx"
                ? "Pickup at Apple TRX"
                : "Courier Delivery (MY)"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <AppleButton
          fullWidth
          onClick={() => {
            resetToTab("account");
            navigate("Orders");
          }}
        >
          Track My Order
        </AppleButton>
        <AppleButton fullWidth variant="secondary" onClick={() => resetToTab("home")}>
          Continue Shopping
        </AppleButton>
      </div>
    </div>
  );
};

// 26.12 OrdersScreen
const OrdersScreen = () => {
  const { theme } = useApp();
  const { orders } = useOrders();
  const { navigate } = useNavigation();

  return (
    <DetailLayout title="My Orders">
      <div className="px-4 pt-4 space-y-3">
        {orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No Orders Yet"
            description="Your Apple Store Malaysia order history and e-invoices will appear here."
            actionLabel="Start Shopping"
            onAction={() => navigate("home")}
          />
        ) : (
          orders.map((ord) => (
            <div
              key={ord.orderNumber}
              onClick={() => navigate("OrderDetails", { order: ord })}
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderSubtle,
              }}
              className="rounded-3xl border p-4 cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: theme.textPrimary }} className="text-xs font-bold">
                  Order #{ord.orderNumber}
                </span>
                <AppleBadge tone={ord.status === "Delivered" ? "success" : "accent"}>
                  {ord.status}
                </AppleBadge>
              </div>
              <p style={{ color: theme.textSecondary }} className="text-[11px]">
                Placed on {Formatters.dateMY(ord.createdAt)} • {ord.items.length} item(s)
              </p>
              <div className="mt-3 pt-2.5 border-t flex items-center justify-between" style={{ borderColor: theme.borderSubtle }}>
                <PriceDisplay amountMYR={ord.summary?.totalMYR} size="sm" />
                <span style={{ color: theme.accent }} className="text-xs font-semibold flex items-center gap-1">
                  Details <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </DetailLayout>
  );
};

// 26.13 OrderDetailsScreen
const OrderDetailsScreen = ({ params }) => {
  const { theme } = useApp();
  const order = params?.order;

  if (!order) return null;

  return (
    <DetailLayout title={`#${order.orderNumber}`}>
      <div className="px-4 pt-4 space-y-4">
        {/* Timeline */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border p-4"
        >
          <h3 style={{ color: theme.textPrimary }} className="text-sm font-bold mb-3">
            Shipment Tracking
          </h3>
          <div className="space-y-3">
            {order.timeline?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  style={{
                    backgroundColor: step.completed ? theme.success : theme.bgTertiary,
                    color: step.completed ? "#FFF" : theme.textTertiary,
                  }}
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                >
                  <Check size={12} />
                </div>
                <div>
                  <p style={{ color: theme.textPrimary }} className="text-xs font-semibold">
                    {step.title}
                  </p>
                  <p style={{ color: theme.textSecondary }} className="text-[11px]">
                    {step.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border p-4 space-y-3"
        >
          <h3 style={{ color: theme.textPrimary }} className="text-sm font-bold">
            Items Purchased
          </h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1">
                <p style={{ color: theme.textPrimary }} className="text-xs font-bold">
                  {item.name}
                </p>
                <p style={{ color: theme.textSecondary }} className="text-[11px]">
                  Qty: {item.quantity} • {item.selectedColor?.name}
                </p>
              </div>
              <PriceDisplay amountMYR={item.unitPriceMYR * item.quantity} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </DetailLayout>
  );
};

// 26.14 NotificationsScreen
const NotificationsScreen = () => {
  const { theme, notifications, setNotifications } = useApp();

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DetailLayout
      title="Notifications"
      rightAction={
        <button
          type="button"
          onClick={markAllRead}
          style={{ color: theme.accent }}
          className="text-xs font-semibold"
        >
          Read All
        </button>
      }
    >
      <div className="px-4 pt-4 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: n.read ? theme.borderSubtle : theme.accent,
            }}
            className="rounded-2xl border p-3.5"
          >
            <div className="flex items-center justify-between">
              <h4 style={{ color: theme.textPrimary }} className="text-xs font-bold">
                {n.title}
              </h4>
              <span style={{ color: theme.textTertiary }} className="text-[10px]">
                {n.time}
              </span>
            </div>
            <p style={{ color: theme.textSecondary }} className="text-xs mt-1 leading-relaxed">
              {n.body}
            </p>
          </div>
        ))}
      </div>
    </DetailLayout>
  );
};

// 26.15 LoginScreen
const LoginScreen = ({ params }) => {
  const { login } = useAuth();
  const { navigate, goBack } = useNavigation();
  const { theme } = useApp();

  const [email, setEmail] = useState("aiman.hakim@icloud.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!Validators.email(email)) {
      setError("Please enter a valid Apple ID email address");
      return;
    }
    if (!Validators.required(password)) {
      setError("Password is required");
      return;
    }
    login(email, password);
    if (params?.redirectTo) {
      navigate(params.redirectTo, params.redirectParams);
    } else {
      goBack();
    }
  };

  return (
    <AuthLayout
      title="Sign in with Apple ID"
      subtitle="Access your Malaysia orders, saved bag, and Apple The Exchange TRX pickup passes."
    >
      <AppleInput
        label="Apple ID (Email)"
        value={email}
        onChange={setEmail}
        placeholder="name@icloud.com"
        error={error}
      />
      <AppleInput
        label="Password"
        type={showPwd ? "text" : "password"}
        value={password}
        onChange={setPassword}
        placeholder="Enter password"
        rightElement={
          <button type="button" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? (
              <EyeOff size={16} style={{ color: theme.textSecondary }} />
            ) : (
              <Eye size={16} style={{ color: theme.textSecondary }} />
            )}
          </button>
        }
      />
      <div className="mt-4 space-y-3">
        <AppleButton fullWidth onClick={handleSubmit}>
          Sign In
        </AppleButton>
        <AppleButton
          fullWidth
          variant="ghost"
          onClick={() => navigate("Register")}
        >
          Don’t have an Apple ID? Create one now
        </AppleButton>
      </div>
    </AuthLayout>
  );
};

// 26.16 RegisterScreen
const RegisterScreen = () => {
  const { register } = useAuth();
  const { resetToTab } = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+60 1");
  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    const nextErr = {};
    if (!Validators.required(name)) nextErr.name = "Full name is required";
    if (!Validators.email(email)) nextErr.email = "Valid email is required";
    if (!Validators.phoneMY(phone)) nextErr.phone = "Enter a valid Malaysian mobile (+601...)";

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) return;

    register({ name, email, phone });
    resetToTab("account");
  };

  return (
    <AuthLayout
      title="Create Apple ID"
      subtitle="One Apple ID gives you access to all Apple services across Malaysia."
    >
      <AppleInput
        label="Full Name (as per MyKad / Passport)"
        value={name}
        onChange={setName}
        placeholder="Nurul Aina binti Zulkifli"
        error={errors.name}
      />
      <AppleInput
        label="Email Address"
        value={email}
        onChange={setEmail}
        placeholder="nurul.aina@icloud.com"
        error={errors.email}
      />
      <AppleInput
        label="Malaysia Mobile Number"
        value={phone}
        onChange={setPhone}
        placeholder="+60 12-345 6789"
        error={errors.phone}
      />
      <div className="mt-4">
        <AppleButton fullWidth onClick={handleRegister}>
          Create Apple ID
        </AppleButton>
      </div>
    </AuthLayout>
  );
};

// 26.17 ProfileScreen
const ProfileScreen = () => {
  const { theme, showToast } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlistIds } = useProducts();
  const { orders } = useOrders();
  const { navigate } = useNavigation();

  const menuItems = [
    {
      label: "My Orders & Tracking",
      sub: `${orders.length} order(s) in Malaysia`,
      icon: Package,
      onClick: () => navigate("Orders"),
    },
    {
      label: "Saved Wishlist",
      sub: `${wishlistIds.length} saved product(s)`,
      icon: Heart,
      onClick: () => navigate("Wishlist"),
    },
    {
      label: "Malaysia Delivery Addresses",
      sub: "Manage Klang Valley & nationwide addresses",
      icon: MapPin,
      onClick: () => navigate("Address"),
    },
    {
      label: "App Preferences & Region",
      sub: "Malaysia (MYR / RM) • Dark Mode • Device Frame",
      icon: Settings,
      onClick: () => navigate("Settings"),
    },
  ];

  return (
    <MainLayout title="Account">
      <div className="px-4 pt-4 space-y-4">
        {isAuthenticated ? (
          <div
            style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
            className="rounded-3xl border p-4 flex items-center gap-3.5"
          >
            <div className="relative">
              <div
                style={{ backgroundColor: theme.accent, color: "#FFF" }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <button
                type="button"
                onClick={() => showToast("Camera & Gallery permission ready", "info")}
                style={{ backgroundColor: theme.bgTertiary, color: theme.textPrimary }}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow"
              >
                <Camera size={12} />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h3 style={{ color: theme.textPrimary }} className="text-base font-bold truncate">
                {user.name}
              </h3>
              <p style={{ color: theme.textSecondary }} className="text-xs truncate">
                {user.email}
              </p>
              <div className="mt-1">
                <AppleBadge tone="accent">{user.tier}</AppleBadge>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
            className="rounded-3xl border p-5 text-center"
          >
            <h3 style={{ color: theme.textPrimary }} className="text-base font-bold">
              Sign in to Apple Store Malaysia
            </h3>
            <p style={{ color: theme.textSecondary }} className="text-xs mt-1 mb-4">
              Track orders, manage saved devices, and speed through checkout.
            </p>
            <AppleButton fullWidth onClick={() => navigate("Login")}>
              Sign In with Apple ID
            </AppleButton>
          </div>
        )}

        {/* Menu List */}
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border divide-y overflow-hidden"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                style={{ borderColor: theme.borderSubtle }}
                className="w-full p-4 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: theme.bgTertiary, color: theme.accent }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p style={{ color: theme.textPrimary }} className="text-xs font-bold">
                      {item.label}
                    </p>
                    <p style={{ color: theme.textSecondary }} className="text-[11px]">
                      {item.sub}
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: theme.textTertiary }} />
              </button>
            );
          })}
        </div>

        {isAuthenticated && (
          <AppleButton
            fullWidth
            variant="secondary"
            onClick={logout}
            icon={<LogOut size={15} />}
          >
            Sign Out
          </AppleButton>
        )}
      </div>
    </MainLayout>
  );
};

// 26.18 AddressScreen
const AddressScreen = () => {
  const { theme } = useApp();
  const { addresses, saveAddress } = useAuth();
  const { selectedAddressId, setSelectedAddressId } = useCheckout();
  const { goBack } = useNavigation();

  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    label: "Office",
    recipientName: "",
    phone: "+60 1",
    line1: "",
    postcode: "",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
  });
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const nextErr = {};
    if (!Validators.required(form.recipientName)) nextErr.recipientName = "Recipient required";
    if (!Validators.phoneMY(form.phone)) nextErr.phone = "Valid MY phone required";
    if (!Validators.required(form.line1)) nextErr.line1 = "Street address required";
    if (!Validators.postcodeMY(form.postcode)) nextErr.postcode = "5-digit MY postcode required";

    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) return;

    saveAddress({ ...form, isDefault: true });
    setAdding(false);
  };

  return (
    <DetailLayout title="Malaysia Addresses">
      <div className="px-4 pt-4 space-y-4">
        {!adding ? (
          <>
            {addresses.map((addr) => {
              const selected = addr.id === selectedAddressId;
              return (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddressId(addr.id);
                    goBack();
                  }}
                  style={{
                    backgroundColor: theme.bgSecondary,
                    borderColor: selected ? theme.accent : theme.borderSubtle,
                  }}
                  className="rounded-3xl border p-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <AppleBadge tone={selected ? "accent" : "neutral"}>{addr.label}</AppleBadge>
                    {selected && <CheckCircle2 size={16} style={{ color: theme.accent }} />}
                  </div>
                  <p style={{ color: theme.textPrimary }} className="text-xs font-bold mt-2">
                    {addr.recipientName} • {addr.phone}
                  </p>
                  <p style={{ color: theme.textSecondary }} className="text-xs mt-1 leading-relaxed">
                    {Formatters.addressMY(addr)}
                  </p>
                </div>
              );
            })}
            <AppleButton fullWidth onClick={() => setAdding(true)} icon={<Plus size={16} />}>
              Add New Malaysia Address
            </AppleButton>
          </>
        ) : (
          <div
            style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
            className="rounded-3xl border p-4"
          >
            <h3 style={{ color: theme.textPrimary }} className="text-sm font-bold mb-3">
              New Delivery Address
            </h3>
            <AppleInput
              label="Address Label"
              value={form.label}
              onChange={(v) => setForm({ ...form, label: v })}
              placeholder="Home / Office"
            />
            <AppleInput
              label="Recipient Name"
              value={form.recipientName}
              onChange={(v) => setForm({ ...form, recipientName: v })}
              error={errors.recipientName}
            />
            <AppleInput
              label="Mobile Phone (+60)"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              error={errors.phone}
            />
            <AppleInput
              label="Street Address / Condo / Taman"
              value={form.line1}
              onChange={(v) => setForm({ ...form, line1: v })}
              error={errors.line1}
            />
            <div className="grid grid-cols-2 gap-2">
              <AppleInput
                label="Postcode"
                maxLength={5}
                value={form.postcode}
                onChange={(v) => setForm({ ...form, postcode: v })}
                error={errors.postcode}
              />
              <AppleInput
                label="City"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
              />
            </div>
            <div className="mb-4">
              <label
                style={{ color: theme.textSecondary }}
                className="block text-xs font-medium mb-1.5 ml-1"
              >
                State / Federal Territory
              </label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.textPrimary,
                  borderColor: theme.border,
                }}
                className="w-full border rounded-2xl px-3.5 py-2.5 text-sm outline-none"
              >
                {ENV_CONSTANTS.market.states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <AppleButton fullWidth variant="secondary" onClick={() => setAdding(false)}>
                Cancel
              </AppleButton>
              <AppleButton fullWidth onClick={handleSave}>
                Save Address
              </AppleButton>
            </div>
          </div>
        )}
      </div>
    </DetailLayout>
  );
};

// 26.19 SettingsScreen
const SettingsScreen = ({ device }) => {
  const {
    theme,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    isOnline,
    setIsOnline,
    showToast,
  } = useApp();

  return (
    <DetailLayout title="Settings">
      <div className="px-4 pt-4 space-y-4">
        <div
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderSubtle }}
          className="rounded-3xl border divide-y overflow-hidden"
        >
          {/* Dark Mode */}
          <div
            style={{ borderColor: theme.borderSubtle }}
            className="p-4 flex items-center justify-between"
          >
            <div>
              <p style={{ color: theme.textPrimary }} className="text-xs font-bold">
                Appearance (Dark Mode)
              </p>
              <p style={{ color: theme.textSecondary }} className="text-[11px]">
                Switch between Light & OLED Black
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              style={{ backgroundColor: darkMode ? theme.accent : theme.bgTertiary }}
              className="w-11 h-6 rounded-full p-0.5 transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Platform Simulation Toggle */}
          <div
            style={{ borderColor: theme.borderSubtle }}
            className="p-4 flex items-center justify-between"
          >
            <div>
              <p style={{ color: theme.textPrimary }} className="text-xs font-bold">
                Platform Simulation ({device.platform.toUpperCase()})
              </p>
              <p style={{ color: theme.textSecondary }} className="text-[11px]">
                Toggle iOS Safe Area vs Android status bar
              </p>
            </div>
            <AppleButton size="sm" variant="secondary" onClick={device.togglePlatform}>
              Switch
            </AppleButton>
          </div>

          {/* Offline Mode Simulation (18 & 38. Network Connectivity & Offline Support) */}
          <div
            style={{ borderColor: theme.borderSubtle }}
            className="p-4 flex items-center justify-between"
          >
            <div>
              <p style={{ color: theme.textPrimary }} className="text-xs font-bold">
                Network Connectivity
              </p>
              <p style={{ color: theme.textSecondary }} className="text-[11px]">
                Test offline catalog caching
              </p>
            </div>
            <AppleButton
              size="sm"
              variant={isOnline ? "secondary" : "danger"}
              onClick={() => {
                setIsOnline(!isOnline);
                showToast(!isOnline ? "Back Online (5G Malaysia)" : "Offline Mode Enabled", "info");
              }}
            >
              {isOnline ? "Online" : "Offline"}
            </AppleButton>
          </div>

          {/* Language Selector */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <p style={{ color: theme.textPrimary }} className="text-xs font-bold">
                Region & Language
              </p>
              <p style={{ color: theme.textSecondary }} className="text-[11px]">
                Malaysia • MYR (RM)
              </p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                backgroundColor: theme.bgTertiary,
                color: theme.textPrimary,
              }}
              className="text-xs font-semibold rounded-full px-3 py-1.5 outline-none"
            >
              {ENV_CONSTANTS.language.supported.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center text-[11px] space-y-1 pt-2" style={{ color: theme.textTertiary }}>
          <p>
            {APP_CONFIG.appName} v{APP_CONFIG.appVersion} ({APP_CONFIG.buildNumber})
          </p>
          <p>{APP_CONFIG.legalName} • All prices in Malaysian Ringgit (MYR)</p>
        </div>
      </div>
    </DetailLayout>
  );
};

/**
 * ============================================================================
 * 8. APP LAYOUT (Root Container, Drawer, Toast Host, Loading Host, Status Bar)
 * ============================================================================
 */
const AppLayout = ({ device }) => {
  const { theme, darkMode, toast, isOnline, isLoadingGlobal } = useApp();
  const {
    showSplash,
    onboardingCompleted,
    activeTab,
    currentScreen,
    drawerOpen,
    setDrawerOpen,
    navigate,
  } = useNavigation();
  const { categories } = useProducts();

  const renderActiveView = () => {
    if (showSplash) return <SplashScreen />;
    if (!onboardingCompleted) return <OnboardingScreen />;

    if (currentScreen) {
      switch (currentScreen.name) {
        case "Products":
          return <ProductsScreen params={currentScreen.params} />;
        case "ProductDetails":
          return <ProductDetailsScreen params={currentScreen.params} />;
        case "Wishlist":
          return <WishlistScreen />;
        case "Checkout":
          return <CheckoutScreen />;
        case "OrderConfirmation":
          return <OrderConfirmationScreen params={currentScreen.params} />;
        case "Orders":
          return <OrdersScreen />;
        case "OrderDetails":
          return <OrderDetailsScreen params={currentScreen.params} />;
        case "Notifications":
          return <NotificationsScreen />;
        case "Login":
          return <LoginScreen params={currentScreen.params} />;
        case "Register":
          return <RegisterScreen />;
        case "Address":
          return <AddressScreen />;
        case "Settings":
          return <SettingsScreen device={device} />;
        default:
          return <HomeScreen />;
      }
    }

    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "shop":
        return <CategoryScreen />;
      case "search":
        return <SearchScreen />;
      case "bag":
        return <CartScreen />;
      case "account":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-200 dark:bg-neutral-950 flex items-center justify-center p-2 sm:p-6">
      {/* Mobile Device Frame */}
      <div
        style={{
          backgroundColor: theme.bgPrimary,
          borderColor: darkMode ? "#2C2C2E" : "#1D1D1F",
        }}
        className="relative w-full max-w-[400px] h-[812px] max-h-[94vh] rounded-[48px] border-[10px] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Dynamic Island / Status Bar */}
        <div
          style={{
            backgroundColor: showSplash ? "#000000" : theme.cardGlass,
            color: showSplash ? "#FFFFFF" : theme.textPrimary,
          }}
          className="relative z-40 px-6 pt-2.5 pb-1.5 flex items-center justify-between text-[11px] font-semibold select-none shrink-0"
        >
          <span>8:15</span>
          {device.isIOS && (
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            {isOnline ? <Wifi size={13} /> : <WifiOff size={13} className="text-red-500" />}
            <span>5G</span>
            <div className="w-5 h-2.5 border border-current rounded-[3px] p-[1px]">
              <div className="h-full w-4/5 bg-current rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-amber-500 text-black text-[11px] font-semibold text-center py-1 px-3">
            Offline Mode • Viewing cached Malaysia catalog
          </div>
        )}

        {/* Main Screen Viewport */}
        {renderActiveView()}

        {/* Drawer Navigation Host */}
        {drawerOpen && (
          <div className="absolute inset-0 z-50 flex">
            <div
              onClick={() => setDrawerOpen(false)}
              className="flex-1 bg-black/45 backdrop-blur-xs"
            />
            <div
              style={{ backgroundColor: theme.bgSecondary }}
              className="w-72 h-full p-5 flex flex-col justify-between shadow-2xl animate-fade-up"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: theme.borderSubtle }}>
                  <div>
                    <h3 style={{ color: theme.textPrimary }} className="text-base font-bold">
                      Apple Store MY
                    </h3>
                    <p style={{ color: theme.textSecondary }} className="text-[11px]">
                      Kuala Lumpur • MYR (RM)
                    </p>
                  </div>
                  <button type="button" onClick={() => setDrawerOpen(false)}>
                    <X size={20} style={{ color: theme.textSecondary }} />
                  </button>
                </div>

                <div className="mt-4 space-y-1">
                  <p style={{ color: theme.textTertiary }} className="text-[10px] font-bold uppercase px-2 mb-1">
                    Categories
                  </p>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => navigate("Products", { category: cat })}
                      style={{ color: theme.textPrimary }}
                      className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-black/5"
                    >
                      <CategoryIcon name={cat.icon} size={16} />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t space-y-2" style={{ borderColor: theme.borderSubtle }}>
                <button
                  type="button"
                  onClick={() => navigate("Orders")}
                  style={{ color: theme.accent }}
                  className="w-full text-left text-xs font-semibold py-1.5"
                >
                  Track Malaysia Orders
                </button>
                <button
                  type="button"
                  onClick={() => navigate("Settings")}
                  style={{ color: theme.textSecondary }}
                  className="w-full text-left text-xs font-semibold py-1.5"
                >
                  Store Settings & Dark Mode
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Host */}
        {toast && (
          <div className="absolute top-14 left-4 right-4 z-50 flex justify-center pointer-events-none animate-fade-up">
            <div
              style={{
                backgroundColor: darkMode ? "#2C2C2E" : "#1D1D1F",
                color: "#FFFFFF",
              }}
              className="px-4 py-2.5 rounded-full shadow-xl text-xs font-medium flex items-center gap-2 max-w-full"
            >
              <Info size={14} className="text-blue-400 shrink-0" />
              <span className="truncate">{toast.message}</span>
            </div>
          </div>
        )}

        {/* Global Loading Host */}
        {isLoadingGlobal && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center">
            <div
              style={{ backgroundColor: theme.bgSecondary, color: theme.textPrimary }}
              className="px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold"
            >
              <RefreshCw size={16} className="animate-spin text-blue-500" />
              <span>Processing with Apple Malaysia...</span>
            </div>
          </div>
        )}

        {/* Home Indicator Bar */}
        {device.isIOS && (
          <div
            style={{ backgroundColor: showSplash ? "#000000" : theme.cardGlass }}
            className="h-4 flex items-center justify-center shrink-0"
          >
            <div className="w-32 h-1 rounded-full bg-neutral-400/60" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * 33. ERROR HANDLING (Error Boundary)
 * ============================================================================
 */
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || "Unexpected error" };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-neutral-100">
          <AlertCircle size={40} className="text-red-500 mb-3" />
          <h2 className="text-lg font-bold">Apple Store MY Encountered an Issue</h2>
          <p className="text-xs text-neutral-600 mt-1 mb-4">{this.state.errorMessage}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold"
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * ============================================================================
 * 40 & 41. MAIN APP & APP ENTRY POINT
 * ============================================================================
 */
export default function App() {
  const device = useDevicePlatform();

  return (
    <AppErrorBoundary>
      <GlobalStyles />
      <GlobalProviders>
        <NavigationProvider>
          <AppLayout device={device} />
        </NavigationProvider>
      </GlobalProviders>
    </AppErrorBoundary>
  );
}
