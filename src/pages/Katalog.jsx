import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Katalog = () => {
  const [motors, setMotors] = useState([]);
  const [filteredMotors, setFilteredMotors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Filter, Sortir, dan Search
  const [category, setCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState(''); // State baru untuk Search

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "motors"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMotors(data);
        setFilteredMotors(data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data motor:", error);
        setLoading(false);
      }
    };
    fetchMotors();
  }, []);

  // Logika Filtering, Searching, dan Sorting
  useEffect(() => {
    let result = [...motors];

    // 1. Filter Berdasarkan Pencarian Teks (Search)
    if (searchTerm !== '') {
      result = result.filter(motor => 
        motor.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter Kategori
    if (category !== 'Semua') {
      result = result.filter(motor => motor.cat?.toLowerCase() === category.toLowerCase());
    }

    // 3. Sortir
    if (sortBy === 'price-asc') {
      result.sort((a, b) => parseFloat(a.price.replace(/\./g, '')) - parseFloat(b.price.replace(/\./g, '')));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => parseFloat(b.price.replace(/\./g, '')) - parseFloat(a.price.replace(/\./g, '')));
    } else if (sortBy === 'alpha-asc') {
      result.sort((a, b) => a.type.localeCompare(b.type));
    }

    setFilteredMotors(result);
  }, [category, sortBy, searchTerm, motors]);

  if (loading) {
    return (
      <div className="py-40 text-center">
        <p className="text-xl font-bold animate-pulse text-slate-400 font-sans uppercase tracking-widest">Memuat Katalog...</p>
      </div>
    );
  }

  return (
    <section id="katalog" className="py-24 bg-slate-50 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 tracking-tight italic uppercase">
            Katalog <span className="text-red-600">Motor Honda</span>
          </h2>
          <p className="text-slate-500 font-medium">Temukan motor impian Anda dengan harga terbaik di Kebumen</p>
        </div>

        {/* Toolbar Filter, Search & Sortir */}
        <div className="mb-12 flex flex-col gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex flex-wrap gap-4 items-end">
            
            {/* Input Search Baru */}
            <div className="flex flex-col flex-1 min-w-[280px]">
              <span className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Cari Tipe Motor</span>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Cari misal: Vario, Beat, PCX..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl px-12 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Pilih Kategori</span>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none min-w-[160px]"
              >
                <option value="Semua">Semua Jenis</option>
                <option value="MATIC">Matic</option>
                <option value="BEBEK">Bebek</option>
                <option value="SPORT">Sport</option>
              </select>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Urutkan</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none min-w-[180px]"
              >
                <option value="default">Terbaru</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="alpha-asc">Nama (A-Z)</option>
              </select>
            </div>
          </div>
          
          <div className="border-t border-slate-50 pt-4 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 tracking-tight italic">
              *Harga On The Road (OTR) wilayah Kebumen dan sekitarnya
            </span>
            <span className="text-sm font-black text-slate-400 tracking-tight">
              Menampilkan <span className="text-red-600">{filteredMotors.length}</span> Unit
            </span>
          </div>
        </div>

        {/* Grid Katalog */}
        {filteredMotors.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMotors.map((motor) => (
              <div key={motor.id} className="bg-white p-6 rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all group relative overflow-hidden">
                {/* Gambar Motor */}
                <div className="w-full aspect-square bg-slate-50 rounded-[32px] mb-6 flex items-center justify-center overflow-hidden">
                  {motor.image ? (
                    <img src={motor.image} alt={motor.type} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="text-slate-300 italic font-bold uppercase text-[10px]">Foto Belum Tersedia</span>
                  )}
                </div>

                {/* Badge Kategori */}
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                  {motor.cat}
                </span>

                {/* Nama Unit */}
                <h3 className="text-xl font-black mt-4 mb-4 uppercase italic tracking-tighter text-slate-900">{motor.type}</h3>
                
                {/* Harga & Tombol Detail */}
                <div className="flex items-end justify-between border-t border-slate-50 pt-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Harga OTR</p>
                    <p className="text-xl font-black text-red-600">Rp {motor.price}</p>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/product/${motor.id}`)}
                    className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-600 transition-all shadow-lg hover:-translate-y-1"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Tampilan Jika Motor Tidak Ditemukan */
          <div className="py-32 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <p className="text-slate-400 font-black italic uppercase tracking-widest">Motor tidak ditemukan</p>
            <p className="text-slate-300 text-xs mt-2 font-medium">Coba gunakan kata kunci atau kategori lain</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Katalog;