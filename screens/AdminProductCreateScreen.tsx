import React, { useEffect, useState } from 'react';
import { User, ViewState, Product } from '../types';
import { CATEGORIES } from '../constants';
import { ChevronRight, Upload } from 'lucide-react';

interface AdminProductCreateScreenProps {
  user: User;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  productToEdit?: Product | null;
  onSaveProduct: (product: Product) => void;
}

export const AdminProductCreateScreen: React.FC<AdminProductCreateScreenProps> = ({ user, onNavigate, onLogout, productToEdit, onSaveProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<number>(CATEGORIES[0]?.id || 1);
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState<string>('');
  const [isOffer, setIsOffer] = useState(false);
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(String(productToEdit.price));
      const cat = CATEGORIES.find(c => c.name === productToEdit.category)?.id || CATEGORIES[0].id;
      setCategory(cat);
      setImage(productToEdit.image);
      setIsOffer(!!productToEdit.discount);
      setDiscount(productToEdit.discount ? String(productToEdit.discount) : '');
    }
  }, [productToEdit]);

  const submit = () => {
    const catName = CATEGORIES.find(c => c.id === category)?.name || CATEGORIES[0].name;
    const updated: Product = {
      id: productToEdit?.id || Math.floor(Math.random()*100000),
      name,
      price: Number(price),
      image: image || productToEdit?.image || '/burguer1.png',
      category: catName,
      description: productToEdit?.description,
      rating: productToEdit?.rating || 5,
      discount: isOffer && discount ? Number(discount) : undefined
    };
    onSaveProduct(updated);
    onNavigate(ViewState.ADMIN_PRODUCTS_LIST);
  };

  return (
    <div className="min-h-screen bg-gray-100 pattern-bg text-white flex">
      <div className="w-64 bg-[#1f1f1f] flex flex-col">
        <div className="px-6 py-6"><img src="/Logo 1.png" alt="Dev Burguer" className="w-28 h-28 object-contain mx-auto" /></div>
        <button onClick={() => onNavigate(ViewState.ADMIN_ORDERS)} className="text-left px-6 py-3">Pedidos</button>
        <div className="px-6 py-3 bg-[#9758a6] flex items-center justify-between text-left">Produtos <ChevronRight size={16} /></div>
        <button onClick={() => onNavigate(ViewState.ADMIN_PRODUCTS_LIST)} className="text-left px-10 py-2">Listar produtos</button>
        <button className="text-left px-10 py-2">Cadastrar produto</button>
        <div className="mt-auto"></div>
        <button onClick={() => onNavigate(ViewState.HOME)} className="text-left px-6 py-3">Sair</button>
        <div className="bg-[#5c2e6b] text-center text-xs py-3">Desenvolvido por Dvelloper - 2025 - Todos os direitos reservados</div>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-2xl p-6">
          <div className="text-gray-500 text-sm mb-6">Gerenciar &gt; Cadastrar produto</div>
          <div className="max-w-md mx-auto bg-[#2b2b2b] rounded-xl p-6 text-white shadow">
            <div className="mb-4">
              <label className="block text-sm mb-1">Nome</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-lg border border-gray-600 bg-[#1f1f1f] px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Preço</label>
              <input value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full rounded-lg border border-gray-600 bg-[#1f1f1f] px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Carregar imagem do produto</label>
              <label className="flex items-center gap-2 rounded-lg border border-gray-600 bg-[#1f1f1f] px-3 py-2 cursor-pointer">
                <Upload size={16} />
                <span>{fileName || image || 'Selecionar arquivo'}</span>
                <input type="file" className="hidden" onChange={(e)=> { const f=e.target.files?.[0]; setFileName(f?.name || ''); if (f) setImage(`/${f.name}`);} } />
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-sm mb-1">Categoria</label>
              <select value={category} onChange={(e)=>setCategory(Number(e.target.value))} className="w-full rounded-lg border border-gray-600 bg-[#1f1f1f] px-3 py-2">
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isOffer} 
                  onChange={(e) => setIsOffer(e.target.checked)}
                  className="w-4 h-4 accent-[#9758a6]" 
                />
                <span className="text-sm">Produto em oferta</span>
              </label>
            </div>
            {isOffer && (
              <div className="mb-4">
                <label className="block text-sm mb-1">Desconto (%)</label>
                <input 
                  type="number" 
                  value={discount} 
                  onChange={(e)=>setDiscount(e.target.value)}
                  min="0" 
                  max="100" 
                  className="w-full rounded-lg border border-gray-600 bg-[#1f1f1f] px-3 py-2" 
                  placeholder="Ex: 20"
                />
              </div>
            )}
            <button onClick={submit} className="w-full py-3 rounded-lg font-bold text-white bg-[#9758a6]">Adicionar produto</button>
          </div>
        </div>
      </div>
    </div>
  );
};
