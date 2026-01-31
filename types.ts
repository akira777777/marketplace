export enum Page {
  HOME = 'HOME',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  CART = 'CART',
  CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS',
  INVENTORY = 'INVENTORY',
  GENERATOR = 'GENERATOR',
  MARKET_INTEL = 'MARKET_INTEL',
  CATALOG = 'CATALOG'
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  game: string;
  type: string;
  price: number;
  originalPrice?: number;
  image: string;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common' | 'StatTrak™';
  rarityColor: string;
  description?: string;
  float?: string;
  pattern?: number;
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface InventoryItem extends Product {
  inventoryId: string;
  acquiredDate: string;
  isTradable: boolean;
}