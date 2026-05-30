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

  const totalRevenue = purchases.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalOrders = purchases.length;
  const itemsSold = purchases.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="min-h-screen bg-[#081612] text-white py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#4edea3] mb-2 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400">Overview of your store's performance and recent orders.</p>
          </div>
          <button onClick={() => window.location.hash = "#home"} className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors border border-white/10">
            Back to Store
          </button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#14221e] p-6 rounded-2xl border border-[#4edea3]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4edea3]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</h3>
            <p className="text-4xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-[#14221e] p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Orders</h3>
            <p className="text-4xl font-bold text-white">{totalOrders}</p>
          </div>
          <div className="bg-[#14221e] p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Items Sold</h3>
            <p className="text-4xl font-bold text-white">{itemsSold}</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
          <div className="w-2 h-8 bg-[#4edea3] rounded-full" />
          Recent Purchases
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#4edea3]/20 border-t-[#4edea3] rounded-full animate-spin" />
          </div>
        ) : purchases.length === 0 ? (
          <div className="bg-[#14221e] p-10 rounded-2xl border border-white/5 text-center">
            <p className="text-gray-400 text-lg">No purchases found yet. Your sales will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#14221e] rounded-2xl border border-white/10 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-300 text-xs uppercase tracking-widest border-b border-white/10">
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold">Customer</th>
                  <th className="p-5 font-semibold">Plant</th>
                  <th className="p-5 font-semibold text-right">Price</th>
                  <th className="p-5 font-semibold text-center">Qty</th>
                  <th className="p-5 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-5 whitespace-nowrap text-gray-400 text-sm">
                      {new Date(p.created_at).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="p-5 font-medium text-white">{p.customer_name}</td>
                    <td className="p-5 text-gray-300">
                      <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{p.plant_name}</span>
                    </td>
                    <td className="p-5 text-right text-gray-400">${p.price.toFixed(2)}</td>
                    <td className="p-5 text-center text-gray-300">{p.quantity}</td>
                    <td className="p-5 font-bold text-[#4edea3] text-right">
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
