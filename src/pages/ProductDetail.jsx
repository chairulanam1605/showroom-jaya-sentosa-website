import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { COMPANY_INFO } from "../constants/data";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [motor, setMotor] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return <div className="pt-40 text-center">Memuat detail motor...</div>;
  if (!motor)
    return <div className="pt-40 text-center">Motor tidak ditemukan.</div>;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm font-bold text-slate-400 hover:text-red-600"
        >
          ← Kembali ke Katalog
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Bagian Foto */}
          <div className="bg-slate-50 rounded-[40px] p-10 flex items-center justify-center aspect-square overflow-hidden border border-slate-100">
            {motor.image ? (
              <img
                src={motor.image}
                alt={motor.type}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-slate-300 italic">
                [ Foto {motor.type} ]
              </span>
            )}
          </div>

          {/* Bagian Info & Cicilan */}
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-lg">
              {motor.cat}
            </span>
            <h1 className="text-5xl font-black mt-4 mb-2 italic uppercase">
              {motor.type}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-2xl font-bold text-slate-900">
                Rp {motor.price}
              </p>
              <div className="h-4 w-[1px] bg-slate-200"></div>
              <p className="text-sm text-slate-500 font-medium">
                DP Mulai Rp {motor.dp}
              </p>
            </div>

            <h3 className="text-sm font-black uppercase tracking-widest mb-4">
              Simulasi Angsuran (Tenor)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {motor.installments &&
                Object.entries(motor.installments).map(([bln, rp]) => (
                  <div
                    key={bln}
                    className="bg-slate-50 p-6 rounded-3xl border border-slate-100"
                  >
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      {bln} Bulan
                    </p>
                    <p className="text-lg font-black text-slate-900 leading-tight">
                      Rp {rp}
                    </p>
                  </div>
                ))}
            </div>

            <a
              // Perhatikan tambahan .replace(/^0/, '62') di bawah ini
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/-/g, "").replace(/^0/, "62")}?text=Halo Marketing Jaya Sentosa, saya tertarik dengan motor ${motor.type}. Boleh tanya prosesnya?`}
              className="inline-flex items-center justify-center w-full py-5 bg-red-600 text-white rounded-3xl font-black text-lg shadow-2xl shadow-red-200 hover:bg-red-700 transition-all hover:-translate-y-1"
            >
              Pesan Sekarang via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
