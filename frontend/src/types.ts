export interface MenuItemVariant {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string; // e.g. "Non-Veg Pizzas" or "Veg Pizzas"
  price: number; // For single-price items
  variants?: MenuItemVariant[]; // For multi-priced items (e.g. Reg/Large Pizza)
  description?: string;
  imageUrl?: string;
  popular?: boolean;
}

export interface ComboOffer {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl?: string;
  items: string[];
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'food' | 'ambience' | 'experience';
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

export interface CartItem {
  id: string; // Unique cartridge id (combination of item + size)
  item: MenuItem;
  quantity: number;
  selectedVariant?: MenuItemVariant;
  specialInstructions?: string;
}
