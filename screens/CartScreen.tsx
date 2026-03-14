import React from 'react';
import { Navbar } from '../components/Navbar';
import { User, ViewState, CartItem } from '../types';
import { Minus, Plus, ShoppingBasket } from 'lucide-react';

interface CartScreenProps {
  user: User;
  cart: CartItem[];
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ user, cart, onNavigate, onLogout, onUpdateQuantity }) => {
  const itemsTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 5.00;
  const total = itemsTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-100 pattern-bg flex flex-col font-sans">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} cartCount={cart.length} />
      
      {/* Header Banner */}
      <div className="relative h-[200px] w-full bg-[#111] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-100 bg-[url('/fundo.jpg')] bg-cover bg-center"></div>
          <div className="z-10 text-center">
             {/* Logo would go here if needed, keeping simple like others */}
             <h1 className="font-display text-white text-4xl md:text-5xl drop-shadow-lg">Dev <span className="text-[#9758a6]">Burguer</span></h1>
          </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-10">
        
        {/* Title */}
        <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#78ab26] uppercase tracking-wide inline-block relative">
                Checkout - Pedido
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#9758a6] rounded-full"></span>
            </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Items List */}
            <div className="flex-1">
                {/* Table Header */}
                <div className="bg-[#333] text-white rounded-t-xl grid grid-cols-12 px-6 py-4 text-sm font-medium">
                    <div className="col-span-5 md:col-span-6">Itens</div>
                    <div className="col-span-2 text-center hidden md:block">Preço</div>
                    <div className="col-span-4 md:col-span-2 text-center">Quantidade</div>
                    <div className="col-span-3 md:col-span-2 text-right">Total</div>
                </div>

                <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    {cart.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Seu carrinho está vazio.
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 px-6 py-4 items-center border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                <div className="col-span-5 md:col-span-6 flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm hidden sm:block">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800 leading-tight">{item.name}</span>
                                        <span className="text-xs text-gray-500 md:hidden">Unit: R$ {item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 text-center text-gray-600 font-medium hidden md:block">
                                    R$ {item.price.toFixed(2)}
                                </div>
                                <div className="col-span-4 md:col-span-2 flex justify-center">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                            className="w-6 h-6 rounded bg-[#9758a6] text-white flex items-center justify-center hover:bg-[#7a4687]"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                            className="w-6 h-6 rounded bg-[#9758a6] text-white flex items-center justify-center hover:bg-[#7a4687]"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-3 md:col-span-2 text-right font-bold text-gray-800">
                                    R$ {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 text-right">
                    <button 
                        onClick={() => onNavigate(ViewState.MENU)}
                        className="text-[#9758a6] font-bold text-sm hover:underline"
                    >
                        &lt; Adicionar mais produtos
                    </button>
                </div>
            </div>

            {/* Right Column: Summary */}
            <div className="w-full lg:w-[350px]">
                <div className="bg-[#333] text-white rounded-t-xl px-6 py-4 font-medium">
                    Resumo do pedido
                </div>
                <div className="bg-white rounded-b-xl shadow-lg p-6 space-y-4">
                    <div className="flex justify-between text-gray-500">
                        <span>Itens</span>
                        <span>R$ {itemsTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>Taxa de entrega</span>
                        <span>R$ {cart.length > 0 ? deliveryFee.toFixed(2).replace('.', ',') : '0,00'}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total</span>
                        <span className="text-xl font-bold text-gray-800">R$ {cart.length > 0 ? total.toFixed(2).replace('.', ',') : '0,00'}</span>
                    </div>
                    
                    <button 
                        onClick={() => cart.length > 0 ? onNavigate(ViewState.CHECKOUT) : null}
                        disabled={cart.length === 0}
                        className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all uppercase tracking-wide
                            ${cart.length > 0 ? 'bg-[#9758a6] hover:bg-[#7a4687] active:translate-y-1' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#5c2e6b] text-white py-4 text-center text-xs font-light tracking-wider mt-auto">
         desenvolvido por Dvelloper - 2025 - Todos os direitos reservados
      </div>
    </div>
  );
};
