import React from 'react';
import { COMPANY_INFO } from '../constants/data';

const Syarat = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-12 text-center text-slate-900 italic uppercase">
          Cara & <span className="text-red-600">Syarat Pembelian</span>
        </h1>
        
        <div className="space-y-12">
          {/* Section 1: Persyaratan */}
          <section>
            <h2 className="text-xl font-black mb-6 text-red-600 flex items-center gap-2 uppercase italic tracking-wider">
              <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-sm italic">01</span>
              Persyaratan Dokumen
            </h2>
            <div className="grid gap-4">
              {COMPANY_INFO.requirements.map((req, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700">
                  {req}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Alur Proses (Bahasa Langkah-Langkah) */}
          <section className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl shadow-slate-200">
            <h2 className="text-2xl font-black mb-8 italic uppercase tracking-tighter">
              Langkah <span className="text-red-500">Proses Pembelian</span>
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Pilih Unit & Tenor",
                  desc: "Pilih unit motor yang diinginkan pada katalog, lalu tentukan pilihan angsuran serta besaran uang muka (DP) sesuai kemampuan Anda."
                },
                {
                  title: "Siapkan Dokumen",
                  desc: "Siapkan dokumen persyaratan berupa KTP dan Kartu Keluarga (KK) untuk keperluan proses administrasi serta pengajuan pembiayaan."
                },
                {
                  title: "Lakukan Pembayaran DP",
                  desc: "Lakukan pembayaran uang muka melalui transfer bank sesuai dengan nominal yang telah disepakati bersama admin."
                },
                {
                  title: "Kirim Bukti Transfer",
                  desc: "Kirimkan bukti pembayaran yang sah kepada admin melalui WhatsApp sebagai tanda konfirmasi transaksi telah dilakukan."
                },
                {
                  title: "Verifikasi & Proses Unit",
                  desc: "Tunggu proses verifikasi pembayaran dan dokumen selesai. Setelah tervalidasi, motor akan segera diproses ke tahap pengiriman."
                },
                {
                  title: "Pembayaran Angsuran",
                  desc: "Lakukan pembayaran angsuran setiap bulan tepat waktu sesuai dengan jadwal jatuh tempo yang telah ditentukan."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-black text-xs italic">
                      {i + 1}
                    </span>
                    {i !== 5 && <div className="w-[2px] h-full bg-slate-800 mt-2"></div>}
                  </div>
                  <div className="pb-2">
                    <h4 className="font-black uppercase text-[11px] tracking-[0.2em] text-red-500 mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info Tambahan */}
          <div className="p-8 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 text-center">
            <p className="text-sm font-bold text-slate-500 italic">
              "Ikuti langkah di atas untuk mempercepat proses kepemilikan motor Honda impian Anda."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syarat;