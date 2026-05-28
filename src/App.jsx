import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1. Cukup import saja, jangan mendefinisikan ulang di sini
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Katalog from "./pages/Katalog";
import Syarat from "./pages/Syarat";
import Kontak from "./pages/Kontak";
import ProductDetail from './pages/ProductDetail';


function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Router>
      <div className="bg-white min-h-screen font-sans text-slate-900">
        {/* Menggunakan komponen Navbar dari file /components/Navbar.jsx */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/katalog"
            element={<Katalog onOpenDetail={(m) => setSelectedProduct(m)} />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/syarat" element={<Syarat />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>

        {/* Menggunakan komponen Footer dari file /components/Footer.jsx */}
        <Footer />

        {/* Modal Detail Cicilan */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 font-black text-slate-300 hover:text-red-600 uppercase text-xs"
              >
                Tutup
              </button>

              <h3 className="text-3xl font-black mb-1">
                {selectedProduct.type}
              </h3>
              <p className="text-[10px] text-slate-400 mb-8 tracking-[0.3em] uppercase font-bold">
                Simulasi Angsuran
              </p>

              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.installments &&
                  Object.entries(selectedProduct.installments).map(
                    ([bln, rp]) => (
                      <div
                        key={bln}
                        className="bg-slate-50 p-4 rounded-2xl border border-slate-100"
                      >
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">
                          {bln} Bulan
                        </p>
                        <p className="text-sm font-black text-slate-900">
                          Rp {rp}
                        </p>
                      </div>
                    ),
                  )}
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.phone.replace(/-/g, "")}?text=Halo, saya ingin tanya cicilan ${selectedProduct.type}`}
                className="inline-block w-full mt-8 py-4 bg-red-600 text-white text-center rounded-2xl font-bold shadow-xl shadow-red-100"
              >
                Pesan Lewat WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
