// File: api/payment.js
import midtransClient from 'midtrans-client';

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method tidak diizinkan' });
  }

  try {
    const { order_id, total, pembeli, nama_motor } = req.body;

    // Inisialisasi Midtrans menggunakan kunci dari Environment Variables
    let snap = new midtransClient.Snap({
      isProduction: false, // Sandbox mode
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY
    });

    let parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: total
      },
      customer_details: {
        first_name: pembeli.nama,
        phone: pembeli.whatsapp,
      },
      item_details: [{
        id: "DP-MOTOR",
        price: total,
        quantity: 1,
        name: "DP Pembelian " + nama_motor
      }]
    };

    // Minta token ke Midtrans
    const transaction = await snap.createTransaction(parameter);
    
    // Kirim token ke frontend
    res.status(200).json({ token: transaction.token });

  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ error: error.message });
  }
}