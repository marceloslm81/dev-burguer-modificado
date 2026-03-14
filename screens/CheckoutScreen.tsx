import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { User, ViewState, CartItem } from '../types';
import { CheckSquare, Square, QrCode } from 'lucide-react';

interface CheckoutScreenProps {
  user: User;
  cart: CartItem[];
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onFinish: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ user, cart, onNavigate, onLogout, onFinish }) => {
  const [paymentMethod, setPaymentMethod] = useState<'money' | 'card' | 'pix' | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    street: 'Lorem Ipsum, 65',
    neighborhood: 'Centro',
    cep: '77777000',
    city: 'São Paulo - SP'
  });
  const [editAddress, setEditAddress] = useState(address);
  
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
             <h1 className="font-display text-white text-4xl md:text-5xl drop-shadow-lg">Dev <span className="text-[#9758a6]">Burguer</span></h1>
          </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-10">
        
        {/* Title */}
        <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#78ab26] uppercase tracking-wide inline-block relative">
                Checkout - Finalizar pedido
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#78ab26] rounded-full"></span>
            </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Address and Payment */}
            <div className="flex-1 space-y-8">
                
                {/* Address Box */}
                <div>
                    <div className="bg-[#333] text-white rounded-t-xl px-6 py-4 font-medium">
                        Endereço entrega
                    </div>
                    <div className="bg-white rounded-b-xl shadow-lg p-6">
                        {isEditingAddress ? (
                          <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-gray-600 font-medium mb-1">Rua</label>
                                <input 
                                  type="text"
                                  value={editAddress.street}
                                  onChange={(e) => setEditAddress({ ...editAddress, street: e.target.value })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9758a6]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-gray-600 font-medium mb-1">Bairro</label>
                                <input 
                                  type="text"
                                  value={editAddress.neighborhood}
                                  onChange={(e) => setEditAddress({ ...editAddress, neighborhood: e.target.value })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9758a6]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-gray-600 font-medium mb-1">CEP</label>
                                <input 
                                  type="text"
                                  value={editAddress.cep}
                                  onChange={(e) => setEditAddress({ ...editAddress, cep: e.target.value })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9758a6]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-gray-600 font-medium mb-1">Cidade</label>
                                <input 
                                  type="text"
                                  value={editAddress.city}
                                  onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9758a6]"
                                />
                              </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                              <button 
                                onClick={() => { setAddress(editAddress); setIsEditingAddress(false); }}
                                className="px-4 py-2 rounded-lg bg-[#9758a6] text-white font-bold hover:bg-[#7a4687]"
                              >
                                Salvar
                              </button>
                              <button 
                                onClick={() => setIsEditingAddress(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-bold hover:bg-gray-300"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="space-y-2 text-gray-800 font-medium">
                                <p>Rua: {address.street}</p>
                                <p>Bairro: {address.neighborhood}</p>
                                <p>Cep: {address.cep}</p>
                                <p>Cidade: {address.city}</p>
                            </div>
                            <div className="mt-4">
                                <button 
                                  onClick={() => { setEditAddress(address); setIsEditingAddress(true); }}
                                  className="text-[#9758a6] text-sm font-bold underline"
                                >
                                    Trocar endereço de entrega
                                </button>
                            </div>
                          </div>
                        )}
                    </div>
                </div>

                {/* Payment Box */}
                <div>
                    <div className="bg-[#333] text-white rounded-t-xl px-6 py-4 font-medium">
                        Forma de pagamento
                    </div>
                    <div className="bg-white rounded-b-xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center min-h-[150px]">
                        <div className="space-y-4 w-full md:w-1/2">
                            <div 
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => setPaymentMethod('money')}
                            >
                                {paymentMethod === 'money' ? <CheckSquare className="text-[#78ab26]" /> : <Square className="text-gray-400 group-hover:text-gray-600" />}
                                <span className="font-bold text-gray-800">Dinheiro</span>
                            </div>
                            <div 
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => setPaymentMethod('card')}
                            >
                                {paymentMethod === 'card' ? <CheckSquare className="text-[#78ab26]" /> : <Square className="text-gray-400 group-hover:text-gray-600" />}
                                <span className="font-bold text-gray-800">Cartão Crédito/Débito</span>
                            </div>
                            <div 
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => setPaymentMethod('pix')}
                            >
                                {paymentMethod === 'pix' ? <CheckSquare className="text-[#78ab26]" /> : <Square className="text-gray-400 group-hover:text-gray-600" />}
                                <span className="font-bold text-gray-800">PIX</span>
                            </div>
                        </div>

                        {/* QR Code Placeholder for PIX */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-0">
                            {paymentMethod === 'pix' ? (
                                <div className="text-center">
                                    <QrCode size={100} className="mx-auto text-gray-800" />
                                    <p className="text-xs text-gray-500 mt-2">Escaneie o QR Code</p>
                                </div>
                            ) : (
                                <div className="h-[100px] w-[100px]"></div> // Spacer
                            )}
                        </div>
                    </div>
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
                        <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total</span>
                        <span className="text-xl font-bold text-gray-800">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <div className="pt-4 pb-2">
                        <button 
                            onClick={() => onNavigate(ViewState.CART)}
                            className="text-[#9758a6] font-bold text-sm underline w-full text-left"
                        >
                            Rever meu pedido
                        </button>
                    </div>
                    
                    <button 
                        onClick={onFinish}
                        disabled={!paymentMethod}
                        className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all uppercase tracking-wide
                            ${paymentMethod ? 'bg-[#9758a6] hover:bg-[#7a4687] active:translate-y-1' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Finalizar pedido
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
