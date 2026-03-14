import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { ViewState } from '../types';

interface RegisterScreenProps {
    onNavigate: (view: ViewState) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Brand */}
            <div className="w-full md:w-1/2 bg-[#111] relative flex items-center justify-center min-h-[200px] md:min-h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg 1.png')] bg-cover bg-center opacity-100"></div>
                <div className="z-10 relative">
                    <Logo />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/Padrão 1.png')] bg-repeat bg-center opacity-100"></div>
                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-[#9758a6] text-3xl font-bold mb-1 font-display tracking-wider">Criar conta</h2>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1 pl-1">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-10 md:h-12 px-4 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[#9758a6] focus:border-transparent outline-none shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1 pl-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-10 md:h-12 px-4 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[#9758a6] focus:border-transparent outline-none shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1 pl-1">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-10 md:h-12 px-4 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[#9758a6] focus:border-transparent outline-none shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1 pl-1">Confirmar senha</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-10 md:h-12 px-4 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[#9758a6] focus:border-transparent outline-none shadow-sm"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => onNavigate(ViewState.HOME)}
                            className="w-full h-12 bg-[#9758a6] hover:bg-[#7a4687] text-white font-bold rounded-lg transition-all shadow-[0_4px_0_rgb(86,32,105)] active:shadow-none active:translate-y-[4px] uppercase tracking-wide mt-6"
                        >
                            Confirmar Cadastro
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Já possui conta? <button onClick={() => onNavigate(ViewState.LOGIN)} className="text-gray-900 underline font-bold hover:text-[#9758a6]">Clique aqui.</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
