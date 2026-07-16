import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig'; 
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const DataMotor = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // State Utama Data Motor
  const [motors, setMotors] = useState([]);
  const [loadingMotors, setLoadingMotors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // State Form yang sudah disesuaikan dengan Struktur Map di Firestore
  const [motorForm, setMotorForm] = useState({ 
    type: '', 
    cat: '', 
    price: '', 
    dp: '', 
    image: '', 
    installments: {
      '11': '',
      '23': '',
      '29': '',
      '35': '',
      '47': '',
    }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchMotors = async () => {
    setLoadingMotors(true);
    try {
      const snap = await getDocs(collection(db, "motors"));
      const data = [];
      snap.forEach(d => data.push({ id: d.id, ...d.data() }));
      setMotors(data);
    } catch (e) { 
      console.error(e); 
    } finally { 
      setLoadingMotors(false); 
    }
  };

  useEffect(() => { 
    if (user) fetchMotors(); 
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try { 
      await signInWithEmailAndPassword(auth, email, password); 
    } catch (err) { 
      alert('Login gagal! Periksa email dan password admin Anda.'); 
    }
  };

  const handleLogout = async () => { 
    if (window.confirm("Yakin ingin keluar dari panel admin?")) await signOut(auth); 
  };

  // Fungsi membuka Modal & memetakan data Map dari Firestore ke Form Edit
  const openModal = (m = null) => {
    if (m) { 
      setEditId(m.id); 
      setMotorForm({
        type: m.type || '',
        cat: m.cat || '',
        price: m.price || '',
        dp: m.dp || '',
        image: m.image || '',
        // Mengambil isi Map installments dari Firestore, jika kosong diberi string kosong
        installments: {
          '11': m.installments?.['11'] || '',
          '23': m.installments?.['23'] || '',
          '29': m.installments?.['29'] || '',
          '35': m.installments?.['35'] || '',
          '47': m.installments?.['47'] || ''
        }
      }); 
    } else { 
      setEditId(null); 
      setMotorForm({ 
        type: '', 
        cat: '', 
        price: '', 
        dp: '', 
        image: '', 
        installments: { '11': '', '23': '', '29': '', '35': '', '47': '' } 
      }); 
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "motors", editId), motorForm);
        alert("Data motor berhasil diperbarui di Firestore!");
      } else {
        await addDoc(collection(db, "motors"), motorForm);
        alert("Motor baru berhasil ditambahkan ke katalog!");
      }
      setShowModal(false);
      fetchMotors();
    } catch (err) { 
      console.error(err);
      alert("Gagal menyimpan data motor."); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("PERINGATAN! Hapus motor ini secara permanen dari database?")) return;
    try { 
      await deleteDoc(doc(db, "motors", id)); 
      fetchMotors(); 
    } catch(e) { 
      alert("Gagal menghapus."); 
    }
  };

  if (isAuthChecking) return <div className="pt-40 text-center font-bold text-slate-500 animate-pulse">Memeriksa Keamanan Area Admin...</div>;
  
  if (!user) {
    return (
      <div className="pt-32 pb-24 flex justify-center min-h-screen bg-slate-900">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] w-full max-w-md h-fit mt-10 border-4 border-red-600 shadow-2xl">
          <h1 className="text-3xl font-black uppercase text-center italic mb-8">Admin <span className="text-red-600">Portal</span></h1>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 rounded-xl px-4 py-3 mb-4 outline-none font-bold" placeholder="Email Admin" />
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 rounded-xl px-4 py-3 mb-6 outline-none font-bold" placeholder="Password" />
          <button type="submit" className="w-full py-4 bg-red-600 text-white font-black uppercase text-sm rounded-xl hover:bg-red-700 transition-all">Masuk</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase italic text-slate-900">Data <span className="text-red-600">Motor</span></h1>
            <p className="text-xs font-bold text-slate-400">Atur harga, DP, dan tenor cicilan unit motor</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => openModal()} className="px-6 py-3 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all">+ Tambah Motor</button>
            <button onClick={handleLogout} className="px-6 py-3 bg-red-100 text-red-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-200 transition-all">Keluar</button>
          </div>
        </div>

        {/* TAB NAVIGASI */}
        <div className="flex gap-6 mb-8 border-b border-slate-200">
          <Link to="/admin-jsg/order" className="pb-4 text-xs font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-600">
            Data Pesanan Masuk
          </Link>
          <Link to="/admin-jsg/motor" className="pb-4 text-xs font-black uppercase tracking-widest transition-all text-red-600 border-b-2 border-red-600">
            Data Unit Motor
          </Link>
        </div>

        {/* TABEL MOTOR */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          {loadingMotors ? (
            <div className="p-10 text-center font-bold text-slate-400 animate-pulse">Mengambil katalog dari Firebase...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-100">
                  <th className="p-6">Gambar</th>
                  <th className="p-6">Tipe</th>
                  <th className="p-6">Harga & DP</th>
                  <th className="p-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {motors.map(m => (
                  <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-6"><img src={m.image} alt={m.type} className="w-16 h-16 object-contain bg-white rounded-xl border p-1" /></td>
                    <td className="p-6 font-black text-slate-900">{m.type} <br/><span className="text-[10px] uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold inline-block mt-1">{m.cat}</span></td>
                    <td className="p-6 font-bold text-slate-800">Rp {m.price} <br/><span className="text-red-600 text-xs font-black">DP: Rp {m.dp}</span></td>
                    <td className="p-6">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => openModal(m)} className="px-4 py-2 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg hover:bg-blue-200">Edit</button>
                        <button onClick={() => handleDelete(m.id)} className="px-4 py-2 bg-red-100 text-red-700 text-[10px] font-black rounded-lg hover:bg-red-200">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL EDIT & TAMBAH MOTOR */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] p-8 shadow-2xl relative border border-slate-100">
            <h2 className="text-2xl font-black uppercase italic mb-6 border-b border-slate-100 pb-4">
              {editId ? <span>Edit <span className="text-blue-600">Data Motor</span></span> : <span>Tambah <span className="text-red-600">Motor Baru</span></span>}
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Nama / Tipe Motor</label>
                  <input type="text" value={motorForm.type} onChange={e=>setMotorForm({...motorForm, type: e.target.value})} className="w-full bg-slate-50 border border-slate-200 font-bold text-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" placeholder="Cth: Scoopy Prestige" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Kategori</label>
                  <select value={motorForm.cat} onChange={e=>setMotorForm({...motorForm, cat: e.target.value})} className="w-full bg-slate-50 border border-slate-200 font-bold text-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" required>
                    <option value="">Pilih Kategori</option>
                    <option value="matic">Matic</option>
                    <option value="sport">Sport</option>
                    <option value="bebek">Bebek</option>
                    <option value="ev">EV / Listrik</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Harga OTR (String)</label>
                  <input type="text" value={motorForm.price} onChange={e=>setMotorForm({...motorForm, price: e.target.value})} className="w-full bg-slate-50 border border-slate-200 font-bold text-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" placeholder="Cth: 22.450.000" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Minimal DP (String)</label>
                  <input type="text" value={motorForm.dp} onChange={e=>setMotorForm({...motorForm, dp: e.target.value})} className="w-full bg-slate-50 border border-slate-200 font-bold text-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" placeholder="Cth: 2.100.000" required />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Link URL Gambar Unit</label>
                  <input type="url" value={motorForm.image} onChange={e=>setMotorForm({...motorForm, image: e.target.value})} className="w-full bg-slate-50 border border-slate-200 font-bold text-slate-500 p-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" placeholder="https://..." required />
                </div>

                {/* --- SEKSI BARU: DI-BREAKDOWN MENJADI FORM FIELD MAP FIRESTORE --- */}
                <div className="col-span-2 border-t border-slate-100 pt-5 mt-2">
                  <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest mb-4 italic text-red-600">Simulasi Angsuran (Rp / Bulan)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['11', '23', '29', '35', '47'].map((tenor) => (
                      <div key={tenor} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">{tenor} Bulan</label>
                        <input 
                          type="text" 
                          value={motorForm.installments[tenor] || ''} 
                          onChange={(e) => setMotorForm({
                            ...motorForm,
                            installments: {
                              ...motorForm.installments,
                              [tenor]: e.target.value
                            }
                          })} 
                          className="w-full bg-white border border-slate-200 font-black text-slate-900 px-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-red-600 outline-none" 
                          placeholder="Cth: 1.250.000" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-6 mt-4 border-t border-slate-100">
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-lg">
                  {editId ? 'Simpan Perubahan' : 'Tambah Motor Baru'}
                </button>
                <button type="button" onClick={()=>setShowModal(false)} className="w-full bg-slate-100 text-slate-600 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataMotor;