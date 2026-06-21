import { useState, useEffect } from "react";
import { MenuItem, ComboOffer, CustomerReview, CustomerInquiry, CartItem } from "./types";
import { 
  CATEGORIES, 
  INITIAL_MENU, 
  INITIAL_COMBOS, 
  INITIAL_REVIEWS, 
  INITIAL_GALLERY 
} from "./initialData";

// Core Components
import AdminPanel from "./components/AdminPanel";
import CartModal from "./components/CartModal";
import GallerySection from "./components/GallerySection";
import ReviewSection from "./components/ReviewSection";
import ContactSection from "./components/ContactSection";

// Lucide Icons
import * as Icons from "lucide-react";
import { 
  Pizza, Egg, Flame, GlassWater, IceCream, Star, 
  ShoppingCart, Phone, MapPin, Clock, Search, ChevronRight, 
  Lock, ArrowRight, ShieldCheck, Heart, Sparkles, Utensils, 
  TrendingUp, ThumbsUp, Calendar, Inbox, Mail, CheckCircle, Quote,
  Home, Menu, X
} from "lucide-react";

import React, { useRef } from "react";

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
      }`}
    >
      {children}
    </div>
  );
}

export default function App() {
  // CENTRAL DATABASE STATES (Synchronized with LocalStorage)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem("saifood_menu");
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [combos, setCombos] = useState<ComboOffer[]>(() => {
    const saved = localStorage.getItem("saifood_combos_v3");
    return saved ? JSON.parse(saved) : INITIAL_COMBOS;
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem("saifood_reviews");
    const loadedReviews: CustomerReview[] = saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    // Filter out the spam/test reviews
    return loadedReviews.filter(
      r => !r.name.includes("srdytfuygoipo") && !r.comment.includes("aeesrdtfyuiuoip")
    );
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    const saved = localStorage.getItem("saifood_inquiries");
    if (saved) return JSON.parse(saved);
    // Initial dummy inquiries to seed the Admin Panel inbox nicely
    return [
      {
        id: "seed_inq_1",
        name: "Vikram Rathore",
        email: "vikram007@gmail.com",
        phone: "+91 99887 76655",
        message: "Wanted to check if you guys accept catering bookings for private home birthday parties for around 35 people this Sunday? I love your standard Chicken Pizza and Chicken lollipops.",
        date: "2026-06-19",
        status: "new"
      },
      {
        id: "seed_inq_2",
        name: "Dr. Shalini Mehta",
        email: "shalini.m@hospital.org",
        phone: "+91 94433 22110",
        message: "Our medical team regularly orders veg wraps and butterscotch milkshakes for late shifts from Saifoodlover Chef. Thank you for the hygienic preparation!",
        date: "2026-06-20",
        status: "read"
      }
    ];
  });

  // CART & CHECKOUT CONTROLLERS
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("saifood_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ACTIVE INTERACTION STATES
  const [selectedCategory, setSelectedCategory] = useState<string>("pizzas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // MODALS TOGGLERS
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Synchronize dynamic states in localStorage
  useEffect(() => {
    localStorage.setItem("saifood_menu", JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem("saifood_combos_v3", JSON.stringify(combos));
  }, [combos]);

  useEffect(() => {
    localStorage.setItem("saifood_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("saifood_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("saifood_cart", JSON.stringify(cart));
  }, [cart]);

  // Category Icon Dynamic Resolver (Safe mapped fallback)
  const getCategoryIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Pizza: <Pizza className="w-5 h-5 text-[#f57c00]" />,
      Egg: <Egg className="w-5 h-5 text-[#f57c00]" />,
      Flame: <Flame className="w-5 h-5 text-[#f57c00]" />,
      GlassWater: <GlassWater className="w-5 h-5 text-[#f57c00]" />,
      IceCream: <IceCream className="w-5 h-5 text-[#f57c00]" />,
    };
    return iconMap[iconName] || <Utensils className="w-5 h-5 text-[#f57c00]" />;
  };

  // Push incoming inquiries
  const handleAddInquiry = (inq: CustomerInquiry) => {
    setInquiries(prev => [inq, ...prev]);
  };

  // Quick WhatsApp call for main CTAs
  const handleGeneralWhatsAppChat = () => {
    const messageText = encodeURIComponent("Hello! I am viewing the Saifoodlover Cafe digital menu and want to place a custom order! Please guide me. 😊🍟");
    window.open(`https://api.whatsapp.com/send?phone=919949466307&text=${messageText}`, "_blank");
  };

  const cartTotalAmount = cart.reduce((sum, ci) => {
    const price = ci.selectedVariant ? ci.selectedVariant.price : ci.item.price;
    return sum + (price * ci.quantity);
  }, 0);

  const cartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070709] text-[#e0e0e0] font-sans overflow-x-hidden antialiased">
      
      {/* 1. MAIN FLOATING STICKY NAV BAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#09090c]/90 backdrop-blur-md border-b-2 border-[#ffd700]/30 py-5 transition-all shadow-lg shadow-[#000]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative p-3 bg-gradient-to-br from-[#f57c00] to-orange-600 rounded-2xl shadow-xl border-2 border-[#ffd700]/40 group-hover:scale-105 transition-transform duration-300">
              <Pizza className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ffd700] rounded-full animate-ping" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffd700] to-[#f57c00] block uppercase leading-none drop-shadow-md">
                Saifoodlover
              </span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-mono tracking-widest block uppercase mt-1 font-semibold">Good Food • Good Mood</span>
            </div>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-2 text-sm sm:text-base font-bold tracking-wide">
            <a href="#" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#ffd700] hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-[#ffd700]/10">
              <Home className="w-4 h-4 text-[#ffd700]/80" />
              <span>Home</span>
            </a>
            <a href="#menu" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#ffd700] hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-[#ffd700]/10">
              <Utensils className="w-4 h-4 text-[#ffd700]/80" />
              <span>Full Menu</span>
            </a>
            <a href="#combos" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#ffd700] hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-[#ffd700]/10">
              <Sparkles className="w-4 h-4 text-[#ffd700]/80" />
              <span>Meal Combos</span>
            </a>
            <a href="#reviews" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#ffd700] hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-[#ffd700]/10">
              <Heart className="w-4 h-4 text-[#ffd700]/80" />
              <span>Testimonials</span>
            </a>
            <a href="#contact" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-[#ffd700] hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-[#ffd700]/10">
              <MapPin className="w-4 h-4 text-[#ffd700]/80" />
              <span>Find Us</span>
            </a>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin toggle Button */}
            <button
              id="nav-toggle-admin"
              onClick={() => setIsAdminOpen(true)}
              className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-gray-950 to-[#111115] border-2 border-[#ffd700]/25 hover:border-[#ffd700]/60 rounded-xl text-xs font-black text-[#ffd700] uppercase tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow hover:brightness-110 shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-[#ffd700]" />
              <span className="hidden xs:inline">Admin Hub</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="nav-toggle-cart"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:p-3 bg-gradient-to-br from-[#f57c00] to-orange-500 rounded-xl hover:brightness-110 text-white transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg shadow-[#f57c00]/15 shrink-0 border-2 border-[#f57c00]/40"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ffd700] text-black text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#09090c] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button on Mobile */}
            <button
              id="nav-toggle-mobile-menu"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-2.5 md:hidden bg-gradient-to-r from-gray-950 to-[#111115] border-2 border-gray-850 hover:border-[#ffd700] rounded-xl text-[#ffd700] flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              {isMobileMenuOpen ? (
                <X className="w-4.5 h-4.5" />
              ) : (
                <Menu className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[82px] left-0 right-0 z-30 bg-[#09090c]/95 backdrop-blur-md border-b-2 border-[#ffd700]/25 py-4 px-6 flex flex-col gap-3 font-semibold uppercase tracking-wider text-xs border-t border-white/5 animate-in slide-in-from-top duration-300">
          <a 
            href="#" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-3 hover:bg-white/5 rounded-xl text-gray-300 hover:text-[#ffd700] transition-all"
          >
            <Home className="w-4 h-4 text-[#ffd700]" />
            <span>Home</span>
          </a>
          <a 
            href="#menu" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-3 hover:bg-white/5 rounded-xl text-gray-300 hover:text-[#ffd700] transition-all"
          >
            <Utensils className="w-4 h-4 text-[#ffd700]" />
            <span>Full Menu</span>
          </a>
          <a 
            href="#combos" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-3 hover:bg-white/5 rounded-xl text-gray-300 hover:text-[#ffd700] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span>Meal Combos</span>
          </a>
          <a 
            href="#reviews" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-3 hover:bg-white/5 rounded-xl text-gray-300 hover:text-[#ffd700] transition-all"
          >
            <Heart className="w-4 h-4 text-[#ffd700]" />
            <span>Testimonials</span>
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-3 hover:bg-white/5 rounded-xl text-gray-300 hover:text-[#ffd700] transition-all"
          >
            <MapPin className="w-4 h-4 text-[#ffd700]" />
            <span>Find Us</span>
          </a>
        </div>
      )}

      {/* 2. FULL SCREEN HERO BANNER */}
      <header className="relative mt-[82px] py-24 sm:py-32 bg-cover bg-center overflow-hidden flex items-center select-none" style={{ backgroundImage: "linear-gradient(rgba(7, 7, 9, 0.93), rgba(7, 7, 9, 0.95)), url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&auto=format&fit=crop&q=80')" }}>
        {/* Soft Radial Gold Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,124,0,0.1),transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text (Takes 7/12 on large) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f57c00]/10 border border-[#f57c00]/30 rounded-full text-[10px] uppercase font-bold text-[#f57c00] tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Hand-Tossed Stone-Baked Pizzas &amp; Thick Milkshakes
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              Taste That Makes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#f57c00] to-orange-400">
                You Smile 😊
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 font-serif leading-relaxed italic">
              Welcome to *Saifoodlover Cafe*. Enjoy hygienic preparations of hot, crunchy, spicy gourmet pizzas, loaded cheese burgers and ice-cold fresh fruit thick mojitos.
            </p>

            <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl max-w-sm sm:max-w-md mx-auto lg:mx-0 font-mono text-[11px] text-gray-400">
              <span className="text-[#ffd700]">⚡ Fresh</span>
              <span className="text-gray-600">•</span>
              <span className="text-[#ffd700]">🔥 Delicious</span>
              <span className="text-gray-600">•</span>
              <span className="text-[#ffd700]">💎 Highly Affordable</span>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#f57c00] to-orange-500 hover:brightness-115 text-white font-black rounded-xl transition-all shadow-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Explore Full Menu <ChevronRight className="w-4 h-4" />
              </a>

              <button
                id="hero-order-whatsapp-btn"
                onClick={handleGeneralWhatsAppChat}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-gray-900 to-[#121216] hover:brightness-110 border border-gray-700 text-[#ffd700] hover:text-white font-extrabold rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Order on WhatsApp</span> <Phone className="w-3.5 h-3.5 text-green-400" />
              </button>
            </div>
          </div>

          {/* Hero images grid collage (Takes 5/12 on large) */}
          <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center h-[400px]">
            {/* Background gold rings */}
            <div className="absolute w-80 h-80 rounded-full border border-dashed border-[#ffd700]/10 animate-spin" style={{ animationDuration: "120s" }} />
            <div className="absolute w-64 h-64 rounded-full border border-[#f57c00]/10 animate-spin" style={{ animationDuration: "60s" }} />

            {/* Interactive Bento floating photos */}
            <div className="relative grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="space-y-4">
                <div className="h-44 rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative group">
                  <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  <span className="absolute bottom-3 left-3 bg-[#000]/80 px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold uppercase tracking-widest border border-white/5">🍕 Pizza</span>
                </div>
                <div className="h-32 rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative group">
                  <img src="https://images.unsplash.com/photo-1562967914-608f82629710?w=400&auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  <span className="absolute bottom-3 left-3 bg-[#000]/80 px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold uppercase tracking-widest border border-white/5">🍗 Crispy Crisp</span>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="h-32 rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative group">
                  <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  <span className="absolute bottom-3 left-3 bg-[#000]/80 px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold uppercase tracking-widest border border-white/5">🍔 Burger</span>
                </div>
                <div className="h-44 rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative group">
                  <img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  <span className="absolute bottom-3 left-3 bg-[#000]/80 px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold uppercase tracking-widest border border-white/5">🥤 Milkshake</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>


      {/* 5. FULL DIGITAL MENU SECTION */}
      <section id="menu" className="py-20 bg-[#070709] border-t border-gray-900 scroll-mt-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Dynamic Category Filter Slider */}
          <ScrollReveal className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs text-[#ffd700] uppercase font-mono tracking-widest block mb-2">🍽️ Gourmet Digital Menu</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Saifoodlover Digital Board</h2>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#f57c00] to-transparent w-40 mx-auto mt-3" />
            <p className="text-xs text-gray-400 mt-3 font-serif">
              Click filter buttons to surf by culinary category. You can also lookup custom items using the search tool immediately below.
            </p>
          </ScrollReveal>

          {/* Search bar & statistics bar */}
          <div className="max-w-md mx-auto mb-10 relative">
            <div className="relative">
              <input
                id="search-input-catalog"
                type="text"
                placeholder="🔍 Search pizzas, burger wraps, mojitos, lollipops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111115] border border-gray-800 focus:border-[#f57c00] text-sm text-white px-5 py-3 rounded-2xl pl-11 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
              {searchQuery && (
                <button 
                  id="reset-search-btn"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-3.5 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Categories Horizontal sliding carousel */}
          <div className="flex overflow-x-auto gap-3 pb-6 mb-10 no-scrollbar select-none text-xs leading-normal font-bold">
            {/* Added All Item category option */}
            <button
              id="category-tab-all"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className={`px-5 py-3.5 rounded-xl border flex items-center gap-2 flex-shrink-0 transition-all ${
                selectedCategory === "all" && !searchQuery
                  ? "bg-[#f57c00] border-[#f57c00] text-white font-extrabold shadow shadow-[#f57c00]/30"
                  : "bg-[#111115] border-gray-850 text-gray-400 hover:text-white"
              }`}
            >
              <Utensils className="w-5 h-5" />
              <span>All Dishes Catalog</span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery("");
                }}
                className={`px-5 py-3.5 rounded-xl border flex items-center gap-2.5 flex-shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id && !searchQuery
                    ? "bg-[#f57c00] border-[#f57c00] text-white font-extrabold shadow shadow-[#f57c00]/30"
                    : "bg-[#111115] border-gray-850 text-gray-400 hover:text-white"
                }`}
              >
                {getCategoryIconComponent(cat.icon)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Result items category descriptive title */}
          <div className="mb-8 border-b border-gray-850 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white capitalize flex items-center gap-2">
                <span>
                  {searchQuery 
                    ? `Results for "${searchQuery}"` 
                    : selectedCategory === "all" 
                      ? "Complete Restaurant Catalog" 
                      : CATEGORIES.find(c => c.id === selectedCategory)?.name || "Full Menu"
                  }
                </span>

                <span className="text-[10px] bg-white/5 border border-white/5 font-mono px-2 py-0.5 rounded text-gray-400 font-bold">
                  {menuItems.filter(item => {
                    const matchesSearch = searchQuery 
                      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
                      : true;
                    const matchesCategory = selectedCategory !== "all" 
                      ? item.category === selectedCategory 
                      : true;
                    return matchesSearch && matchesCategory;
                  }).length} Options Available
                </span>
              </h3>
              
              {!searchQuery && selectedCategory !== "all" && (
                <p className="text-xs text-gray-500 mt-1">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.description}
                </p>
              )}
            </div>

            {/* Hint indicator */}
            <span className="text-[11px] text-[#ffd700] hover:underline cursor-pointer flex items-center gap-1 font-sans font-bold" onClick={handleGeneralWhatsAppChat}>
              📞 Ask for custom chef prep orders
            </span>
          </div>

          {/* Grid display cards */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter(item => {
                const matchesSearch = searchQuery 
                  ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
                  : true;
                const matchesCategory = selectedCategory !== "all" 
                  ? item.category === selectedCategory 
                  : true;
                return matchesSearch && matchesCategory;
              })
              .map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#111115] border border-gray-850 p-5 rounded-2xl flex gap-4 hover:border-[#f57c00]/30 transition-all duration-200 relative group"
                >
                  {/* Photo mini preview */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0 relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    {item.popular && (
                      <span className="absolute top-1 left-1 bg-[#ffd700] text-black text-[7px] font-black px-1 rounded uppercase">Hit</span>
                    )}
                  </div>

                  {/* Attributes details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-[#ffd700] transition-colors truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-[#ffd700] flex-shrink-0">
                          {item.variants ? `₹${item.variants[0].price}+` : `₹${item.price}`}
                        </span>
                      </div>
                      
                      {item.subCategory && (
                        <span className="text-[9px] text-[#f57c00] font-bold block uppercase tracking-wider mt-0.5">{item.subCategory}</span>
                      )}

                      <p className="text-xs text-gray-400 mt-1 leading-normal font-serif line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-850 mt-3 pt-2">
                      <span className="text-[10px] text-gray-500 font-mono">
                        {item.variants ? "Regular & Large Available" : "Standard Single Size"}
                      </span>

                      <button
                        id={`menu-item-order-${item.id}`}
                        onClick={() => setCustomizerItem(item)}
                        className="px-3 py-1 bg-gradient-to-r from-gray-950 to-[#111115] hover:from-[#f57c00] hover:to-orange-500 border border-gray-750 hover:border-[#f57c00] text-[#ffd700] hover:text-white font-bold text-[10px] rounded hover:shadow transition-all uppercase tracking-wider"
                      >
                        + Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Empty search fallback */}
          {menuItems.filter(item => {
            const matchesSearch = searchQuery 
              ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.description?.toLowerCase().includes(searchQuery.toLowerCase())
              : true;
            const matchesCategory = selectedCategory !== "all" 
              ? item.category === selectedCategory 
              : true;
            return matchesSearch && matchesCategory;
          }).length === 0 && (
            <div className="py-20 text-center max-w-sm mx-auto text-gray-550 border border-dashed border-gray-905 rounded-2xl">
              <Utensils className="w-10 h-10 text-gray-700 mx-auto mb-2 animate-bounce" />
              <h4 className="text-sm font-bold text-white uppercase">Dishes Not Located</h4>
              <p className="text-xs text-gray-400 mt-2 font-serif px-4">
                We couldn&apos;t find any items matching your exact words. Make sure spelling is correct or reach we directly.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* 6. COMBO OFFERS SECTION */}
      <section id="combos" className="py-20 bg-[#0a0a0c] border-t border-gray-900 scroll-mt-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title Header banner */}
          <ScrollReveal className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs text-[#f57c00] uppercase font-mono tracking-widest block mb-2">🎁 Special Meal Bundles</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Saifoodlover Combo Feasts</h2>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent w-44 mx-auto mt-3" />
            <p className="text-xs text-gray-400 mt-3 font-serif">
              Save big on our gourmet combination hampers. Handpicked by chef Saifoodlover with slashed discount pricing.
            </p>
          </ScrollReveal>

          {/* Combos Grid layout */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {combos.map((combo) => (
              <div 
                key={combo.id}
                className="bg-[#111115] border border-[#ffd700]/15 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-[#ffd700]/30 transition-all duration-300 relative shadow-xl"
              >
                {/* Photo cover */}
                <div className="w-full md:w-44 h-44 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0 relative">
                  <img 
                    src={combo.imageUrl} 
                    alt={combo.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  {/* Saving banner math */}
                  <span className="absolute top-3 left-3 bg-[#f57c00] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    Save ₹{combo.originalPrice - combo.price}!
                  </span>
                </div>

                {/* Details attributes block */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-white tracking-wide">{combo.name}</h4>
                    <p className="text-xs text-gray-400 font-serif leading-relaxed line-clamp-2">{combo.description}</p>
                    
                    {/* Item elements badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {combo.items.map((elm, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/5 text-[9px] px-2 py-0.5 rounded text-gray-300 font-serif lowercase italic">
                          🌱 {elm}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-850 pt-4 mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#ffd700]">₹{combo.price}</span>
                      <span className="text-xs line-through text-gray-500">₹{combo.originalPrice}</span>
                    </div>

                    <button
                      id={`combo-checkout-${combo.id}`}
                      onClick={() => {
                        // Map the ComboOffer to a MenuItem object
                        const comboMenuItem: MenuItem = {
                          id: combo.id,
                          name: combo.name,
                          category: "combos",
                          subCategory: "Combo Feast",
                          price: combo.price,
                          description: `${combo.description} (${combo.items.join(" + ")})`,
                          imageUrl: combo.imageUrl,
                          popular: true
                        };
                        setCustomizerItem(comboMenuItem);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#ffd700] to-orange-400 hover:brightness-110 active:scale-95 text-[#000] font-black uppercase text-[10px] rounded-lg tracking-wider transition-all"
                    >
                      🚀 Grab Combo
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 7. GALLERY SECTION */}
      <ScrollReveal>
        <GallerySection galleryItems={INITIAL_GALLERY} />
      </ScrollReveal>

      {/* 8. REVIEW SECTION */}
      <ScrollReveal>
        <ReviewSection reviews={reviews} setReviews={setReviews} />
      </ScrollReveal>

      {/* 9. CONTACT SECTION WITH WORKING INQUIRY DATABASE */}
      <ScrollReveal>
        <ContactSection onInquirySubmit={handleAddInquiry} />
      </ScrollReveal>

      {/* 10. PREMIUM BOTTOM FOOTER SECTION */}
      <footer className="bg-[#040405] text-gray-400 text-xs font-serif leading-relaxed border-t border-[#ffd700]/10 select-none pb-8">
        
        {/* Main top columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1 Brand pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#f57c00]/10 rounded border border-[#f57c00]/30 text-[#f57c00]">
                <Pizza className="w-5 h-5 text-[#f57c00]" />
              </div>
              <span className="text-md font-sans font-black text-white tracking-widest uppercase">Saifoodlover</span>
            </div>
            <p className="max-w-xs">
              Luxury aesthetics meet local street-friendly values. Saifoodlover Cafe serves mouthwatering stone-baked cheesy pizzas, crispy wings, wraps, and milkshakes prepared with ultimate hygienic care.
            </p>
            <p className="text-[#ffd700] text-[11px] font-sans font-bold">Good Food • Good Mood • Great Times</p>
          </div>

          {/* Col 2 Quick food indexes */}
          <div className="space-y-4 font-sans">
            <h4 className="text-xs uppercase tracking-widest text-[#ffd705] font-extrabold">Cafe Hot Categories</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <a href="#menu" onClick={() => setSelectedCategory("pizzas")} className="hover:text-white transition-colors">🔥 Non-Veg Pizza</a>
              <a href="#menu" onClick={() => setSelectedCategory("burgers")} className="hover:text-white transition-colors">🍔 Burgers</a>
              <a href="#menu" onClick={() => setSelectedCategory("wraps")} className="hover:text-white transition-colors">🌯 Tortilla Wraps</a>
              <a href="#menu" onClick={() => setSelectedCategory("fried-chicken")} className="hover:text-white transition-colors">🍗 KFC-Style Chicken</a>
              <a href="#menu" onClick={() => setSelectedCategory("mojitos")} className="hover:text-white transition-colors">🍹 Sparkling Mojito</a>
              <a href="#menu" onClick={() => setSelectedCategory("milkshakes")} className="hover:text-white transition-colors">🥤 Luxury Shakes</a>
            </div>
          </div>

          {/* Col 3 Business times */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#ffd705] font-bold font-sans">Trading Hours</h4>
            <ul className="space-y-2">
              <li>Open Daily: <span className="text-white">11:00 AM – 11:00 PM</span></li>
              <li>Free Home Delivery Area: <span className="text-[#f57c00]">Within 5 KMS</span></li>
              <li>WhatsApp ordering active till <span className="text-white">10:45 PM</span></li>
              <li>Hygienic standard certified cooks.</li>
            </ul>
          </div>

          {/* Col 4 Newsletter concept */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#ffd705] font-bold font-sans">Social Connections</h4>
            <p>
              Connect with us for weekly coupons, tandoori double-cheese pizza discounts, and free mocktail offers.
            </p>
            <div className="flex gap-3 text-white">
              <a href="#" className="p-2.5 bg-[#111115] hover:bg-[#f57c00] rounded-xl border border-gray-800 hover:border-[#f57c00] transition-colors">
                <Icons.Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-[#111115] hover:bg-[#f57c00] rounded-xl border border-gray-800 hover:border-[#f57c00] transition-colors">
                <Icons.Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-[#111115] hover:bg-[#f57c00] rounded-xl border border-gray-800 hover:border-[#f57c00] transition-colors">
                <Icons.Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-900 text-center text-[11px] text-gray-500 font-sans flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Saifoodlover Cafe. All rights reserved. Created in Premium Luxury Slate style.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#contact" className="hover:underline">Terms of Service</a>
            <span className="text-gray-700">|</span>
            <span className="text-green-500 font-bold">● Active Order Server 5.0</span>
          </div>
        </div>
      </footer>

      {/* 11. CART OVER DRAWER MODAL SHEET */}
      <CartModal
        item={null} // Cart list scenario
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* 12. SINGLE ITEM DYNAMIC QUANTITY CUSTOMIZER */}
      {customizerItem && (
        <CartModal
          item={customizerItem} // Single customizer scenario
          cart={cart}
          setCart={setCart}
          isOpen={customizerItem !== null}
          onClose={() => setCustomizerItem(null)}
        />
      )}

      {/* 13. CAFE ADMINISTRATIVE PANEL (DASHBOARD) */}
      {isAdminOpen && (
        <AdminPanel
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          combos={combos}
          setCombos={setCombos}
          inquiries={inquiries}
          setInquiries={setInquiries}
          reviews={reviews}
          setReviews={setReviews}
          categories={CATEGORIES}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}
