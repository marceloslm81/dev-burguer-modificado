import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { LogoSmall } from './Logo';
import { User, ViewState } from '../types';

interface NavbarProps {
  user: User;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, cartCount = 0 }) => {
  return (
    <nav className="bg-[#1f1f1f] text-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div 
        className="cursor-pointer"
        onClick={() => onNavigate(ViewState.HOME)}
      >
        <LogoSmall />
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
        <button onClick={() => onNavigate(ViewState.HOME)} className="hover:text-[#9758a6] transition-colors">Home</button>
        <button onClick={() => onNavigate(ViewState.CONTACTS)} className="hover:text-[#9758a6] transition-colors">Contatos</button>
        <button onClick={() => onNavigate(ViewState.HISTORY)} className="hover:text-[#9758a6] transition-colors">Histórico</button>
        <button onClick={() => onNavigate(ViewState.ADMIN_ORDERS)} className="hover:text-[#9758a6] transition-colors">Gerenciar</button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end leading-tight">
          <span className="text-xs text-gray-400">Olá, <span className="text-[#9758a6] font-bold">{user.name}</span></span>
          <button onClick={onLogout} className="text-xs font-bold text-[#eba417] hover:text-[#d49315] flex items-center gap-1">
             Sair
          </button>
        </div>
        
        <button 
            onClick={() => onNavigate(ViewState.CART)}
            className="relative p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#eba417] text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
            </span>
            <span className="text-xs ml-2 hidden sm:inline text-gray-300">Pedidos</span>
        </button>
      </div>
    </nav>
  );
};
