import React from 'react';
import { COMPANY_INFO } from '../constants/data';

const Kontak = () => {
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

        {/* Layout Grid (Kiri & Kanan Seimbang) */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          
          {/* KARTU UTAMA: WHATSAPP MARKETING */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
            {/* Dekorasi Background Halus */}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.79-4.14c1.65.98 3.51 1.497 5.41 1.499 5.347 0 9.7-.428 9.704-9.699.002-2.554-.992-4.956-2.798-6.766-1.807-1.81-4.21-2.806-6.764-2.808-5.352 0-9.704 4.349-9.707 9.7-.001 1.81.477 3.57 1.38 5.12l-.963 3.52 3.606-.946zm11.517-6.815c-.322-.16-.1.905-.333-.743-.1-.23-.524-.322-.846-.16-.322.16-1.354.502-2.578 1.594-.952.85-1.594 1.898-1.782 2.22-.188.32-.02.494.14.654.144.144.322.376.484.564.16.188.214.322.322.536.11.214.053.4-.027.563-.08-.16-.743-1.79-.101-2.115-.125-.26-.27-.45-.443-.6-.82-.73-1.636-1.04-1.78-.96-.4.22-.72.67-.72 1.21 0 .61.27 1.21.68 1.76.95 1.29 2.21 2.16 3.62 2.65.46.16.89.26 1.22.32.47.08.91.06 1.25-.01.38-.07 1.18-.48 1.35-.95.17-.46.17-.87.12-.95-.05-.08-.19-.13-.51-.29z"/>
              </svg>
              Chat WhatsApp
            </a>
          </div>

          {/* KARTU KEDUA: INFORMASI SOSIAL MEDIA INSTAGRAM */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
            {/* Dekorasi Background Halus */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full transition-transform duration-500 group-hover:scale-150 -z-0 opacity-50" />

            <div className="relative z-10">
              <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Social Media
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-6 mb-2 uppercase italic tracking-tighter">Ikuti Instagram Kami</h2>
              <p className="text-slate-400 text-sm font-medium mb-6">Dapatkan info seru, promo mingguan, dan foto penyerahan unit motor ke pembeli.</p>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  IG
                </div>
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

        {/* --- BAGIAN BARU: MAP LOKASI INTERAKTIF & ALAMAT --- */}
        <div className="mt-8 bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden grid lg:grid-cols-12">
          
          {/* Sisi Kiri: Peta Google Maps (Mengambil 7 dari 12 bagian grid) */}
          <div className="lg:col-span-7 h-80 lg:h-[450px] w-full relative bg-slate-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.4698648165017!2d109.4677166741162!3d-7.5236180742429495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e654f0040f55ac5%3A0x124376b01506e91b!2sShowroom%20%26%20Bengkel%20Jaya%20Sentosa!5e0!3m2!1sid!2sid!4v1780021400247!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Showroom Jaya Sentosa"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Sisi Kanan: Detail Teks Alamat (Mengambil 5 dari 12 bagian grid) */}
          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-slate-950 text-white text-left relative overflow-hidden">
            {/* Dekorasi merk samar di latar belakang */}
            <div className="absolute bottom-0 right-0 p-6 text-slate-900 font-black text-7xl select-none pointer-events-none font-sans italic uppercase tracking-tighter">
              HONDA
            </div>

            <div className="relative z-10">
              <span className="text-[9px] font-black tracking-[0.2em] uppercase text-red-500 bg-red-950/50 px-3 py-1.5 rounded-md">
                Lokasi Showroom
              </span>
              <h3 className="text-2xl font-black mt-6 mb-4 uppercase italic tracking-tight">
                {COMPANY_INFO.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">
                {COMPANY_INFO.address}
              </p>
            </div>

            {/* Tombol Akses Aplikasi Navigasi Google Maps */}
            <a 
              href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.4698648165017!2d109.4677166741162!3d-7.5236180742429495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e654f0040f55ac5%3A0x124376b01506e91b!2sShowroom%20%26%20Bengkel%20Jaya%20Sentosa!5e0!3m2!1sid!2sid!4v1780021400247!5m2!1sid!2sid"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center justify-center w-full py-4 bg-red-600 text-white text-center rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-red-950"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Buka di Google Maps
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Kontak;