import React from 'react';
import { Navbar } from '../components/Navbar';
import { User, ViewState } from '../types';
import { MessageSquare, Check } from 'lucide-react';

interface OrderConfirmedScreenProps {
  user: User;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export const OrderConfirmedScreen: React.FC<OrderConfirmedScreenProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 pattern-bg flex flex-col font-sans">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Header Banner */}
      <div className="relative h-[200px] w-full bg-[#111] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-100 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
          <div className="z-10 text-center">
             <h1 className="font-display text-white text-4xl md:text-5xl drop-shadow-lg">Dev <span className="text-[#9758a6]">Burguer</span></h1>
          </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-16 text-center flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#78ab26] uppercase tracking-wide inline-block relative">
                Checkout - Pedido concluído
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#78ab26] rounded-full"></span>
            </h2>
        </div>

        {/* Icon */}
        <div className="relative mb-8">
            <MessageSquare size={120} className="text-[#0fa942] fill-[#0fa942]" />
            <Check size={60} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white font-bold" strokeWidth={4} />
        </div>

        {/* Message */}
        <h3 className="text-4xl font-extrabold text-[#9758a6] mb-6">Obrigado!</h3>
        
        <p className="text-gray-800 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            Seu pedido já está em produção e logo sairá para entrega. Agradecemos a preferência!
        </p>

        <div className="mt-16">
             <button 
                onClick={() => onNavigate(ViewState.HOME)}
                className="text-[#9758a6] font-bold text-sm hover:underline bg-[#e0d4e3] px-6 py-2 rounded-full"
            >
                &lt; Voltar para o início
            </button>
        </div>

      </div>
      
      {/* Footer */}
      <div className="bg-[#5c2e6b] text-white py-4 text-center text-xs font-light tracking-wider mt-auto">
         Desenvolvido por Dvelloper - 2025 - Todos os direitos reservados
      </div>
    </div>
  );
};
