import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig'; // Pastikan auth di-import
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  // State untuk Autentikasi
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // State untuk Data Dashboard
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Mengecek apakah admin sudah login atau belum saat halaman dimuat
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Mengambil data pesanan (HANYA berjalan jika user sudah login)
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      
      ordersData.sort((a, b) => {
        const timeA = a.tanggal_pesanan?.seconds || 0;
        const timeB = b.tanggal_pesanan?.seconds || 0;
        return timeB - timeA;
      });

      setOrders(ordersData);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan fetchOrders jika user terdeteksi login
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  // 3. Fungsi untuk Proses Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Jika berhasil, onAuthStateChanged akan otomatis mengubah state user
    } catch (error) {
      setLoginError('Email atau Password salah! Akses ditolak.');
      console.error("Login Error:", error);
    }
  };

  // 4. Fungsi untuk Proses Logout
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin ingin keluar dari Dashboard Admin?");
    if (confirmLogout) {
      await signOut(auth);
    }
  };

  // Fungsi untuk mengubah status pesanan (Fitur Dashboard)
  const handleUpdateStatus = async (id, newStatus) => {
    const konfirmasi = window.confirm(`Yakin ingin mengubah status menjadi: ${newStatus}?`);
    if (!konfirmasi) return;

    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        status_pesanan: newStatus
      });
      alert("Status pesanan berhasil diperbarui!");
      fetchOrders(); 
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("Terjadi kesalahan saat memperbarui status.");
    }
  };

  // Tampilan Loading saat mengecek sesi login
  if (isAuthChecking) {
    return <div className="pt-40 text-center font-bold text-slate-500 animate-pulse">Memeriksa Akses Keamanan...</div>;
  }

  // --- ANTARMUKA 1: HALAMAN LOGIN (Tampil jika belum login) ---
  if (!user) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border-4 border-red-600">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black uppercase italic text-slate-900">Admin <span className="text-red-600">Portal</span></h1>
            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Restricted Area</p>
          </div>
          
          {loginError && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Email Admin</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none" placeholder="admin@jayasentosa.com" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-red-600 outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase text-sm tracking-widest hover:bg-red-700 transition-all shadow-lg mt-4">
              Masuk Dashboard
            </button>
          </form>
          <button onClick={() => navigate('/')} className="w-full text-center mt-6 text-xs font-bold text-slate-400 hover:text-slate-600">
            ← Kembali ke Website Utama
          </button>
        </div>
      </div>
    );
  }

  // --- ANTARMUKA 2: HALAMAN DASHBOARD (Tampil jika SUDAH login) ---
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase italic text-slate-900">Dashboard <span className="text-red-600">Admin</span></h1>
            <p className="text-sm font-bold text-slate-400 mt-2">Kelola antrean pesanan masuk Showroom Jaya Sentosa</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchOrders} className="px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-lg">
              Refresh Data
            </button>
            <button onClick={handleLogout} className="px-6 py-3 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-200 transition-all shadow-sm">
              Keluar (Logout)
            </button>
          </div>
        </div>

        {/* Tabel Pesanan */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
             <div className="p-10 text-center font-bold text-slate-500 animate-pulse">Mengambil data terbaru...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                    <th className="p-6">Order ID & Tanggal</th>
                    <th className="p-6">Data Pembeli</th>
                    <th className="p-6">Detail Unit & Harga</th>
                    <th className="p-6">Status Pembayaran</th>
                    <th className="p-6">Aksi (Update Status)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-10 text-center font-bold text-slate-400">Belum ada pesanan masuk.</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <p className="font-black text-slate-900">{order.order_id}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {order.tanggal_pesanan ? new Date(order.tanggal_pesanan.toDate()).toLocaleString('id-ID') : '-'}
                          </p>
                        </td>
                        <td className="p-6">
                          <p className="font-bold text-slate-900">{order.pembeli.nama}</p>
                          <p className="text-xs text-slate-500 mt-1">WA: {order.pembeli.whatsapp}</p>
                          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed max-w-[200px]">
                            {order.pembeli.alamatLengkap}, Kec. {order.pembeli.kecamatan}, {order.pembeli.kabupaten}
                          </p>
                        </td>
                        <td className="p-6">
                          <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded-lg mb-2">
                            {order.motor.type}
                          </span>
                          <p className="text-xs font-bold text-slate-700">Angsuran: <span className="text-slate-900">{order.pembeli.tenorAngsuran === "Cash" ? "Beli Tunai" : `${order.pembeli.tenorAngsuran} Bulan`}</span></p>
                          <p className="text-xs font-bold text-slate-700 mt-1">DP Dibayar: <span className="text-slate-900 font-black">Rp {order.motor.dp}</span></p>
                        </td>
                        <td className="p-6">
                          <span className={`inline-block px-3 py-1 text-[10px] font-black uppercase rounded-lg ${order.status_pembayaran === 'Lunas (DP)' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {order.status_pembayaran}
                          </span>
                          <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wider">
                            Status Pesanan Saat ini:
                          </p>
                          <p className="text-xs font-black text-slate-900 mt-1">{order.status_pesanan}</p>
                        </td>
                        <td className="p-6 space-y-2">
                          <button onClick={() => handleUpdateStatus(order.id, "Sedang Diproses")} className="block w-full py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-100 transition-colors">
                            Set: Sedang Diproses
                          </button>
                          <button onClick={() => handleUpdateStatus(order.id, "Selesai (Motor Dikirim)")} className="block w-full py-2 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-green-100 transition-colors">
                            Set: Selesai
                          </button>
                          <a href={`https://wa.me/${order.pembeli.whatsapp}?text=Halo Bapak/Ibu ${order.pembeli.nama}, kami dari Admin Showroom Jaya Sentosa ingin mengonfirmasi pesanan motor ${order.motor.type} Anda...`} target="_blank" rel="noreferrer" className="block w-full py-2 bg-emerald-500 text-white text-center text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-600 transition-colors shadow-sm">
                            Hubungi via WA
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;