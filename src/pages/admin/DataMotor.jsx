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

  const [motors, setMotors] = useState([]);
  const [loadingMotors, setLoadingMotors] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [motorForm, setMotorForm] = useState({ type: '', cat: '', price: '', dp: '', image: '', installments: '' });

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
    } catch (e) { console.error(e); } finally { setLoadingMotors(false); }
  };

  useEffect(() => { if (user) fetchMotors(); }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, email, password); } 
    catch (err) { alert('Login gagal!'); }
  };

  const handleLogout = async () => { if (window.confirm("Keluar?")) await signOut(auth); };

  const openModal = (m = null) => {
    if (m) { setEditId(m.id); setMotorForm(m); } 
    else { setEditId(null); setMotorForm({ type: '', cat: '', price: '', dp: '', image: '', installments: '' }); }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editId) await updateDoc(doc(db, "motors", editId), motorForm);
      else await addDoc(collection(db, "motors"), motorForm);
      alert("Data motor disimpan!");
      setShowModal(false);
      fetchMotors();
    } catch (err) { alert("Gagal simpan motor."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus motor ini permanen?")) return;
    try { await deleteDoc(doc(db, "motors", id)); fetchMotors(); } catch(e) { alert("Gagal hapus."); }
  };

  if (isAuthChecking) return <div className="pt-40 text-center font-bold">Memeriksa Keamanan...</div>;
  if (!user) {
    return (
      <div className="pt-32 pb-24 flex justify-center min-h-screen bg-slate-900">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] w-full max-w-md h-fit mt-10">
          <h1 className="text-3xl font-black uppercase text-center mb-8">Admin Portal</h1>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 rounded-xl px-4 py-3 mb-4" placeholder="Email" />
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 rounded-xl px-4 py-3 mb-6" placeholder="Password" />
          <button type="submit" className="w-full py-4 bg-red-600 text-white font-black rounded-xl">Masuk</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-4xl font-black uppercase italic text-slate-900">Data <span className="text-red-600">Motor</span></h1>
          <div className="flex gap-3">
            <button onClick={() => openModal()} className="px-6 py-3 bg-red-600 text-white text-xs font-bold rounded-xl">+ Tambah Motor</button>
            <button onClick={handleLogout} className="px-6 py-3 bg-red-100 text-red-600 text-xs font-bold rounded-xl">Keluar</button>
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
            <div className="p-10 text-center font-bold">Mengambil katalog...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead><tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400"><th className="p-6">Gambar</th><th className="p-6">Tipe</th><th className="p-6">Harga & DP</th><th className="p-6">Aksi</th></tr></thead>
              <tbody className="text-sm">
                {motors.map(m => (
                  <tr key={m.id} className="border-b border-slate-50">
                    <td className="p-6"><img src={m.image} alt={m.type} className="w-16 h-16 object-contain bg-white rounded-xl border p-1" /></td>
                    <td className="p-6 font-black">{m.type} <br/><span className="text-xs text-slate-400">{m.cat}</span></td>
                    <td className="p-6 font-bold">Rp {m.price} <br/><span className="text-red-600">DP: Rp {m.dp}</span></td>
                    <td className="p-6">
                      <button onClick={() => openModal(m)} className="px-4 py-2 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg mr-2">Edit</button>
                      <button onClick={() => handleDelete(m.id)} className="px-4 py-2 bg-red-100 text-red-700 text-[10px] font-black rounded-lg">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL MOTOR */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[32px] p-8">
            <h2 className="text-2xl font-black uppercase mb-6">{editId ? 'Edit Motor' : 'Tambah Motor'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input type="text" value={motorForm.type} onChange={e=>setMotorForm({...motorForm, type: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Nama Motor" required />
              <input type="text" value={motorForm.cat} onChange={e=>setMotorForm({...motorForm, cat: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Kategori (matic/sport...)" required />
              <input type="text" value={motorForm.price} onChange={e=>setMotorForm({...motorForm, price: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Harga OTR" required />
              <input type="text" value={motorForm.dp} onChange={e=>setMotorForm({...motorForm, dp: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Minimal DP" required />
              <input type="url" value={motorForm.image} onChange={e=>setMotorForm({...motorForm, image: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Link Gambar" required />
              <div className="flex gap-4 pt-4">
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black">Simpan</button>
                <button type="button" onClick={()=>setShowModal(false)} className="w-full bg-slate-200 py-4 rounded-xl font-black">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DataMotor;