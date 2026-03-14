import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <img src="/Logo 1.png" alt="Dev Burguer" className="w-[28rem] h-[28rem] md:w-[38rem] md:h-[38rem] object-contain" />
      </div>
     
    </div>
  );
};

export const LogoSmall: React.FC = () => {
  return (
    <img src="/Logo 1.png" alt="Dev Burguer" className="w-16 h-16 object-contain" />
  );
} 
