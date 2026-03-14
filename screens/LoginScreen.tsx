import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { ViewState } from '../types';

interface LoginScreenProps {
  onLogin: (email: string) => void;
  onNavigate: (view: ViewState) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Brand */}
      <div className="w-full md:w-1/2 bg-[#111] relative flex items-center justify-center min-h-[300px] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg 1.png')] bg-cover bg-center opacity-100"></div>
        <div className="z-10 relative">
             <Logo />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Padrão 1.png')] bg-repeat bg-center opacity-100"></div>
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
              <h2 className="text-gray-900 text-2xl font-medium mb-1">Olá, seja bem vindo ao <span className="text-[#9758a6] font-bold">Dev Burguer!</span></h2>
              <p className="text-gray-500">Acesse com seu <span className="text-[#9758a6] font-medium">Login e senha.</span></p>
          </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2 pl-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[#9758a6] focus:border-transparent outline-none shadow-sm"
                        placeholder="Ex: exemplo@email.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2 pl-1">Senha</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[#9758a6] focus:border-transparent outline-none shadow-sm"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full h-12 bg-[#9758a6] hover:bg-[#7a4687] text-white font-bold rounded-lg transition-all shadow-[0_4px_0_rgb(86,32,105)] active:shadow-none active:translate-y-[4px] uppercase tracking-wide mt-4"
                >
                    Entrar
                </button>
            </form>
            
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                    Não possui conta? <button onClick={() => onNavigate(ViewState.REGISTER)} className="text-gray-900 underline font-bold hover:text-[#9758a6]">Clique aqui.</button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
