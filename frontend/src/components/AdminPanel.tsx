import React, { useState } from "react";
import { MenuItem, ComboOffer, CustomerInquiry, CustomerReview, MenuItemVariant } from "../types";
import { 
  PlusCircle, Edit2, Trash2, Check, X, ShieldAlert,
  Inbox, ListOrdered, Sparkles, Star, TrendingUp, DollarSign,
  Plus, Layers, Coffee, FileSpreadsheet, Eye, ClipboardList
} from "lucide-react";

interface AdminPanelProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  combos: ComboOffer[];
  setCombos: React.Dispatch<React.SetStateAction<ComboOffer[]>>;
  inquiries: CustomerInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<CustomerInquiry[]>>;
  reviews: CustomerReview[];
  setReviews: React.Dispatch<React.SetStateAction<CustomerReview[]>>;
  categories: { id: string; name: string }[];
  onClose: () => void;
}

export default function AdminPanel({
  menuItems,
  setMenuItems,
  combos,
  setCombos,
  inquiries,
  setInquiries,
  reviews,
  setReviews,
  categories,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"stats" | "menu" | "combos" | "inquiries" | "reviews">("stats");

  // Authentication gate for safety
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" || password === "saifood") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect pin. Tip: Use 'saifood' or 'admin123' to access.");
    }
  };

  // State for menu item form
  const [isEditingItem, setIsEditingItem] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState<{
    name: string;
    category: string;
    subCategory: string;
    price: number;
    description: string;
    imageUrl: string;
    popular: boolean;
    hasVariants: boolean;
    variants: MenuItemVariant[];
  }>({
    name: "",
    category: "pizzas",
    subCategory: "",
    price: 100,
    description: "",
    imageUrl: "",
    popular: false,
    hasVariants: false,
    variants: [
      { name: "Regular", price: 100 },
      { name: "Large", price: 160 }
    ]
  });

  // State for Combo form
  const [isEditingCombo, setIsEditingCombo] = useState<boolean>(false);
  const [editingComboId, setEditingComboId] = useState<string | null>(null);
  const [comboForm, setComboForm] = useState<{
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    items: string[];
    imageUrl: string;
  }>({
    name: "",
    description: "",
    price: 200,
    originalPrice: 250,
    items: [""],
    imageUrl: ""
  });

  // Menu action handlers
  const handleAddNewItemClick = () => {
    setEditingItemId(null);
    setItemForm({
      name: "",
      category: "pizzas",
      subCategory: "",
      price: 100,
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
      popular: false,
      hasVariants: false,
      variants: [
        { name: "Regular", price: 100 },
        { name: "Large", price: 180 }
      ]
    });
    setIsEditingItem(true);
  };

  const handleEditItemClick = (item: MenuItem) => {
    setEditingItemId(item.id);
    setItemForm({
      name: item.name,
      category: item.category,
      subCategory: item.subCategory || "",
      price: item.price,
      description: item.description || "",
      imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
      popular: !!item.popular,
      hasVariants: !!item.variants && item.variants.length > 0,
      variants: item.variants || [
        { name: "Regular", price: item.price },
        { name: "Large", price: Math.round(item.price * 1.5) }
      ]
    });
    setIsEditingItem(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name.trim()) return;

    const savedItem: MenuItem = {
      id: editingItemId || `item_${Date.now()}`,
      name: itemForm.name,
      category: itemForm.category,
      subCategory: itemForm.subCategory || undefined,
      price: itemForm.hasVariants ? itemForm.variants[0].price : Number(itemForm.price),
      variants: itemForm.hasVariants ? itemForm.variants : undefined,
      description: itemForm.description,
      imageUrl: itemForm.imageUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
      popular: itemForm.popular
    };

    if (editingItemId) {
      setMenuItems(prev => prev.map(item => item.id === editingItemId ? savedItem : item));
    } else {
      setMenuItems(prev => [savedItem, ...prev]);
    }
    setIsEditingItem(false);
    setEditingItemId(null);
  };

  // Combo action handlers
  const handleAddNewComboClick = () => {
    setEditingComboId(null);
    setComboForm({
      name: "",
      description: "",
      price: 250,
      originalPrice: 300,
      items: ["", ""],
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
    });
    setIsEditingCombo(true);
  };

  const handleEditComboClick = (combo: ComboOffer) => {
    setEditingComboId(combo.id);
    setComboForm({
      name: combo.name,
      description: combo.description,
      price: combo.price,
      originalPrice: combo.originalPrice,
      items: combo.items.length > 0 ? combo.items : ["", ""],
      imageUrl: combo.imageUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
    });
    setIsEditingCombo(true);
  };

  const handleDeleteCombo = (id: string) => {
    if (confirm("Are you sure you want to delete this combo offer?")) {
      setCombos(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSaveCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comboForm.name.trim()) return;

    const savedCombo: ComboOffer = {
      id: editingComboId || `combo_${Date.now()}`,
      name: comboForm.name,
      description: comboForm.description,
      price: Number(comboForm.price),
      originalPrice: Number(comboForm.originalPrice),
      items: comboForm.items.filter(i => i.trim() !== ""),
      imageUrl: comboForm.imageUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
    };

    if (editingComboId) {
      setCombos(prev => prev.map(c => c.id === editingComboId ? savedCombo : c));
    } else {
      setCombos(prev => [savedCombo, ...prev]);
    }
    setIsEditingCombo(false);
    setEditingComboId(null);
  };

  // Inquiry handlers
  const handleMarkInquiryRead = (id: string) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: "read" } : inq));
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm("Delete this inquiry?")) {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    }
  };

  // Review handlers
  const handleDeleteReview = (id: string) => {
    if (confirm("Remove this review from the public wall?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  // Safe statistics counting
  const totalItems = menuItems.length;
  const activeOffers = combos.length;
  const newInquiries = inquiries.filter(i => i.status === "new").length;
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : "5.0";

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0c]/95 flex items-center justify-center p-4">
        <div className="bg-[#121216] border border-[#f57c00]/30 rounded-xl p-8 max-w-sm w-full text-center shadow-2xl relative">
          <button 
            id="close-admin-auth"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-[#f57c00]/20 to-[#ffd700]/10 rounded-full border border-[#f57c00]/30 text-[#f57c00]">
              <ShieldAlert className="w-10 h-10 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Gateway</h2>
          <p className="text-xs text-gray-400 mb-6">
            Enter the cafe passcode to update items, edit prices, combos, and view dashboard messages.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative text-left">
              <label className="text-xs font-semibold text-[#ffd700] uppercase tracking-wide block mb-1">
                Admin Passkey
              </label>
              <input
                id="admin-passcode-input"
                type="password"
                placeholder="Hint: Use 'saifood'"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError("");
                }}
                className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] text-white px-4 py-2.5 rounded-lg text-sm text-center font-mono outline-none transition-all duration-200"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-medium bg-red-950/40 p-2 rounded border border-red-900/30">
                {authError}
              </p>
            )}

            <button
              id="admin-submit-login"
              type="submit"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#f57c00] to-[#e65100] text-white font-semibold rounded-lg text-sm transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-[#f57c00]/20"
            >
              Verify & Enter
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-800/60">
            <p className="text-[11px] text-gray-500">
              Saifoodlover Cafe Premium Management Hub
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col md:flex-row text-gray-100 overflow-hidden font-sans">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-[#111115] border-b md:border-b-0 md:border-r border-[#ffd700]/10 flex flex-col shrink-0">
        <div className="p-5 border-b border-[#ffd700]/10 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f57c00] to-[#ffb74d] tracking-wider leading-none">
              SAIFOODLOVER
            </h1>
            <p className="text-[11px] text-[#ffd700]/80 font-mono tracking-widest mt-0.5">ADMIN PANEL</p>
          </div>
          <button 
            id="close-admin-sidebar"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-all md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <nav className="p-4 space-y-1 text-sm flex-1 overflow-y-auto">
          <button
            id="tab-stats"
            onClick={() => setActiveTab("stats")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTab === "stats" 
                ? "bg-[#f57c00] text-white font-medium" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Performance & Stats
          </button>

          <button
            id="tab-menu"
            onClick={() => setActiveTab("menu")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTab === "menu" 
                ? "bg-[#f57c00] text-white font-medium" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Coffee className="w-4 h-4" />
            Manage Menu ({totalItems})
          </button>

          <button
            id="tab-combos"
            onClick={() => setActiveTab("combos")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTab === "combos" 
                ? "bg-[#f57c00] text-white font-medium" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Combo Offers ({activeOffers})
          </button>

          <button
            id="tab-inquiries"
            onClick={() => setActiveTab("inquiries")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
              activeTab === "inquiries" 
                ? "bg-[#f57c00] text-white font-medium" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>Customer Inquiries</span>
            </div>
            {newInquiries > 0 && (
              <span className="bg-[#ffd700] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                {newInquiries}
              </span>
            )}
          </button>

          <button
            id="tab-reviews"
            onClick={() => setActiveTab("reviews")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTab === "reviews" 
                ? "bg-[#f57c00] text-white font-medium" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Star className="w-4 h-4" />
            Reviews Wall ({reviews.length})
          </button>
        </nav>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-[#ffd700]/10">
          <button
            id="admin-logout"
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg border border-red-900/30 transition-all"
          >
            Exit Workspace
          </button>
          <button
            id="admin-close-to-user"
            onClick={onClose}
            className="w-full text-center text-[11px] text-gray-500 hover:text-gray-300 transition-all mt-3 block"
          >
            Back to Public View
          </button>
        </div>
      </aside>

      {/* Main workspace container */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0c] p-6 md:p-8">
        
        {/* TOP STATUS BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              {activeTab === "stats" && "Business Summary"}
              {activeTab === "menu" && "Menu Catalog"}
              {activeTab === "combos" && "Specials & Combos"}
              {activeTab === "inquiries" && "Customer Inbox"}
              {activeTab === "reviews" && "Review Moderation"}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {activeTab === "stats" && "Realtime statistics and sales health overview."}
              {activeTab === "menu" && "Add new kitchen items, alter prices, and define size variants."}
              {activeTab === "combos" && "Publish premium multi-item discounted meal bundles."}
              {activeTab === "inquiries" && "Direct contact form inquiries submitted by patrons."}
              {activeTab === "reviews" && "Moderate rating testimonials published on the landing wall."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="admin-primary-action-close"
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-gray-200 hover:text-white rounded-lg text-xs font-semibold transition-all shadow-md active:scale-95"
            >
              Public Menu View
            </button>
          </div>
        </div>

        {/* TAB WORKSPACES */}

        {/* 1. STATS TAB */}
        {activeTab === "stats" && (
          <div className="space-y-8">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#121216] border border-[#ffd700]/10 p-5 rounded-xl hover:border-[#f57c00]/30 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Dishes</span>
                  <Coffee className="w-5 h-5 text-[#f57c00]" />
                </div>
                <div className="text-3xl font-extrabold text-white">{totalItems}</div>
                <div className="text-[10px] text-gray-500 mt-1">Across {categories.length} categories</div>
              </div>

              <div className="bg-[#121216] border border-[#ffd700]/10 p-5 rounded-xl hover:border-[#f57c00]/30 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Active Combos</span>
                  <Sparkles className="w-5 h-5 text-[#ffd700]" />
                </div>
                <div className="text-3xl font-extrabold text-[#ffd700]">{activeOffers}</div>
                <div className="text-[10px] text-gray-500 mt-1">Discounts pre-configured</div>
              </div>

              <div className="bg-[#121216] border border-[#ffd700]/10 p-5 rounded-xl hover:border-[#f57c00]/30 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">New Messages</span>
                  <Inbox className="w-5 h-5 text-[#f57c00]" />
                </div>
                <div className="text-3xl font-extrabold text-white flex items-center gap-2">
                  <span>{newInquiries}</span>
                  {newInquiries > 0 && <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />}
                </div>
                <div className="text-[10px] text-gray-500 mt-1">Check Inquiries tab</div>
              </div>

              <div className="bg-[#121216] border border-[#ffd700]/10 p-5 rounded-xl hover:border-[#f57c00]/30 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Average Rating</span>
                  <Star className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" />
                </div>
                <div className="text-3xl font-extrabold text-white">{avgRating}</div>
                <div className="text-[10px] text-gray-500 mt-1">From {reviews.length} total reviews</div>
              </div>
            </div>

            {/* Quick Actions & Simulated Sales Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Box 1: Quick Add Shortcuts */}
              <div className="bg-[#121216] border border-[#ffd700]/10 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 border-b border-gray-800 pb-2">
                  Quick Administration Actions
                </h3>
                <div className="space-y-3">
                  <button
                    id="admin-btn-quick-add-item"
                    onClick={() => {
                      setActiveTab("menu");
                      handleAddNewItemClick();
                    }}
                    className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-[#f57c00]/10 rounded-lg group text-xs text-left transition-all border border-transparent hover:border-[#f57c00]/20"
                  >
                    <div className="flex items-center gap-3">
                      <PlusCircle className="w-4 h-4 text-[#f57c00]" />
                      <span className="font-semibold text-gray-200">Insert New Food Item</span>
                    </div>
                    <span className="text-[10px] text-gray-500 group-hover:text-white">Form &rsaquo;</span>
                  </button>

                  <button
                    id="admin-btn-quick-add-combo"
                    onClick={() => {
                      setActiveTab("combos");
                      handleAddNewComboClick();
                    }}
                    className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-[#ffd700]/10 rounded-lg group text-xs text-left transition-all border border-transparent hover:border-[#ffd700]/20"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#ffd700]" />
                      <span className="font-semibold text-gray-200">Create Combo Bundle</span>
                    </div>
                    <span className="text-[10px] text-gray-500 group-hover:text-white">Add &rsaquo;</span>
                  </button>

                  <button
                    id="admin-btn-view-messages"
                    onClick={() => setActiveTab("inquiries")}
                    className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-gray-800 rounded-lg group text-xs text-left transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Inbox className="w-4 h-4 text-orange-400" />
                      <span className="font-semibold text-gray-200">Open Customer Inbox</span>
                    </div>
                    <span className="bg-[#f57c00]/20 text-[#f57c00] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {newInquiries} new
                    </span>
                  </button>
                </div>
              </div>

              {/* Box 2: Cafe Performance Trends */}
              <div className="bg-[#121216] border border-[#ffd700]/10 rounded-xl p-6 lg:col-span-2">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 border-b border-gray-800 pb-2 flex items-center justify-between">
                  <span>Simulated Delivery Orders Health</span>
                  <span className="text-[10px] text-[#ffd700] border border-[#ffd700]/30 px-1.5 py-0.2 rounded font-mono">LIVE TRACKING</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category Breakdown */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">Menu Category Stats</h4>
                    <div className="space-y-2">
                      {["Pizzas", "Wraps", "Burgers", "Fried Chicken", "Mojitos", "Milkshakes"].map((cat, idx) => {
                        const count = menuItems.filter(i => i.category === cat.toLowerCase().replace(" ", "-")).length;
                        return (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300">{cat}</span>
                            <div className="flex items-center gap-2 flex-1 mx-3">
                              <div className="h-1 bg-gray-800 rounded-full w-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#f57c00] to-[#ffd700]" 
                                  style={{ width: `${Math.min(100, (count / 12) * 100)}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-gray-400 font-bold">{count} items</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operational Health tips */}
                  <div className="bg-white/5 rounded-lg p-4 flex flex-col justify-between text-xs border border-white/5">
                    <div>
                      <p className="font-bold text-[#ffd700] mb-1">💡 Pro tip for Saifoodlover Admins:</p>
                      <p className="text-gray-400 leading-relaxed text-[11px]">
                        Any additions, price modifications, or combo offers configured on this dashboard are fully stored inside your browser's persistent cache. These changes are immediate and fully active on the main restaurant homepage below. You can try adding a new pizza to test!
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                      <span>Database Engine:</span>
                      <span className="text-green-400 font-mono font-bold">Active LocalStorage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MENU TAB (Add / Edit / Delete Dishes) */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            {!isEditingItem ? (
              <>
                <div className="flex justify-between items-center bg-[#121216] border border-[#ffd700]/10 p-4 rounded-xl">
                  <div className="text-xs text-gray-400 font-mono uppercase">
                    Managing {totalItems} items total
                  </div>
                  <button
                    id="admin-btn-add-item"
                    onClick={handleAddNewItemClick}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#f57c00] hover:bg-orange-600 text-white font-semibold rounded-lg text-xs tracking-wide transition-all shadow shadow-[#f57c00]/30"
                  >
                    <Plus className="w-4 h-4" /> Add New Item
                  </button>
                </div>

                {/* Items Grid List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-[#121216] border border-[#ffd700]/10 p-4 rounded-xl flex gap-3 relative hover:border-[#f57c00]/30 transition-all opacity-100"
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-lg object-cover bg-gray-800 flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                            {item.popular && (
                              <span className="bg-[#ffd700]/15 text-[#ffd700] text-[8px] font-bold px-1 rounded uppercase tracking-wider">POPULAR</span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#f57c00] font-semibold uppercase mt-0.5 tracking-wider">{item.category}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-1">{item.description || "Fresh chef gourmet recipe."}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-800/60 mt-2 pt-2">
                          <div>
                            {item.variants ? (
                              <span className="text-xs font-bold text-[#ffd700]">
                                ₹{item.variants[0].price} - ₹{item.variants[item.variants.length-1].price}
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-[#ffd700]">₹{item.price}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              id={`admin-edit-${item.id}`}
                              onClick={() => handleEditItemClick(item)}
                              className="p-1 px-1.5 hover:bg-gray-800 text-gray-400 hover:text-[#ffd700] rounded transition-all text-[11px] font-bold flex items-center gap-1"
                              title="Edit item features"
                            >
                              <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button
                              id={`admin-delete-${item.id}`}
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1 px-1.5 hover:bg-red-950/40 text-gray-400 hover:text-red-400 rounded transition-all text-[11px] font-bold flex items-center gap-1"
                              title="Delete item"
                            >
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* ITEM FORM */
              <div className="bg-[#121216] border border-[#f57c00]/30 rounded-xl p-6 max-w-2xl mx-auto shadow-2xl">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
                  <h3 className="text-md font-bold text-[#ffd700]">
                    {editingItemId ? `✏️ Edit Item: ${itemForm.name}` : "🍽️ Add New Menu Item"}
                  </h3>
                  <button
                    id="admin-form-close"
                    onClick={() => setIsEditingItem(false)}
                    className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">Item Title / Name*</label>
                      <input
                        id="item-form-name"
                        type="text"
                        required
                        value={itemForm.name}
                        onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2 text-white outline-none"
                        placeholder="e.g. Dynamite Chilly Pizza"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">Category Group*</label>
                      <select
                        id="item-form-category"
                        value={itemForm.category}
                        onChange={(e) => setItemForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2 text-white outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">Subcategory Heading (Optional)</label>
                      <input
                        id="item-form-[subcategory]"
                        type="text"
                        value={itemForm.subCategory}
                        onChange={(e) => setItemForm(prev => ({ ...prev, subCategory: e.target.value }))}
                        className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2 text-white outline-none"
                        placeholder="e.g. Non-Veg Pizzas, Veg Pizzas, Spicy specials"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">Custom Photo URL</label>
                      <input
                        id="item-form-img"
                        type="text"
                        value={itemForm.imageUrl}
                        onChange={(e) => setItemForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2 text-white outline-none"
                        placeholder="e.g. https://images.unsplash.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Short Tasty Description</label>
                    <textarea
                      id="item-form-description"
                      value={itemForm.description}
                      onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2 text-white outline-none resize-none"
                      placeholder="List key ingredients, mouthwatering adjectives or size details..."
                    />
                  </div>

                  {/* Pricing and Variants Section */}
                  <div className="bg-[#1a1a20] border border-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-bold text-[#ffd700] text-xs">Pricing & Sizing Setup</span>
                        <p className="text-[10px] text-gray-400">Pizzas usually have Regular & Large pricing variants.</p>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer font-bold select-none">
                        <input
                          id="item-form-hasvariants"
                          type="checkbox"
                          checked={itemForm.hasVariants}
                          onChange={(e) => setItemForm(prev => ({ ...prev, hasVariants: e.target.checked }))}
                          className="accent-[#f57c00]"
                        />
                        <span>Has Multiple Sizes?</span>
                      </label>
                    </div>

                    {!itemForm.hasVariants ? (
                      <div>
                        <label className="block text-gray-400 font-semibold mb-1">Standard Item Price (₹)*</label>
                        <input
                          id="item-form-price"
                          type="number"
                          value={itemForm.price}
                          min={1}
                          onChange={(e) => setItemForm(prev => ({ ...prev, price: Math.max(0, Number(e.target.value)) }))}
                          className="w-32 bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2 text-white text-sm outline-none"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="block text-gray-400 font-semibold">Custom Size Variants</label>
                        {itemForm.variants.map((v, idx) => (
                          <div key={idx} className="flex gap-4 items-center">
                            <span className="font-mono text-gray-400 w-12">Size #{idx + 1}:</span>
                            <input
                              id={`variant-name-${idx}`}
                              type="text"
                              value={v.name}
                              required
                              onChange={(e) => {
                                const newVariants = [...itemForm.variants];
                                newVariants[idx].name = e.target.value;
                                setItemForm(prev => ({ ...prev, variants: newVariants }));
                              }}
                              className="bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded p-1.5 text-white w-32"
                              placeholder="e.g. Regular, Large"
                            />
                            <span className="text-gray-400">Price (₹):</span>
                            <input
                              id={`variant-price-${idx}`}
                              type="number"
                              value={v.price}
                              min={1}
                              required
                              onChange={(e) => {
                                const newVariants = [...itemForm.variants];
                                newVariants[idx].price = Number(e.target.value);
                                setItemForm(prev => ({ ...prev, variants: newVariants }));
                              }}
                              className="bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded p-1.5 text-white w-24"
                              placeholder="120"
                            />
                            <button
                              id={`remove-variant-${idx}`}
                              type="button"
                              onClick={() => {
                                if (itemForm.variants.length <= 1) return;
                                setItemForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== idx) }));
                              }}
                              className="text-red-400 hover:text-red-300 font-bold"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          id="add-custom-size-variant"
                          type="button"
                          onClick={() => {
                            setItemForm(prev => ({
                              ...prev,
                              variants: [...prev.variants, { name: "Extra Large", price: 290 }]
                            }));
                          }}
                          className="text-[11px] text-[#ffd700] hover:underline font-bold mt-1 block"
                        >
                          + Add Size Variant (e.g. Medium)
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        id="item-form-popular"
                        type="checkbox"
                        checked={itemForm.popular}
                        onChange={(e) => setItemForm(prev => ({ ...prev, popular: e.target.checked }))}
                        className="accent-[#f57c00]"
                      />
                      <span className="font-bold text-gray-300">Feature on &quot;Popular Items&quot; lists</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                    <button
                      id="item-form-cancel"
                      type="button"
                      onClick={() => setIsEditingItem(false)}
                      className="px-4 py-2 bg-gray-800 text-gray-300 hover:text-white rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      id="item-form-save"
                      type="submit"
                      className="px-4 py-2 bg-[#f57c00] hover:bg-orange-600 text-white font-semibold rounded-lg transition-all"
                    >
                      Save Item Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 3. COMBOS TAB (Setup & Delete discount Bundles) */}
        {activeTab === "combos" && (
          <div className="space-y-6">
            {!isEditingCombo ? (
              <>
                <div className="flex justify-between items-center bg-[#121216] border border-[#ffd700]/10 p-4 rounded-xl">
                  <div className="text-xs text-gray-400 font-mono uppercase">
                    Configured {activeOffers} combo specials
                  </div>
                  <button
                    id="admin-btn-add-combo"
                    onClick={handleAddNewComboClick}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#ffd700] text-black hover:bg-[#ffe066] font-extrabold rounded-lg text-xs tracking-wide transition-all"
                  >
                    <Plus className="w-4 h-4 text-black" /> Create Combo Offer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {combos.map((combo) => (
                    <div 
                      key={combo.id}
                      className="bg-[#121216] border border-[#ffd700]/15 rounded-xl overflow-hidden p-5 flex flex-col justify-between hover:border-[#ffd700]/40 transition-all shadow-lg"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-md font-bold text-white">{combo.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{combo.description}</p>
                          </div>
                          {combo.imageUrl && (
                            <img src={combo.imageUrl} className="w-14 h-14 rounded-md object-cover bg-gray-800" alt="" />
                          )}
                        </div>

                        <div className="mt-4">
                          <span className="text-[10px] uppercase font-bold text-[#ffd700] tracking-wider block">Combo Package Dishes:</span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {combo.items.map((it, idx) => (
                              <span key={idx} className="bg-white/5 border border-white/5 text-[10px] px-2 py-0.5 rounded text-gray-300 font-serif">
                                🍳 {it}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-[#ffd700]">₹{combo.price}</span>
                          <span className="text-xs line-through text-gray-500">₹{combo.originalPrice}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            id={`combo-edit-${combo.id}`}
                            onClick={() => handleEditComboClick(combo)}
                            className="p-1 px-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold flex items-center gap-1 transition-all"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            id={`combo-delete-${combo.id}`}
                            onClick={() => handleDeleteCombo(combo.id)}
                            className="p-1 px-2 bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded text-xs font-semibold flex items-center gap-1 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* COMBO FORM */
              <div className="bg-[#121216] border border-[#ffd700]/30 rounded-xl p-6 max-w-xl mx-auto">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
                  <h3 className="text-md font-bold text-[#ffd700]">
                    {editingComboId ? `✏️ Alter Combo Offer: ${comboForm.name}` : "✨ Publish New Combo Offer"}
                  </h3>
                  <button
                    id="combo-form-close"
                    onClick={() => setIsEditingCombo(false)}
                    className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCombo} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Combo Offer Banner Title*</label>
                    <input
                      id="combo-form-name"
                      type="text"
                      required
                      value={comboForm.name}
                      onChange={(e) => setComboForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#ffd700] rounded-lg p-2 text-white outline-none text-xs"
                      placeholder="e.g. Non-veg Weekend Feast"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Marketing Description / Catchphrase*</label>
                    <textarea
                      id="combo-form-description"
                      required
                      value={comboForm.description}
                      onChange={(e) => setComboForm(p => ({ ...p, description: e.target.value }))}
                      rows={2}
                      className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#ffd700] rounded-lg p-2 text-white outline-none resize-none"
                      placeholder="e.g. Save ₹50 on this combination of burgers, wings and shakes!"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">Combo Discount Price (₹)*</label>
                      <input
                        id="combo-form-price"
                        type="number"
                        required
                        value={comboForm.price}
                        onChange={(e) => setComboForm(p => ({ ...p, price: Number(e.target.value) }))}
                        className="w-full bg-[#1e1e24] border border-[#f57c00]/40 rounded-lg p-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">Original sum value of elements (₹)*</label>
                      <input
                        id="combo-form-orig-price"
                        type="number"
                        required
                        value={comboForm.originalPrice}
                        onChange={(e) => setComboForm(p => ({ ...p, originalPrice: Number(e.target.value) }))}
                        className="w-full bg-[#1e1e24] border border-gray-700 rounded-lg p-2 text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* List of elements in combo */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-gray-400 font-semibold">Included Items Names*</label>
                      <button
                        id="add-combo-element-slot"
                        type="button"
                        onClick={() => setComboForm(prev => ({ ...prev, items: [...prev.items, ""] }))}
                        className="text-[#ffd700] hover:underline font-bold"
                      >
                        + Add item row
                      </button>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {comboForm.items.map((itm, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            id={`combo-item-slot-${idx}`}
                            type="text"
                            required
                            value={itm}
                            onChange={(e) => {
                              const updatedItems = [...comboForm.items];
                              updatedItems[idx] = e.target.value;
                              setComboForm(p => ({ ...p, items: updatedItems }));
                            }}
                            className="bg-[#1e1e24] border border-gray-700 focus:border-[#ffd700] rounded p-1.5 text-white flex-1"
                            placeholder="e.g. Standard Chicken Sandwich"
                          />
                          <button
                            id={`remove-combo-item-slot-${idx}`}
                            type="button"
                            onClick={() => {
                              if (comboForm.items.length <= 1) return;
                              setComboForm(p => ({ ...p, items: p.items.filter((_, i) => i !== idx) }));
                            }}
                            className="text-red-400 hover:text-red-300 px-1 font-bold"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Cover Image Link URL</label>
                    <input
                      id="combo-form-img"
                      type="text"
                      value={comboForm.imageUrl}
                      onChange={(e) => setComboForm(p => ({ ...p, imageUrl: e.target.value }))}
                      className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#ffd700] rounded-lg p-2 text-white outline-none"
                      placeholder="e.g. https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                    <button
                      id="combo-form-cancel"
                      type="button"
                      onClick={() => setIsEditingCombo(false)}
                      className="px-4 py-2 bg-gray-800 text-gray-300 hover:text-white rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      id="combo-form-save"
                      type="submit"
                      className="px-4 py-2 bg-[#ffd700] hover:bg-[#ffe066] text-black font-extrabold rounded-lg"
                    >
                      Save Combo Package
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 4. CUSTOMER INQUIRIES INDOX */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="bg-[#121216] border border-[#ffd700]/10 p-5 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Inbound Messages ({inquiries.length})</span>
                <span className="text-[11px] bg-amber-950/40 text-amber-400 px-2.5 py-1 rounded border border-amber-900/40 font-mono">
                  Inbox Syncing Live
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Whenever guests on the website submit the &quot;Contact Us&quot; message form, their message, phone, and coordinates instantly arrive below to ensure high operational efficiency.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 bg-white/2 bg-[#121216]/50 border border-dashed border-gray-800 rounded-xl">
                <Inbox className="w-10 h-10 mx-auto text-gray-600 mb-2" />
                <p className="text-sm text-gray-500 font-bold">Mailbox is currently empty</p>
                <p className="text-xs text-gray-600 mt-1">Try sending a message from the Contact Form below to see it appear here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id}
                    className={`p-5 rounded-xl border transition-all ${
                      inq.status === "new" 
                        ? "bg-gradient-to-r from-[#ffd700]/5 to-[#f57c00]/5 border-[#f57c00]/30 shadow-lg" 
                        : "bg-[#121216] border-gray-800"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800/60 pb-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                          {inq.status === "new" && (
                            <span className="bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">NEW</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-1 font-serif">
                          <span>📧 {inq.email}</span>
                          <span>📞 {inq.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-gray-500 font-mono">{inq.date}</span>
                        
                        {inq.status === "new" && (
                          <button
                            id={`inq-read-${inq.id}`}
                            onClick={() => handleMarkInquiryRead(inq.id)}
                            className="p-1 px-2 border border-green-900/30 bg-green-950/20 text-green-400 hover:bg-green-900/40 rounded text-xs transition-all flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Read
                          </button>
                        )}
                        <button
                          id={`inq-delete-${inq.id}`}
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1 px-2 hover:bg-red-950/50 text-red-400 rounded text-xs transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-serif italic py-1">
                      &ldquo; {inq.message} &rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. REVIEWS WALL TAB */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="bg-[#121216] border border-[#ffd700]/10 p-5 rounded-xl">
              <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Moderate Wall Reviews</div>
              <p className="text-xs text-gray-400">
                You can delete reviews that contain inappropriate suggestions, maintaining the premium five-star elegance of Saifoodlover.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-[#121216] border border-gray-800 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-bold text-white">{r.name}</h5>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{r.date}</p>
                    <p className="text-xs text-gray-300 mt-2 italic font-serif leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-gray-850 mt-4">
                    <button
                      id={`review-delete-${r.id}`}
                      onClick={() => handleDeleteReview(r.id)}
                      className="p-1.5 px-3 hover:bg-red-950/40 text-red-400 hover:text-red-300 rounded text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Testimonial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
