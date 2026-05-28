import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const menu = [
    { name: 'Home', path: '/' },
    { name: 'Katalog', path: '/katalog' },
    { name: 'Syarat', path: '/syarat' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-red-600 tracking-tighter italic uppercase">
          Jaya Sentosa 
        </Link>
        <div className="hidden md:flex space-x-8">
          {menu.map(m => (
            <Link 
              key={m.path} 
              to={m.path} 
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${location.pathname === m.path ? 'text-red-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {m.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;