import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig'; 
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const DataOrder = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [detailOrder, setDetailOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData = [];
      querySnapshot.forEach((doc) => ordersData.push({ id: doc.id, ...doc.data() }));
      ordersData.sort((a, b) => (b.tanggal_pesanan?.seconds || 0) - (a.tanggal_pesanan?.seconds || 0));
      setOrders(ordersData);
    } catch (error) {
      console.error("Gagal mengambil pesanan:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError('Email atau Password salah!');
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Yakin ingin keluar?")) await signOut(auth);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Ubah status ke: ${newStatus}?`)) return;
    try {
      await updateDoc(doc(db, "orders", id), { status_pesanan: newStatus });
      alert(`Status diubah jadi ${newStatus}!`);
      if (detailOrder && detailOrder.id === id) setDetailOrder({ ...detailOrder, status_pesanan: newStatus });
      fetchOrders(); 
    } catch (error) {
      alert("Gagal update status.");
    }
  };

  const handleSaveEditOrder = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "orders", editOrder.id), { pembeli: editFormData });
      alert("Data pelanggan diperbarui!");
      setEditOrder(null);
      fetchOrders();
    } catch (error) {
      alert("Gagal simpan pembaruan.");
    }
  };

  const getWhatsAppLink = (order) => {
    const wa = order.pembeli.whatsapp;
    let msg = order.status_pesanan === "Completed" 
      ? `Halo ${order.pembeli.nama}, pesanan ${order.motor.type} Anda berstatus COMPLETED. Semua valid, tunggu pengiriman ya!`
      : order.status_pesanan === "Not Completed"
      ? `Halo ${order.pembeli.nama}, pesanan ${order.motor.type} Anda NOT COMPLETED. Ada berkas kurang: ...`
      : `Halo ${order.pembeli.nama}, kami sedang memproses pesanan ${order.motor.type} Anda.`;
    return `https://wa.me/${wa.startsWith('0') ? '62'+wa.substring(1) : wa}?text=${encodeURIComponent(msg)}`;
  };

  if (isAuthChecking) return <div className="pt-40 text-center font-bold text-slate-500 animate-pulse">Memeriksa Keamanan...</div>;

  if (!user) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border-4 border-red-600">
          <h1 className="text-3xl font-black uppercase italic text-center mb-8">Admin <span className="text-red-600">Portal</span></h1>
          {loginError && <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-bold outline-none" placeholder="Email Admin" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-bold outline-none" placeholder="Password" />
            <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase text-sm">Masuk Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-4xl font-black uppercase italic text-slate-900">Data <span className="text-red-600">Pesanan</span></h1>
          <div className="flex gap-3">
            <button onClick={fetchOrders} className="px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl">Refresh</button>
            <button onClick={handleLogout} className="px-6 py-3 bg-red-100 text-red-600 text-xs font-bold rounded-xl">Keluar</button>
          </div>
        </div>

        {/* TAB NAVIGASI */}
        <div className="flex gap-6 mb-8 border-b border-slate-200">
          <Link to="/admin-jsg/order" className="pb-4 text-xs font-black uppercase tracking-widest transition-all text-red-600 border-b-2 border-red-600">
            Data Pesanan Masuk
          </Link>
          <Link to="/admin-jsg/motor" className="pb-4 text-xs font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-600">
            Data Unit Motor
          </Link>
        </div>

        {/* TABEL ORDER */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          {loadingOrders ? (
            <div className="p-10 text-center font-bold text-slate-500 animate-pulse">Mengambil data...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  <th className="p-6">Order ID</th><th className="p-6">Nama</th><th className="p-6">Status</th><th className="p-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-50">
                    <td className="p-6 font-black">{o.order_id}</td>
                    <td className="p-6 font-bold">{o.pembeli.nama}</td>
                    <td className="p-6"><span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg ${o.status_pesanan === 'Completed' ? 'bg-green-100 text-green-700' : o.status_pesanan === 'Not Completed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{o.status_pesanan || "Proses"}</span></td>
                    <td className="p-6 text-center">
                      <button onClick={() => setDetailOrder(o)} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg mr-2">Detail</button>
                      <button onClick={() => { setEditOrder(o); setEditFormData(o.pembeli); }} className="px-4 py-2 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL DETAIL */}
      {detailOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[32px] p-8 relative">
            <h2 className="text-2xl font-black uppercase italic mb-6">Detail Pesanan</h2>
            <div className="bg-slate-50 p-6 rounded-2xl mb-6">
              <p><strong>Nama:</strong> {detailOrder.pembeli.nama}</p>
              <p><strong>Motor:</strong> {detailOrder.motor.type}</p>
              <a href={getWhatsAppLink(detailOrder)} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold block mt-2">📞 Chat {detailOrder.pembeli.whatsapp}</a>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleUpdateStatus(detailOrder.id, "Completed")} className="w-full py-4 bg-green-500 text-white font-black uppercase text-xs rounded-xl">Set Completed</button>
              <button onClick={() => handleUpdateStatus(detailOrder.id, "Not Completed")} className="w-full py-4 bg-red-500 text-white font-black uppercase text-xs rounded-xl">Set Not Completed</button>
            </div>
            <button onClick={() => setDetailOrder(null)} className="absolute top-8 right-8 w-10 h-10 bg-slate-200 rounded-full font-black">X</button>
          </div>
        </div>
      )}

      {/* MODAL EDIT */}
      {editOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[32px] p-8 relative">
            <h2 className="text-xl font-black uppercase italic mb-6">Edit Pembeli</h2>
            <form onSubmit={handleSaveEditOrder} className="space-y-4">
              <input type="text" value={editFormData.nama || ''} onChange={(e) => setEditFormData({...editFormData, nama: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm" required />
              <input type="text" value={editFormData.nik || ''} onChange={(e) => setEditFormData({...editFormData, nik: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm" required />
              <input type="text" value={editFormData.whatsapp || ''} onChange={(e) => setEditFormData({...editFormData, whatsapp: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm" required />
              <div className="flex gap-4 mt-4">
                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-black rounded-xl">Simpan</button>
                <button type="button" onClick={() => setEditOrder(null)} className="w-full py-3 bg-slate-200 font-black rounded-xl">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DataOrder;