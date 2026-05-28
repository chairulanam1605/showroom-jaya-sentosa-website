import React from 'react';
import { COMPANY_INFO } from '../constants/data';

const Kontak = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black mb-4">Hubungi Kami</h1>
        <p className="text-slate-500 mb-16">Silakan hubungi marketing kami melalui kontak di bawah ini.</p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-widest mb-4">Marketing Hotline</h2>
            <p className="text-3xl font-black text-slate-900 mb-6">{COMPANY_INFO.phone}</p>
            <a href={`https://wa.me/${COMPANY_INFO.phone.replace(/-/g, '')}`} className="inline-block w-full py-4 bg-green-500 text-white text-center rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all">
              Chat WhatsApp
            </a>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-widest mb-4">Sosial Media</h2>
            <div className="space-y-4">
              {['Instagram', 'Facebook', 'TikTok'].map(sm => (
                <button key={sm} className="w-full flex justify-between items-center p-4 bg-slate-50 rounded-xl font-bold hover:bg-slate-100 transition-all">
                  <span>{sm}</span>
                  <span className="text-xs text-slate-400">@jayalawasentosa_</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-white rounded-[40px] shadow-sm border border-slate-100 text-left">
          <h2 className="text-sm font-black text-red-600 uppercase tracking-widest mb-2">Alamat Showroom</h2>
          <p className="text-slate-600 leading-relaxed">{COMPANY_INFO.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Kontak;