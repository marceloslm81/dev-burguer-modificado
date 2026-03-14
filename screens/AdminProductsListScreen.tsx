import React, { useMemo, useState } from 'react';
import { User, ViewState, Product } from '../types';
import { Search, ChevronRight, Trash, Edit } from 'lucide-react';

interface AdminProductsListScreenProps {
  user: User;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  products: Product[];
  offerMap: Record<number, boolean>;
  onToggleOffer: (id: number, value: boolean) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
}

export const AdminProductsListScreen: React.FC<AdminProductsListScreenProps> = ({ user, onNavigate, onLogout, products, offerMap, onToggleOffer, onEditProduct, onDeleteProduct }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, products]);

  return (
    <div className="min-h-screen bg-[#111] text-white flex">
      <div className="w-64 bg-[#1f1f1f] flex flex-col">
        <div className="px-6 py-6"><img src="/Logo 1.png" alt="Dev Burguer" className="w-28 h-28 object-contain mx-auto" /></div>
        <button onClick={() => onNavigate(ViewState.ADMIN_ORDERS)} className="text-left px-6 py-3">Pedidos</button>
        <div className="px-6 py-3 bg-[#9758a6] flex items-center justify-between text-left">Produtos <ChevronRight size={16} /></div>
        <button className="text-left px-10 py-2">Listar produtos</button>
        <button onClick={() => onNavigate(ViewState.ADMIN_PRODUCT_CREATE)} className="text-left px-10 py-2">Cadastrar produto</button>
        <div className="mt-auto"></div>
        <button onClick={() => onNavigate(ViewState.HOME)} className="text-left px-6 py-3">Sair</button>
        <div className="bg-[#5c2e6b] text-center text-xs py-3">Desenvolvido por Dvelloper - 2025 - Todos os direitos reservados</div>
      </div>

      <div className="flex-1 bg-gray-200 p-6">
        <div className="bg-white rounded-2xl p-6">
          <div className="text-gray-500 text-sm mb-6">Gerenciar &gt; Produtos &gt; Listar produtos</div>
          <div className="relative mb-6">
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar produto"
              className="w-full border rounded-lg px-4 py-2 pr-10"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>

          <div className="rounded-2xl overflow-hidden border">
            <div className="grid grid-cols-12 bg-[#1f1f1f] text-white px-6 py-3">
              <div className="col-span-5">Nome</div>
              <div className="col-span-3">Preço</div>
              <div className="col-span-3">Imagem de produto</div>
              <div className="col-span-1 text-right">Ações</div>
            </div>
            <div className="bg-white">
              {filtered.map(p => (
                <div key={p.id} className="grid grid-cols-12 border-t px-6 py-3 items-center">
                  <div className="col-span-5 text-gray-800">{p.name}</div>
                  <div className="col-span-3 text-gray-800">R$ {p.price.toFixed(2).replace('.', ',')}</div>
                  <div className="col-span-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-contain" />
                  </div>
                  <div className="col-span-1 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => onEditProduct(p)} className="p-1 rounded hover:bg-gray-100"><Edit size={18} className="text-gray-700" /></button>
                      <button onClick={() => onDeleteProduct(p.id)} className="p-1 rounded hover:bg-gray-100"><Trash size={18} className="text-red-600" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
