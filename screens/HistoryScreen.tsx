import React from 'react';
import { Navbar } from '../components/Navbar';
import { User, ViewState, Order } from '../types';
import { Star } from 'lucide-react';

interface HistoryScreenProps {
  user: User;
  history: Order[];
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onRateProduct: (productId: number, rating: number) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ user, history, onNavigate, onLogout, onRateProduct }) => {

  const handleRate = (orderId: string, itemId: number, rating: number) => {
    onRateProduct(itemId, rating);
  };

  return (
    <div className="min-h-screen bg-gray-100 pattern-bg flex flex-col font-sans">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="relative h-[200px] w-full bg-[#111] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-100 bg-[url('/fundo.jpg')] bg-cover bg-center"></div>
          <div className="z-10 text-center">
             <h1 className="font-display text-white text-4xl md:text-5xl drop-shadow-lg">Dev <span className="text-[#9758a6]">Burguer</span></h1>
          </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#78ab26] uppercase tracking-wide inline-block relative">
                Histórico de Pedidos
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#9758a6] rounded-full"></span>
            </h2>
        </div>

        <div className="space-y-6">
            {history.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                    <p className="text-gray-500 text-lg">Você ainda não realizou nenhum pedido.</p>
                </div>
            ) : (
                history.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                        <div className="bg-[#333] text-white px-6 py-4 flex justify-between items-center">
                            <span className="font-bold">Pedido {order.id}</span>
                            <span className="text-sm text-gray-300">{order.date}</span>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 mb-4">
                                {order.items.map((item, idx) => {
                                    const currentRating = item.rating || 0;

                                    return (
                                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 text-sm border-b border-gray-100 last:border-0 pb-4 last:pb-0 gap-2">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                            <div>
                                                <div className="font-bold">{item.quantity}x {item.name}</div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => handleRate(order.id, item.id, star)}
                                                            className="focus:outline-none transition-transform hover:scale-110"
                                                        >
                                                            <Star
                                                                size={14}
                                                                fill={star <= currentRating ? "#eba417" : "none"}
                                                                color={star <= currentRating ? "#eba417" : "#cbd5e1"}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-gray-900">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === 'Entregue' ? 'bg-green-100 text-green-800' : 
                                        order.status === 'Cancelado' ? 'bg-red-100 text-red-800' : 
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-xl font-bold text-[#9758a6]">
                                    Total: R$ {order.total.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
      
      <div className="bg-[#5c2e6b] text-white py-4 text-center text-xs font-light tracking-wider mt-auto">
         desenvolvido por Dvelloper - 2025 - Todos os direitos reservados
      </div>
    </div>
  );
};