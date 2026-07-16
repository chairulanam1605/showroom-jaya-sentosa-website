import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [motor, setMotor] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk menampung data inputan pelanggan
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    whatsapp: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    desa: '',
    alamatLengkap: '',
    tenorAngsuran: ''
  });

  // State untuk API Wilayah
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // Ambil data motor dari Firebase
  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "motors", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMotor(docSnap.data());
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  // Fetch daftar Provinsi saat halaman pertama kali dimuat
  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  // Handler Input Data Umum (Nama, NIK, Alamat Lengkap, dll)
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler khusus untuk API Wilayah agar data yang disimpan adalah NAMA daerah, bukan ID-nya
  const handleProvinsiChange = (e) => {
    const idProv = e.target.value;
    const nameProv = e.target.options[e.target.selectedIndex].text;
    setFormData({ ...formData, provinsi: nameProv, kabupaten: '', kecamatan: '', desa: '' });
    
    // Reset dropdown bawahnya
    setRegencies([]);
    setDistricts([]);
    setVillages([]);

    // Fetch Kabupaten berdasarkan ID Provinsi
    if(idProv) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${idProv}.json`)
        .then((res) => res.json())
        .then((data) => setRegencies(data));
    }
  };

  const handleKabupatenChange = (e) => {
    const idKab = e.target.value;
    const nameKab = e.target.options[e.target.selectedIndex].text;
    setFormData({ ...formData, kabupaten: nameKab, kecamatan: '', desa: '' });
    
    setDistricts([]);
    setVillages([]);

    if(idKab) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${idKab}.json`)
        .then((res) => res.json())
        .then((data) => setDistricts(data));
    }
  };

  const handleKecamatanChange = (e) => {
    const idKec = e.target.value;
    const nameKec = e.target.options[e.target.selectedIndex].text;
    setFormData({ ...formData, kecamatan: nameKec, desa: '' });
    
    setVillages([]);

    if(idKec) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${idKec}.json`)
        .then((res) => res.json())
        .then((data) => setVillages(data));
    }
  };

  const handleDesaChange = (e) => {
    const nameDesa = e.target.options[e.target.selectedIndex].text;
    setFormData({ ...formData, desa: nameDesa });
  };

  // Lanjut ke tahap berikutnya
  // Lanjut ke tahap berikutnya
  const handleLanjut = (e) => {
    e.preventDefault();
    // Membawa formData dan data motor ke halaman Ringkasan
    navigate('/ringkasan', { state: { pembeli: formData, motor: motor } });
  };

  if (loading) return <div className="pt-40 text-center text-slate-500 font-bold animate-pulse">Menyiapkan form pembelian...</div>;
  if (!motor) return <div className="pt-40 text-center font-bold text-red-600">Motor tidak ditemukan.</div>;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 text-sm font-bold text-slate-400 hover:text-red-600">
          ← Kembali
        </button>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <h1 className="text-3xl font-black mb-2 uppercase italic">Form Pembelian</h1>
          <p className="text-slate-500 mb-8">Unit Terpilih: <span className="font-bold text-red-600">{motor.type}</span></p>

          <form onSubmit={handleLanjut} className="space-y-6">
            {/* Input Biodata */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Nama Lengkap (Sesuai KTP)</label>
                <input type="text" name="nama" required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">NIK KTP</label>
                <input type="number" name="nik" required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Nomor WhatsApp Aktif</label>
              <input type="number" name="whatsapp" required placeholder="Contoh: 08123456789" onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none" />
            </div>

            {/* Area Dropdown Alamat dengan API Wilayah */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Alamat Pengiriman</h3>
              <div className="grid md:grid-cols-2 gap-4">
                
                <select required onChange={handleProvinsiChange} className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none cursor-pointer">
                  <option value="">-- Pilih Provinsi --</option>
                  {provinces.map(prov => (
                    <option key={prov.id} value={prov.id}>{prov.name}</option>
                  ))}
                </select>

                <select required onChange={handleKabupatenChange} disabled={regencies.length === 0} className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none cursor-pointer disabled:opacity-50">
                  <option value="">-- Pilih Kabupaten/Kota --</option>
                  {regencies.map(kab => (
                    <option key={kab.id} value={kab.id}>{kab.name}</option>
                  ))}
                </select>

                <select required onChange={handleKecamatanChange} disabled={districts.length === 0} className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none cursor-pointer disabled:opacity-50">
                  <option value="">-- Pilih Kecamatan --</option>
                  {districts.map(kec => (
                    <option key={kec.id} value={kec.id}>{kec.name}</option>
                  ))}
                </select>

                <select required onChange={handleDesaChange} disabled={villages.length === 0} className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none cursor-pointer disabled:opacity-50">
                  <option value="">-- Pilih Desa/Kelurahan --</option>
                  {villages.map(desa => (
                    <option key={desa.id} value={desa.id}>{desa.name}</option>
                  ))}
                </select>
              </div>

              {/* Input manual untuk jalan, RT/RW, dll */}
              <textarea name="alamatLengkap" required placeholder="Alamat lengkap (Nama jalan, RT/RW, Patokan)" rows="3" onChange={handleInputChange} className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none mt-4"></textarea>
            </div>

            {/* Pilihan Angsuran */}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Pilih Tenor Angsuran</label>
              <select name="tenorAngsuran" required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none cursor-pointer">
                <option value="">-- Pilih Angsuran --</option>
                {motor.installments && Object.entries(motor.installments).map(([bln, rp]) => (
                  <option key={bln} value={bln}>
                    {bln} Bulan - Rp {rp} / bulan
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-red-600 transition-all shadow-lg hover:-translate-y-1 mt-8">
              Lanjut Proses Pembayaran
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;