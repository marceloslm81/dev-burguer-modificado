import React from 'react';
import { ShoppingBasket, Heart, Star, ChevronLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { User, ViewState, Product } from '../types';

interface MenuScreenProps {
  user: User;
  category: string;
  categories: string[];
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onSelectCategory: (categoryName: string) => void;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  favoriteIds: number[];
  onToggleFavorite: (productId: number) => void;
  products: Product[];
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ user, category, categories, onNavigate, onLogout, onSelectCategory, onBack, onAddToCart, favoriteIds, onToggleFavorite, products: allProducts }) => {
  const activeCategory = category || categories[0] || '';
  const products = allProducts.filter(p => p.category === activeCategory);
  
  const titleColor = 'text-[#78ab26]'; 
  
  return (
    <div className="min-h-screen bg-gray-100 pattern-bg flex flex-col font-sans">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[350px] w-full bg-[#111] overflow-hidden">
        <img 
            src="/pexels-valeria-boltneva-1639562 1.png" 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-display text-white text-4xl md:text-6xl tracking-wide leading-tight drop-shadow-2xl">
                O MELHOR <br/> 
                HAMBURGUER <br/> 
                ESTA AQUI!
            </h1>
            <p className="text-white text-xs md:text-sm mt-2 font-light tracking-widest uppercase">
                Esse cardápio está irresistível!
            </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => onSelectCategory(item)}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-colors ${activeCategory === item ? 'bg-[#9758a6] text-white border-[#9758a6]' : 'bg-white text-[#9758a6] border-[#9758a6] hover:bg-[#f6ebfa]'}`}
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* Section Title */}
        <div className="mt-10 mb-28 text-center relative">
            <h2 className={`text-2xl md:text-3xl font-extrabold ${titleColor} uppercase tracking-wide inline-block relative`}>
                {activeCategory === 'Hamburgueres' ? 'Hamburgúeres - Cardápio' : `Cardápio - ${activeCategory}`}
                <span className={`absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#9758a6] rounded-full`}></span>
            </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-20">
            {products.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl pt-24 px-6 pb-6 relative shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                    {/* Heart Icon */}
                    <button
                        onClick={() => onToggleFavorite(product.id)}
                        className={`absolute top-5 right-5 transition-colors z-10 ${favoriteIds.includes(product.id) ? 'text-[#ff4d6d]' : 'text-[#9758a6] hover:text-[#7a4687]'}`}
                    >
                        <Heart size={24} fill={favoriteIds.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>

                    {/* Floating Image Above Card */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-38 h-36 object-contain drop-shadow-xl" 
                        />
                    </div>
                    
                    {/* Content - Left Aligned */}
                    <div className="flex-1 flex flex-col text-left">
                        <h3 className="text-[#ff9100] font-bold text-xl mb-2 leading-tight">
                            {product.name}
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            {product.description || 'Uma deliciosa opção para o seu paladar.'}
                        </p>

                        <div className="mt-auto flex justify-between items-end">
                            <div className="flex flex-col">
                                {product.discount ? (
                                    <>
                                        <span className="text-gray-400 font-bold text-xl line-through">
                                            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                        <span className="text-[#ff4d6d] font-extrabold text-2xl">
                                            {(product.price * (1 - product.discount / 100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-gray-900 font-extrabold text-2xl">
                                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                )}
                                 {product.rating && product.rating > 0 ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                                                <Star 
                                                  key={i} 
                                                  size={14} 
                                                  fill="#eba417"
                                                  color="#eba417" 
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-[#eba417]">{product.rating.toFixed(1)}</span>
                                    </div>
                                ) : (
                                    <div className="mt-1 h-5"></div>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => onAddToCart(product)}
                                className="bg-[#9758a6] hover:bg-[#854b94] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-95"
                            >
                                <ShoppingBasket size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-12 mb-6">
            <button 
                onClick={onBack}
                className="text-[#9758a6] font-bold text-sm flex items-center gap-2 hover:underline"
            >
                <ChevronLeft size={16} /> Voltar
            </button>
        </div>

      </div>

      {/* Footer */}
      <div className="bg-[#5c2e6b] text-white py-4 text-center text-xs font-light tracking-wider mt-auto">
         desenvolvido por Dvelloper - 2025 - Todos os direitos reservados
      </div>
    </div>
  );
};
