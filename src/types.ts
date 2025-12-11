export type OrderType = 'dine-in' | 'take-out';

export type Language = 'english' | 'spanish';

export interface PartySize {
  adults: number;
  kids: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
  ingredients?: string[];
  allergens?: string[];
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  customizations?: {
    spiceLevel?: 'mild' | 'medium' | 'spicy';
    other?: string[];
  };
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customizations?: {
    spiceLevel?: 'mild' | 'medium' | 'spicy';
    other?: string[];
    addOns?: string[];
  };
}

export type Screen = 
  | 'splash'
  | 'welcome' 
  | 'menu' 
  | 'customize' 
  | 'order-complete' 
  | 'confirmation';

export interface AppState {
  currentScreen: Screen;
  orderType: OrderType | null;
  partySize: PartySize;
  language: Language;
  cart: CartItem[];
  selectedItem: MenuItem | null;
  selectedCategory: string;
}

