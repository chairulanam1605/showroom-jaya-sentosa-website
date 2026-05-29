import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State untuk buka-tutup menu di HP

  const menu = [
    { name: 'Home', path: '/' },
    { name: 'Katalog', path: '/katalog' },
    { name: 'Syarat', path: '/syarat' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 min-h-20 flex flex-col justify-center transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 w-full h-20 flex justify-between items-center">
        {/* Logo / Nama Showroom */}
        <Link to="/" className="text-2xl font-black text-red-600 tracking-tighter italic uppercase">
          Jaya Sentosa 
        </Link>

        {/* --- MENU UNTUK DESTOP (Layar Besar) --- */}
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

        {/* --- TOMBOL HAMBURGER (Hanya muncul di HP/Layar Kecil) --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-red-600 focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            // Icon Silang (X) saat menu terbuka
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Icon Hamburger (Garis 3) saat menu tertutup
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* --- MENU DROPDOWN MOBILE (Hanya muncul di HP saat diclick) --- */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 border-t border-slate-50 bg-white' : 'max-h-0'}`}>
        <div className="px-6 py-4 flex flex-col space-y-4">
          {menu.map(m => (
            <Link 
              key={m.path} 
              to={m.path} 
              onClick={() => setIsOpen(false)} // Otomatis tutup menu setelah link diklik
              className={`text-[11px] font-black uppercase tracking-[0.2em] py-2 transition-colors ${location.pathname === m.path ? 'text-red-600 pl-2 border-l-2 border-red-600' : 'text-slate-500 hover:text-slate-900'}`}
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