import React, { useState } from 'react';
import { ViewState, User, CartItem, Product, Order } from './types';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MenuScreen } from './screens/MenuScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderConfirmedScreen } from './screens/OrderConfirmedScreen';
import { ContactsScreen } from './screens/ContactsScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { AdminOrdersScreen } from './screens/AdminOrdersScreen';
import { AdminProductsListScreen } from './screens/AdminProductsListScreen';
import { AdminProductCreateScreen } from './screens/AdminProductCreateScreen';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [history, setHistory] = useState<Order[]>([]);
  const [adminAuthorized, setAdminAuthorized] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminEmailInput, setAdminEmailInput] = useState<string>('');
  const [requestedAdminView, setRequestedAdminView] = useState<ViewState | null>(null);
  const ADMIN_EMAIL = 'mcs.marcelo81@gmail.com';
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [offerMap, setOfferMap] = useState<Record<number, boolean>>({});
  const offers = products.filter(p => !!offerMap[p.id]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleLogin = (email: string) => {
    const name = email.split('@')[0];
    setUser({ name, email });
    setCurrentView(ViewState.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentView(ViewState.LOGIN);
  };

  const handleSelectCategory = (categoryName: string) => {
      setSelectedCategory(categoryName);
      setCurrentView(ViewState.MENU);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Immediately navigate to cart as requested
    setCurrentView(ViewState.CART);
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleFinishOrder = () => {
    const newOrder: Order = {
        id: `#${Math.floor(Math.random() * 99999)}`,
        date: new Date().toLocaleDateString('pt-BR'),
        items: [...cart],
        total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 5,
        status: 'Em produção'
    };
    setHistory(prev => [newOrder, ...prev]);
    clearCart();
    setCurrentView(ViewState.ORDER_CONFIRMED);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setHistory(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleRateProduct = (productId: number, rating: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, rating } : p
    ));
    
    setHistory(prev => prev.map(order => ({
      ...order,
      items: order.items.map(item => 
        item.id === productId ? { ...item, rating } : item
      )
    })));
  };

  const navigate = (view: ViewState) => {
    const adminViews = [ViewState.ADMIN_ORDERS, ViewState.ADMIN_PRODUCTS_LIST, ViewState.ADMIN_PRODUCT_CREATE];
    if (adminViews.includes(view) && !adminAuthorized) {
      setRequestedAdminView(view);
      setShowAdminModal(true);
      return;
    }
    if (adminViews.includes(currentView) && view === ViewState.HOME) {
      setAdminAuthorized(false);
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.LOGIN:
        return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
      case ViewState.REGISTER:
        return <RegisterScreen onNavigate={navigate} />;
      case ViewState.HOME:
        if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
        return (
            <HomeScreen 
                user={user} 
                onNavigate={navigate} 
                onSelectCategory={handleSelectCategory} 
                onLogout={handleLogout} 
                onAddToCart={addToCart}
                offers={offers.length > 0 ? offers : products.slice(0,4)}
            />
        );
      case ViewState.MENU:
        if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
        return (
            <MenuScreen 
                user={user}
                category={selectedCategory}
                onNavigate={navigate}
                onLogout={handleLogout}
                onBack={() => setCurrentView(ViewState.HOME)}
                onAddToCart={addToCart}
                products={products}
            />
        );
      case ViewState.CART:
        if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
        return (
            <CartScreen
                user={user}
                cart={cart}
                onNavigate={navigate}
                onLogout={handleLogout}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
            />
        );
      case ViewState.CHECKOUT:
         if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
         return (
             <CheckoutScreen
                user={user}
                cart={cart}
                onNavigate={navigate}
                onLogout={handleLogout}
                onFinish={handleFinishOrder}
             />
         );
      case ViewState.ORDER_CONFIRMED:
          if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
          return (
              <OrderConfirmedScreen
                user={user}
                onNavigate={navigate}
                onLogout={handleLogout}
              />
          );
      case ViewState.CONTACTS:
          if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
          return <ContactsScreen user={user} onNavigate={navigate} onLogout={handleLogout} />;
      case ViewState.HISTORY:
          if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
          return <HistoryScreen user={user} history={history} onNavigate={navigate} onLogout={handleLogout} onRateProduct={handleRateProduct} />;
      case ViewState.ADMIN_ORDERS:
          if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
          return <AdminOrdersScreen user={user} orders={history} onNavigate={navigate} onLogout={handleLogout} onUpdateOrderStatus={updateOrderStatus} />;
      case ViewState.ADMIN_PRODUCTS_LIST:
          if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
          return <AdminProductsListScreen 
            user={user} 
            onNavigate={navigate} 
            onLogout={handleLogout} 
            products={products}
            offerMap={offerMap}
            onToggleOffer={(id, value) => setOfferMap(prev => ({...prev, [id]: value}))}
            onEditProduct={(product) => { setCurrentView(ViewState.ADMIN_PRODUCT_CREATE); setEditingProduct(product); }}
            onDeleteProduct={(id) => { 
              setProducts(prev => prev.filter(p => p.id !== id));
              setOfferMap(prev => { const n = { ...prev }; delete n[id]; return n; });
            }}
          />;
      case ViewState.ADMIN_PRODUCT_CREATE:
          if (!user) return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
          return <AdminProductCreateScreen 
            user={user} 
            onNavigate={navigate} 
            onLogout={handleLogout}
            productToEdit={editingProduct}
            onSaveProduct={(p) => {
              setProducts(prev => {
                const exists = prev.some(x => x.id === p.id);
                return exists ? prev.map(x => x.id === p.id ? p : x) : [...prev, p];
              });
              setEditingProduct(null);
            }}
          />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <>
      {renderView()}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Acesso administrador</h3>
            <p className="text-sm text-gray-600 mb-4">Digite o email do administrador</p>
            <input 
              type="email" 
              value={adminEmailInput}
              onChange={(e)=>setAdminEmailInput(e.target.value)}
              placeholder={ADMIN_EMAIL}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={()=>{ setShowAdminModal(false); setAdminEmailInput(''); setRequestedAdminView(null); }}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
              >
                Cancelar
              </button>
              <button 
                onClick={()=>{
                  if (adminEmailInput.trim().toLowerCase() === ADMIN_EMAIL) {
                    setAdminAuthorized(true);
                    setShowAdminModal(false);
                    setAdminEmailInput('');
                    setCurrentView(requestedAdminView || ViewState.ADMIN_ORDERS);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-[#9758a6] text-white font-bold"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
