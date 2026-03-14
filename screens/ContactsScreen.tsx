import React from 'react';
import { Navbar } from '../components/Navbar';
import { User, ViewState } from '../types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactsScreenProps {
  user: User;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export const ContactsScreen: React.FC<ContactsScreenProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 pattern-bg flex flex-col font-sans">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="relative h-[200px] w-full bg-[#111] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-100 bg-[url('/fundo.jpg')] bg-cover bg-center"></div>
          <div className="z-10 text-center">
             <h1 className="font-display text-white text-4xl md:text-5xl drop-shadow-lg">Dev <span className="text-[#9758a6]">Burguer</span></h1>
          </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#78ab26] uppercase tracking-wide inline-block relative">
                Contatos
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#9758a6] rounded-full"></span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#9758a6] mb-6">Informações de contato</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <MapPin className="text-[#78ab26] shrink-0" />
                        <div>
                            <p className="font-bold text-gray-800">Endereço</p>
                            <p className="text-gray-600">Rua da Programação, 404 - Centro<br/>São Paulo - SP</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="text-[#78ab26] shrink-0" />
                        <div>
                            <p className="font-bold text-gray-800">Telefone</p>
                            <p className="text-gray-600">(11) 99999-8888</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Mail className="text-[#78ab26] shrink-0" />
                        <div>
                            <p className="font-bold text-gray-800">Email</p>
                            <p className="text-gray-600">contato@devburguer.com.br</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Clock className="text-[#78ab26] shrink-0" />
                        <div>
                            <p className="font-bold text-gray-800">Horário de funcionamento</p>
                            <p className="text-gray-600">Terça a Domingo: 18h às 23h</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-[400px]">
                {/* Mock Map */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
                     <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-50 grayscale" alt="Map" />
                     <div className="absolute z-10">
                        <MapPin size={48} className="text-[#9758a6] drop-shadow-xl" fill="currentColor" />
                     </div>
                </div>
            </div>
        </div>
      </div>
      
      <div className="bg-[#5c2e6b] text-white py-4 text-center text-xs font-light tracking-wider mt-auto">
         desenvolvido por Dvelloper - 2025 - Todos os direitos reservados
      </div>
    </div>
  );
};
