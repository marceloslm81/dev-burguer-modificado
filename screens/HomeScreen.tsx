import React, { useEffect, useState } from 'react';
import { ShoppingBasket, ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { User, ViewState, Product } from '../types';
import { CATEGORIES } from '../constants';

interface HomeScreenProps {
  user: User;
  onNavigate: (view: ViewState) => void;
  onSelectCategory: (categoryName: string) => void;
  onLogout: () => void;
  onAddToCart: (product: Product) => void;
  favoriteIds: number[];
  onToggleFavorite: (productId: number) => void;
  offers: Product[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onNavigate, onSelectCategory, onLogout, onAddToCart, favoriteIds, onToggleFavorite, offers }) => {
  const [offersPage, setOffersPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
        return;
      }
      if (window.innerWidth < 1024) {
        setItemsPerPage(2);
        return;
      }
      setItemsPerPage(4);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalOfferPages = Math.max(1, Math.ceil(offers.length / itemsPerPage));
  const safeOffersPage = Math.min(offersPage, totalOfferPages - 1);
  const visibleOffers = offers.slice(
    safeOffersPage * itemsPerPage,
    safeOffersPage * itemsPerPage + itemsPerPage
  );
  const emptyOfferSlots = Math.max(0, itemsPerPage - visibleOffers.length);

  useEffect(() => {
    if (offersPage > totalOfferPages - 1) {
      setOffersPage(Math.max(0, totalOfferPages - 1));
    }
  }, [offersPage, totalOfferPages]);

  const handlePreviousOffers = () => {
    setOffersPage((prev) => (prev === 0 ? totalOfferPages - 1 : prev - 1));
  };

  const handleNextOffers = () => {
    setOffersPage((prev) => (prev + 1) % totalOfferPages);
  };

  return (
    <div className="min-h-screen bg-gray-100 pattern-bg flex flex-col">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[450px] w-full bg-black overflow-hidden group">
        <img 
            src="/pexels-kiro-wang-7133605 1.png" 
            alt="Delicious Burger" 
            className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-center justify-center pb-20">
            <h1 className="text-white text-4xl md:text-7xl font-display transform -rotate-3 drop-shadow-xl text-center md:translate-x-80">
                Bem-vindo!
            </h1>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-20 mt-10 md:mt-16">
        
        {/* Categories Section */}
        <div className="mt-12 mb-8 text-center relative">
            <h2 className="text-3xl font-extrabold text-[#9758a6] uppercase tracking-wide inline-block relative">
                Categorias
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#9758a6] rounded-full"></span>
            </h2>
        </div>

        <div className="relative w-full">
            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-2 md:justify-center">
                {CATEGORIES.map((cat) => (
                    <div 
                        key={cat.id} 
                        onClick={() => onSelectCategory(cat.name)}
                        className="min-w-[200px] md:min-w-[250px] h-[160px] rounded-xl overflow-hidden relative cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <img 
                            src={cat.image} 
                            alt={cat.name} 
                            className={'w-full h-full object-cover'} 
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-end justify-center pb-4">
                            <span className="text-white text-xl font-bold drop-shadow-md">{cat.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Visual Navigation Arrows (Decorational for this demo) */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-[-40px] text-gray-400">
                <ChevronLeft size={48} />
            </div>
             <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-[-40px] text-gray-400">
                <ChevronRight size={48} />
            </div>
        </div>

        {/* Offers Section */}
        <div className="mt-12 mb-12 text-center relative">
            <h2 className="text-3xl font-extrabold text-[#5c913b] uppercase tracking-wide inline-block relative">
                Ofertas do Dia
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#5c913b] rounded-full"></span>
            </h2>
        </div>

        <div className="mt-16 md:mt-20 min-h-[460px] md:min-h-[520px]">
          <div className="relative">
            <button
              onClick={handlePreviousOffers}
              className="absolute left-0 md:left-[-20px] lg:left-[-26px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#d9cde0] text-[#9758a6] flex items-center justify-center shadow-sm hover:bg-[#f6ebfa] transition-colors z-10"
              aria-label="Oferta anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNextOffers}
              className="absolute right-0 md:right-[-20px] lg:right-[-26px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#d9cde0] text-[#9758a6] flex items-center justify-center shadow-sm hover:bg-[#f6ebfa] transition-colors z-10"
              aria-label="Próxima oferta"
            >
              <ChevronRight size={22} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleOffers.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl pt-24 px-6 pb-6 relative shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                    <button
                        onClick={() => onToggleFavorite(product.id)}
                        className={`absolute top-5 right-5 transition-colors z-10 ${favoriteIds.includes(product.id) ? 'text-[#ff4d6d]' : 'text-[#9758a6] hover:text-[#7a4687]'}`}
                    >
                        <Heart size={24} fill={favoriteIds.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                        <img src={product.image} alt={product.name} className="w-32 h-32 object-contain drop-shadow-xl" />
                    </div>
                    <div className="flex-1 flex flex-col text-left">
                        <h3 className="text-[#ff9100] font-bold text-xl mb-2 leading-tight min-h-[56px]">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed h-[66px] overflow-hidden">
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
            {Array.from({ length: emptyOfferSlots }).map((_, index) => (
                <div key={`empty-offer-${index}`} className="invisible rounded-3xl pt-24 px-6 pb-6 shadow-md" />
            ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalOfferPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setOffersPage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${safeOffersPage === index ? 'bg-[#9758a6]' : 'bg-[#d7c4de]'}`}
                aria-label={`Ir para página ${index + 1} das ofertas`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#5c2e6b] text-white py-3 text-center text-xs font-light tracking-wide mt-auto">
         Desenvolvido por Dvelloper - 2026 - Todos os direitos reservados
      </div>
    </div>
  );
};
