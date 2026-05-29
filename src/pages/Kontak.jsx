import React from 'react';
import { COMPANY_INFO } from '../constants/data';

const Kontak = () => {
  // LINK GOOGLE MAPS ASLI DARI ABANG
  const googleMapsUrl = "https://maps.app.goo.gl/9A39XUjVyQBS9UyH7";

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black mb-4 uppercase italic tracking-tight">
            Hubungi <span className="text-red-600">Kami</span>
          </h1>
          <p className="text-slate-500 font-medium">Silakan hubungi marketing kami atau kunjungi showroom kami di Kebumen</p>
        </div>

        {/* Layout Grid (WhatsApp & Instagram) */}
        <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
          
          {/* KARTU: WHATSAPP MARKETING */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full transition-transform duration-500 group-hover:scale-150 -z-0 opacity-50" />
            <div className="relative z-10">
              <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Fast Response
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-6 mb-2 uppercase italic tracking-tighter">Marketing Hotline</h2>
              <p className="text-slate-400 text-sm font-medium mb-6">Konsultasi pembelian, cek stok, dan kirim berkas lewat WhatsApp.</p>
              <p className="text-4xl font-black text-slate-900 tracking-tight mb-8">{COMPANY_INFO.phone}</p>
            </div>
            <a 
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/-/g, '').replace(/^0/, '62')}?text=Halo Marketing Jaya Sentosa, saya ingin tanya-tanya mengenai produk motor Honda.`} 
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center justify-center w-full py-5 bg-green-500 text-white text-center rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-green-100 hover:bg-green-600 transition-all hover:-translate-y-1"
            >
              Chat WhatsApp
            </a>
          </div>

          {/* KARTU: INSTAGRAM */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full transition-transform duration-500 group-hover:scale-150 -z-0 opacity-50" />
            <div className="relative z-10">
              <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Social Media
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-6 mb-2 uppercase italic tracking-tighter">Ikuti Instagram Kami</h2>
              <p className="text-slate-400 text-sm font-medium mb-6">Dapatkan info seru dan promo mingguan di Instagram kami.</p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center text-white font-bold">IG</div>
                <div>
                  <p className="text-sm font-black text-slate-900">@jayasentosagroup_</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Showroom Utama</p>
                </div>
              </div>
            </div>
            <a 
              href="https://www.instagram.com/jayasentosagroup_?igsh=ZmRkd291NGtrMXNx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center justify-center w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white text-center rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-purple-100 hover:opacity-90 transition-all hover:-translate-y-1"
            >
              Kunjungi Instagram
            </a>
          </div>
        </div>

        {/* SECTION MAP: SUDAH DIPERBAIKI LINKNYA */}
        <div className="bg-slate-900 text-white rounded-[40px] shadow-xl overflow-hidden grid lg:grid-cols-12">
          
          {/* Sisi Kiri: Peta Interaktif */}
          <div className="lg:col-span-7 h-[350px] lg:h-[450px] w-full bg-slate-800">
            <iframe 
              title="Lokasi Showroom Jaya Sentosa"
              // LINK IFRAME ASLI DARI ABANG
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.469816257774!2d109.4702916!3d-7.523623399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e654f0040f55ac5%3A0x124376b01506e91b!2sShowroom%20%26%20Bengkel%20Jaya%20Sentosa!5e0!3m2!1sid!2sid!4v1780022532768!5m2!1sid!2sid"
              className="w-full h-full border-0 opacity-90"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Sisi Kanan: Alamat & Tombol Buka di Maps */}
          <div className="lg:col-span-5 p-10 flex flex-col justify-between text-left relative">
            <div className="absolute top-0 right-0 p-8 text-slate-800 font-black text-6xl select-none pointer-events-none italic opacity-10 hidden lg:block">
              HONDA
            </div>
            
            <div className="relative z-10">
              <span className="text-[9px] font-black tracking-[0.2em] uppercase text-red-500 bg-red-950/50 px-3 py-1.5 rounded-md">
                Lokasi Showroom
              </span>
              <h3 className="text-2xl font-black mt-6 mb-4 uppercase italic tracking-tight">{COMPANY_INFO.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">
                {COMPANY_INFO.address}
              </p>
            </div>

            <div className="relative z-10">
              <div className="w-full h-[1px] bg-slate-800 my-6"></div>
              
              {/* Tombol yang mengarah ke link Maps abang */}
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-4 bg-red-600 hover:bg-red-700 text-white text-center rounded-xl font-black uppercase text-xs tracking-widest transition-all hover:-translate-y-1 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Buka di Google Maps
              </a>
              
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4 text-center lg:text-left italic">
                *Klik tombol di atas untuk navigasi otomatis.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Kontak;