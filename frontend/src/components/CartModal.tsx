import React, { useState } from "react";
import { MenuItem, CartItem } from "../types";
import { X, ShoppingCart, Plus, Minus, Check, MessageSquare, CreditCard, Trash2 } from "lucide-react";

interface CartModalProps {
  item: MenuItem | null; // For single item direct checkout
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onClose: () => void;
  isOpen: boolean;
  businessPhone?: string; // e.g. "919000000000"
}

export default function CartModal({
  item,
  cart,
  setCart,
  onClose,
  isOpen,
  businessPhone = "919949466307" // Default cafe phone placeholder
}: CartModalProps) {
  
  // Single item config states (only used if 'item' is provided)
  const [selectedVariant, setSelectedVariant] = useState(item?.variants ? item.variants[0] : undefined);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  // Delivery details state
  const [customerName, setCustomerName] = useState("Satish");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState<"delivery" | "dinein" | "takeaway">("delivery");

  if (!isOpen) return null;

  // Sync selected variant if item changes
  const handleVariantChange = (variantName: string) => {
    if (item?.variants) {
      const v = item.variants.find(x => x.name === variantName);
      if (v) setSelectedVariant(v);
    }
  };

  // Logic to add to cart
  const handleAddToCart = () => {
    if (!item) return;

    const uniqueId = item.variants && selectedVariant 
      ? `${item.id}_${selectedVariant.name}`
      : item.id;

    const existingCartItem = cart.find(ci => ci.id === uniqueId);

    if (existingCartItem) {
      setCart(prev => prev.map(ci => ci.id === uniqueId 
        ? { ...ci, quantity: ci.quantity + quantity, specialInstructions: instructions || ci.specialInstructions }
        : ci
      ));
    } else {
      const newCartItem: CartItem = {
        id: uniqueId,
        item,
        quantity,
        selectedVariant,
        specialInstructions: instructions || undefined
      };
      setCart(prev => [...prev, newCartItem]);
    }

    setIsSuccessMessage(true);
    setTimeout(() => {
      setIsSuccessMessage(false);
      onClose();
      // Reset
      setQuantity(1);
      setInstructions("");
    }, 1500);
  };

  // Modify quantities inside the accumulated cart drawer
  const updateCartQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(ci => {
      if (ci.id === cartId) {
        const newQty = ci.quantity + delta;
        return { ...ci, quantity: newQty };
      }
      return ci;
    }).filter(ci => ci.quantity > 0));
  };

  // Remove item completely from cart
  const removeCartItem = (cartId: string) => {
    setCart(prev => prev.filter(ci => ci.id !== cartId));
  };

  // Handle WhatsApp API generation and redirection
  const handleCheckoutWhatsApp = () => {
    // Check if delivery details are filled
    if (!customerName || !customerPhone || (orderType === "delivery" && !customerAddress)) {
      alert("Please fill in your Delivery Details (Name, Phone, and Address) before checking out.");
      return;
    }

    // Generate text message
    let text = "";
    text += "🍕 *SAIFOODLOVER CAFE ORDER* 🍕\n";
    text += "=============================\n";
    
    let totalSum = 0;

    // Case 1: Direct single item click quick order
    if (item) {
      const unitPrice = selectedVariant ? selectedVariant.price : item.price;
      const subtotal = unitPrice * quantity;
      totalSum = subtotal;

      text += `*Dish:* ${item.name}\n`;
      if (selectedVariant) {
        text += `*Size:* ${selectedVariant.name}\n`;
      }
      text += `*Quantity:* ${quantity}x\n`;
      if (instructions) {
        text += `*Instructions:* _${instructions}_\n`;
      }
      text += `*Price:* ₹${unitPrice} each\n`;
      text += "-----------------------------\n";
    } 
    // Case 2: Multi-item Cart checkout
    else if (cart.length > 0) {
      cart.forEach((ci, idx) => {
        const price = ci.selectedVariant ? ci.selectedVariant.price : ci.item.price;
        const subtotal = price * ci.quantity;
        totalSum += subtotal;

        text += `${idx + 1}. *${ci.item.name}* ${ci.selectedVariant ? `(${ci.selectedVariant.name})` : ""}\n`;
        text += `   Qty: ${ci.quantity}x @ ₹${price}\n`;
        if (ci.specialInstructions) {
          text += `   Note: _${ci.specialInstructions}_\n`;
        }
        text += `   Subtotal: ₹${subtotal}\n\n`;
      });
      text += "-----------------------------\n";
    } else {
      alert("Your order basket is empty!");
      return;
    }

    // Customer specifications
    text += `*Order Type:* ${orderType.toUpperCase()}\n`;
    text += `*Payment Method:* Cash on Delivery (COD)\n`;
    text += `*Payment Status:* PENDING (Pay on Delivery)\n`;
    if (customerName) text += `*Customer:* ${customerName}\n`;
    if (customerPhone) text += `*Phone:* ${customerPhone}\n`;
    if (customerAddress && orderType === "delivery") text += `*Address:* ${customerAddress}\n`;
    
    text += "=============================\n";
    text += `*GRAND TOTAL: ₹${totalSum}*\n`;
    text += "=============================\n\n";
    text += "Good Food | Good Mood | Great Times! 😊🍟";

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://api.whatsapp.com/send?phone=${businessPhone}&text=${encodedText}`;
    
    // Open in separate safe tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const calculateGrandTotal = () => {
    if (item) {
      return (selectedVariant ? selectedVariant.price : item.price) * quantity;
    }
    return cart.reduce((sum, ci) => {
      const p = ci.selectedVariant ? ci.selectedVariant.price : ci.item.price;
      return sum + (p * ci.quantity);
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        id="order-modal-sheet"
        className="bg-[#121216] border border-[#ffd700]/15 rounded-2xl max-w-lg w-full text-gray-200 overflow-hidden shadow-2xl animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#ffd700]/10 flex items-center justify-between bg-[#17171e]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#f57c00]" />
            <h3 className="text-md font-bold text-white uppercase tracking-wider">
              {item 
                ? `Customize ${item.name}` 
                : "Your Ordering Basket"}
            </h3>
          </div>
          <button 
            id="close-ordermodal-btn"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all animate-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {isSuccessMessage ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center mx-auto text-green-400 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Item Added Successfully!</h4>
              <p className="text-xs text-gray-405">Updating your gourmet shopping cart...</p>
            </div>
          ) : (
            <>
              {/* SINGLE ITEM CUSTOMIZER SCENARIO */}
              {item ? (
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-lg object-cover bg-gray-800 flex-shrink-0 border border-gray-800"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-gray-405 mt-1">{item.description}</p>
                      <p className="text-xs font-semibold text-[#f57c00] uppercase mt-2 font-mono tracking-widest">
                        ₹{selectedVariant ? selectedVariant.price : item.price}
                      </p>
                    </div>
                  </div>

                  {/* Sizing choosing */}
                  {item.variants && (
                    <div className="space-y-2 border-t border-gray-800/60 pt-4">
                      <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider">Choose Pizza Size / Variant:</span>
                      <div className="grid grid-cols-2 gap-3">
                        {item.variants.map((v) => (
                          <label 
                            key={v.name}
                            className={`flex justify-between items-center px-4 py-3 rounded-lg border cursor-pointer transition-all select-none ${
                              selectedVariant?.name === v.name 
                                ? "border-[#f57c00] bg-[#f57c00]/5 text-white" 
                                : "border-gray-800 bg-[#1e1e24] text-gray-400 hover:text-white"
                            }`}
                          >
                            <span className="text-xs font-bold">{v.name}</span>
                            <span className="text-xs text-[#ffd700] font-bold">₹{v.price}</span>
                            <input
                              type="radio"
                              name="pizza-size"
                              checked={selectedVariant?.name === v.name}
                              onChange={() => handleVariantChange(v.name)}
                              className="hidden"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between border-t border-gray-800/60 pt-4">
                    <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider">Select Quantity:</span>
                    <div className="flex items-center gap-3 bg-[#1e1e24] p-1 rounded-lg border border-gray-850">
                      <button
                        id="adjustitem-qty-minus"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/5 cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
                      <button
                        id="adjustitem-qty-plus"
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Special instructions */}
                  <div className="space-y-1.5 border-t border-gray-800/60 pt-4">
                    <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider block">Special Preparation Requests:</span>
                    <input
                      id="item-special-instructions-input"
                      type="text"
                      className="w-full bg-[#1e1e24] border border-gray-705 focus:border-[#f57c00] rounded-lg p-3 text-xs outline-none text-white font-serif"
                      placeholder="e.g. Extra cheese pull, zero chilies, make it spicy..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                /* ACCUMULATED CART LIST SCENARIO */
                <div className="space-y-5">
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <ShoppingCart className="w-12 h-12 text-gray-750 mx-auto mb-2" />
                      <p className="text-sm font-bold">Your ordering basket is empty</p>
                      <p className="text-xs text-gray-655 mt-1">Browse our menu and click dishes to add to basket.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((ci) => {
                        const price = ci.selectedVariant ? ci.selectedVariant.price : ci.item.price;
                        return (
                          <div key={ci.id} className="flex justify-between items-center border-b border-gray-850 pb-3 gap-3">
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs font-bold text-white truncate">{ci.item.name}</h5>
                              <p className="text-[10px] text-gray-405 font-mono">
                                {ci.selectedVariant ? `Size: ${ci.selectedVariant.name}` : "Standard"} • ₹{price}
                              </p>
                              {ci.specialInstructions && (
                                <p className="text-[10px] text-[#f57c00] font-serif truncate mt-0.5">📝 {ci.specialInstructions}</p>
                              )}
                            </div>

                            {/* Qty edit */}
                            <div className="flex items-center gap-2">
                              <button
                                id={`cart-minus-${ci.id}`}
                                onClick={() => updateCartQuantity(ci.id, -1)}
                                className="w-6 h-6 rounded bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold font-mono text-white w-4 text-center">{ci.quantity}</span>
                              <button
                                id={`cart-plus-${ci.id}`}
                                onClick={() => updateCartQuantity(ci.id, 1)}
                                className="w-6 h-6 rounded bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
                              >
                                +
                              </button>

                              <span className="text-xs font-bold font-mono text-[#ffd700] w-12 text-right">
                                ₹{price * ci.quantity}
                              </span>

                              <button
                                id={`cart-remove-${ci.id}`}
                                onClick={() => removeCartItem(ci.id)}
                                className="p-1 hover:bg-red-950/40 text-gray-400 hover:text-red-400 rounded transition-all cursor-pointer flex items-center justify-center shrink-0"
                                title="Delete item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* SERVICE & DELIVERY DETAILS FORM (Highly premium, user details) */}
              {(item || cart.length > 0) && (
                <div className="space-y-4 border-t border-gray-800/80 pt-5 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-gray-850 pb-2 flex items-center gap-2">
                    <span>🏠 Delivery / Order Settings</span>
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    {["delivery", "dinein", "takeaway"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setOrderType(t as any)}
                        className={`py-2 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          orderType === t 
                            ? "bg-[#f57c00]/10 border-[#f57c00] text-[#f57c00]" 
                            : "bg-[#1e1e24] border-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        {t === "delivery" && "🏍️ Delivery"}
                        {t === "dinein" && "🍽️ Dine-in"}
                        {t === "takeaway" && "🛍️ Takeaway"}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-gray-450 font-semibold mb-1">Your Full Name</label>
                      <input
                        id="customer-name-field"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-md p-2 outline-none text-white"
                        placeholder="Satish"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-450 font-semibold mb-1">Contact Phone Number</label>
                      <input
                        id="customer-phone-field"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-md p-2 outline-none text-white"
                        placeholder="e.g. +91 99494 66307"
                      />
                    </div>
                  </div>

                  {orderType === "delivery" && (
                    <div className="text-xs">
                      <label className="block text-gray-450 font-semibold mb-1">Drop-off Home Address</label>
                      <textarea
                        id="customer-address-field"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        rows={2}
                        className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-md p-2 outline-none text-white"
                        placeholder="Apt, Street Name, Landmark nearby..."
                      />
                    </div>
                  )}

                  {/* Payment Method Note */}
                  <div className="space-y-2 border-t border-gray-800/60 pt-4 text-xs">
                    <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider block">💳 Payment Method:</span>
                    <p className="text-gray-300 font-semibold">
                      💵 Cash on Delivery (COD) Only
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions for step: details */}
        {!isSuccessMessage && (item || cart.length > 0) && (
          <div className="p-5 bg-[#17171e] border-t border-[#ffd700]/10 flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-400">Grand Total Amount:</span>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-orange-400">
                ₹{calculateGrandTotal()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1">
              {item && (
                <button
                  id="checkout-add-to-cart-drawer"
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 font-semibold text-xs text-gray-200 hover:text-white rounded-xl transition-all shadow active:scale-95 cursor-pointer"
                >
                  📥 Add to Basket
                </button>
              )}
              
              <button
                id="checkout-btn-whatsapp-redirect"
                type="button"
                onClick={handleCheckoutWhatsApp}
                className={`py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold hover:brightness-110 text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                  item ? "" : "col-span-2"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Send WhatsApp Order</span>
              </button>
            </div>

            <p className="text-[10px] text-gray-500 text-center mt-1 select-none">
              Double check the details before sending. Clicking sends order details and loads WhatsApp instantly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
