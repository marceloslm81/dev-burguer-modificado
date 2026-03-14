export enum ViewState {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  HOME = 'HOME',
  MENU = 'MENU',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  CONTACTS = 'CONTACTS',
  HISTORY = 'HISTORY',
  ADMIN_ORDERS = 'ADMIN_ORDERS',
  ADMIN_PRODUCTS_LIST = 'ADMIN_PRODUCTS_LIST',
  ADMIN_PRODUCT_CREATE = 'ADMIN_PRODUCT_CREATE'
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Em produção' | 'Pronto' | 'A caminho' | 'Entregue' | 'Cancelado';
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface User {
  name: string;
  email: string;
}
