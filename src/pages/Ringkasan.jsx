import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Ringkasan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mengambil data yang dikirim dari Checkout.jsx
  const { pembeli, motor } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);

  // Jika tidak ada data (misal pengunjung langsung mengetik URL /ringkasan), kembalikan ke beranda
  if (!pembeli || !motor) {
    return (
      <div className="pt-40 text-center text-slate-500 font-bold">
        Data pesanan tidak ditemukan. <br/>
        <button onClick={() => navigate('/')} className="mt-4 text-red-600 underline">Kembali ke Beranda</button>
      </div>
    );
  }

  // --- FUNGSI UNTUK MEMUNCULKAN MIDTRANS SNAP (VERSI VERCEL API) ---
  const handleBayarMidtrans = async () => {
    setIsProcessing(true);
    
    try {
      // 1. Membersihkan format angka (menghilangkan titik pada nominal DP)
      const nominalDP = parseInt(motor.dp.replace(/\./g, ''));

      // 2. Membuat Order ID unik dengan Prefix khusus agar tidak bentrok dengan aplikasimu yang lain
      const orderIdUnik = "JSG-ORD-" + Date.now();

      // 3. Menghubungi API Serverless Vercel yang sudah kita buat
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          order_id: orderIdUnik, 
          total: nominalDP,
          pembeli: pembeli,
          nama_motor: motor.type
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Gagal mendapatkan token dari server");
      }

      // 4. Memunculkan pop-up Midtrans menggunakan token asli dari Vercel
      window.snap.pay(data.token, {
        onSuccess: function(result){
          alert("Pembayaran Berhasil! Silakan unggah KTP/KK untuk finalisasi.");
        },
        onPending: function(result){
          alert("Menunggu pembayaran Anda diselesaikan!");
        },
        onError: function(result){
          alert("Pembayaran Gagal!");
        },
        onClose: function(){
          alert('Kamu menutup pop-up sebelum menyelesaikan pembayaran');
        }
      });
      
    } catch (error) {
      console.error("Error memunculkan Midtrans:", error);
      alert("Terjadi kesalahan saat memproses pembayaran. Pastikan koneksi internet stabil.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Fungsi Finalisasi (Upload Dokumen Manual)
  const handleFinalisasi = (e) => {
    e.preventDefault();
    alert("Pesanan berhasil dibuat! Admin Jaya Sentosa akan segera menghubungi Anda via WhatsApp.");
    navigate('/'); // Kembali ke Home
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: DATA PESANAN */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black mb-6 uppercase italic text-slate-900">Ringkasan <span className="text-red-600">Pesanan</span></h2>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-50 pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase">Unit Motor</span>
                <span className="text-sm font-black text-slate-900">{motor.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase">Nama Lengkap</span>
                <span className="text-sm font-black text-slate-900">{pembeli.nama}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase">NIK</span>
                <span className="text-sm font-black text-slate-900">{pembeli.nik}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase">WhatsApp</span>
                <span className="text-sm font-black text-slate-900">{pembeli.whatsapp}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase">Alamat</span>
                <span className="text-xs font-bold text-slate-900 text-right w-1/2 leading-relaxed">
                  {pembeli.alamatLengkap}, Kec. {pembeli.kecamatan}, {pembeli.kabupaten}, {pembeli.provinsi}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase">Tenor Dipilih</span>
                <span className="text-sm font-black text-red-600">
                  {pembeli.tenorAngsuran === "Cash" ? "Beli Tunai" : `${pembeli.tenorAngsuran} Bulan`}
                </span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-red-50 rounded-2xl flex items-center justify-between border border-red-100">
              <span className="text-sm font-black uppercase text-red-600 tracking-widest">Total DP Dibayar</span>
              <span className="text-2xl font-black text-slate-900">Rp {motor.dp}</span>
            </div>

            <button 
              onClick={handleBayarMidtrans}
              disabled={isProcessing}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-red-600 transition-all shadow-lg hover:-translate-y-1 mt-8 disabled:opacity-50"
            >
              {isProcessing ? 'Memuat Sistem Pembayaran...' : 'Bayar DP Sekarang (Otomatis)'}
            </button>
            <p className="text-[10px] text-center mt-3 font-bold text-slate-400">*Pembayaran diproses secara aman oleh Midtrans.</p>
          </div>
        </div>

        {/* KOLOM KANAN: FORM CADANGAN (UPLOAD) */}
        <div className="md:col-span-5">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="text-lg font-black mb-2 uppercase italic text-slate-900">Upload <span className="text-red-600">Dokumen</span></h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 leading-relaxed">
              *Silakan unggah KTP/KK untuk validasi. Gunakan kolom bukti transfer JIKA pembayaran Midtrans mengalami kendala.
            </p>

            <form onSubmit={handleFinalisasi} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Foto KTP / KK (Wajib)</label>
                <input type="file" required className="w-full text-xs font-medium text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer" />
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Bukti Transfer (Cadangan)</label>
                <input type="file" className="w-full text-xs font-medium text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer" />
              </div>

              <button type="submit" className="w-full py-4 bg-green-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-600 transition-all shadow-lg hover:-translate-y-1 mt-6">
                Proses Pesanan Sekarang
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ringkasan;