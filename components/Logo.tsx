
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <Link to="/" className={`flex items-center justify-center bg-black rounded-full border-2 border-white overflow-hidden shadow-lg hover:scale-105 transition-transform ${className}`}>
      <span className="text-white font-serif font-bold tracking-tighter leading-none text-center">
        <div className="text-sm">R</div>
        <div className="text-lg -mt-1 ml-1">X</div>
        <div className="text-sm -mt-1 ml-2">S</div>
      </span>
    </Link>
  );
};

export default Logo;
