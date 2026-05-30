import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Admin() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const { data, error } = await supabase
          .from("purchases")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPurchases(data || []);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPurchases();
  }, []);

  return (
    <div className="min-h-screen bg-[#081612] text-white py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#4edea3]">Admin Dashboard</h1>
        <h2 className="text-xl mb-4 text-gray-300">Recent Purchases</h2>
        
        {loading ? (
          <p className="text-gray-400">Loading purchases...</p>
        ) : purchases.length === 0 ? (
          <p className="text-gray-400">No purchases found.</p>
        ) : (
          <div className="overflow-x-auto bg-[#14221e] rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Plant</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 whitespace-nowrap text-gray-300">
                      {new Date(p.created_at).toLocaleString()}
                    </td>
                    <td className="p-4 font-medium">{p.customer_name}</td>
                    <td className="p-4">{p.plant_name}</td>
                    <td className="p-4">${p.price}</td>
                    <td className="p-4">{p.quantity}</td>
                    <td className="p-4 font-bold text-[#4edea3]">
                      ${(p.price * p.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
