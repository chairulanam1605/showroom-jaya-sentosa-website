import React from 'react';
import { Link } from 'react-router-dom';
import { MOTORS, COMPANY_INFO } from '../../constants/data';
// IMPORT FOTO: Pastikan nama file di bawah ini sesuai dengan nama file foto di folder assets abang
import FotoHero from '../../assets/foto.jpeg'; 

const Home = () => {
  const featured = MOTORS.slice(0, 3); // Ambil 3 motor untuk ringkasan

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-black leading-tight mb-6 text-slate-900">
              GASKEUN <br/> <span className="text-red-600">MOTOR BARU.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-8">Showroom Jaya Sentosa: Dealer motor terpercaya di Kebumen.</p>
            <Link to="/katalog" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 hover:-translate-y-1">
              Cek Katalog Terbaru
            </Link>
          </div>
          
          {/* BAGIAN FOTO HERO: Mengganti kotak abu-abu dengan tag img */}
          <div className="relative aspect-video rounded-[40px] flex items-center justify-center overflow-hidden bg-white">
            <img 
              src={FotoHero} 
              alt="Hero Honda" 
              className="w-full h-full object-contain drop-shadow-2xl" 
            />
          </div>
        </div>
      </section>

      {/* Ringkasan Katalog */}
      <section className="py-16 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Unit Terpopuler</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {featured.map(m => (
              <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-lg">{m.type}</h3>
                <p className="text-red-600 font-bold mb-4">Rp {m.price}</p>
                <Link to="/katalog" className="text-sm font-bold text-slate-400 hover:text-red-600">Lihat Semua →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ringkasan Syarat & Kontak */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-900 text-white rounded-[40px]">
            <h3 className="text-2xl font-bold mb-4">Syarat Mudah</h3>
            <p className="text-slate-400 mb-6 italic">Cukup KTP & KK, proses survei cepat.</p>
            <Link to="/syarat" className="bg-white text-red-500 font-bold uppercase text-xs tracking-widest">Baca Selengkapnya</Link>
          </div>
          <div className="p-8 bg-red-600 text-white rounded-[40px]">
            <h3 className="text-2xl font-bold mb-4">Hubungi Kami</h3>
            <p className="mb-6 opacity-90">Ada pertanyaan? Sales kami siap membantu 24/7.</p>
            <Link to="/kontak" className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold text-sm">Hubungi Sales</Link>
          </div>
        </div>
      </section>

      {/* --- FITUR BARU: BANNER PROMOSI JSG WIFI --- */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-[40px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white italic mb-4 uppercase">
              Butuh Koneksi <span className="text-red-500">WiFi Cepat?</span>
            </h2>
            <p className="text-slate-300 md:text-lg max-w-xl">
              Selain motor impian, Jaya Sentosa Group juga menghadirkan layanan internet rumah tanpa batas. Nikmati koneksi stabil dengan penawaran terbaik dari JSG WiFi!
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <a 
              href="https://wifi-jaya-sentosa-website.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto justify-center px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 hover:-translate-y-1"
            >
              Kunjungi JSG WiFi →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;