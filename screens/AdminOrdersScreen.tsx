import React, { useState } from 'react';
import { User, ViewState, Order } from '../types';
import { ChevronRight } from 'lucide-react';

interface AdminOrdersScreenProps {
  user: User;
  orders: Order[];
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
}

export const AdminOrdersScreen: React.FC<AdminOrdersScreenProps> = ({ user, orders, onNavigate, onLogout, onUpdateOrderStatus }) => {
  const [tab, setTab] = useState<'Todos' | 'Em preparo' | 'Entregues'>('Todos');

  const filtered = orders.filter(o => {
    if (tab === 'Todos') return true;
    if (tab === 'Entregues') return o.status === 'Entregue';
    return o.status === 'Em produção' || o.status === 'Pronto' || o.status === 'A caminho';
  });

  return (
    <div className="min-h-screen bg-[#111] text-white flex">
      <div className="w-64 bg-[#1f1f1f] flex flex-col">
        <div className="px-6 py-6"><img src="/Logo 1.png" alt="Dev Burguer" className="w-28 h-28 object-contain mx-auto" /></div>
        <button className="text-left px-6 py-3 bg-[#9758a6]">Pedidos</button>
        <div className="px-6 py-3 flex items-center justify-between text-left">Produtos <ChevronRight size={16} /></div>
        <button onClick={() => onNavigate(ViewState.ADMIN_PRODUCTS_LIST)} className="text-left px-10 py-2">Listar produtos</button>
        <button onClick={() => onNavigate(ViewState.ADMIN_PRODUCT_CREATE)} className="text-left px-10 py-2">Cadastrar produto</button>
        <div className="mt-auto"></div>
        <button onClick={() => onNavigate(ViewState.HOME)} className="text-left px-6 py-3">Sair</button>
        <div className="bg-[#5c2e6b] text-center text-xs py-3">Desenvolvido por DevClub - 2025 - Todos os direitos reservados</div>
      </div>

      <div className="flex-1 bg-gray-200 p-6">
        <div className="bg-white rounded-2xl p-6">
          <div className="text-gray-500 text-sm mb-6">Gerenciar &gt; Pedidos</div>
          <div className="flex gap-4 mb-6">
            <button onClick={() => setTab('Todos')} className={`px-4 py-2 rounded-full border ${tab==='Todos'?'border-[#eba417] text-[#111]':'border-transparent text-gray-500'}`}>Todos</button>
            <button onClick={() => setTab('Em preparo')} className={`px-4 py-2 rounded-full border ${tab==='Em preparo'?'border-[#eba417] text-[#111]':'border-transparent text-gray-500'}`}>Em preparo</button>
            <button onClick={() => setTab('Entregues')} className={`px-4 py-2 rounded-full border ${tab==='Entregues'?'border-[#eba417] text-[#111]':'border-transparent text-gray-500'}`}>Entregues</button>
          </div>

          <div className="rounded-2xl overflow-hidden border">
            <div className="grid grid-cols-12 bg-[#1f1f1f] text-white px-6 py-3">
              <div className="col-span-2">Pedido</div>
              <div className="col-span-7">Itens</div>
              <div className="col-span-3 text-right">Status</div>
            </div>
            <div className="bg-white">
              {filtered.length === 0 ? (
                <div className="px-6 py-8 text-gray-500">Nenhum pedido encontrado.</div>
              ) : (
                filtered.map((o) => (
                  <div key={o.id} className="grid grid-cols-12 border-t px-6 py-4 items-center">
                    <div className="col-span-2 text-gray-800">#{o.id}</div>
                    <div className="col-span-7 text-gray-800">
                      <div className="flex flex-wrap gap-4">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{item.name}</span>
                              <span className="text-xs text-gray-500">Qtd: {item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as Order['status'])}
                        className="border rounded px-3 py-2 text-gray-800 w-full"
                      >
                        <option>Em produção</option>
                        <option>Pronto</option>
                        <option>A caminho</option>
                        <option>Entregue</option>
                        <option>Cancelado</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
