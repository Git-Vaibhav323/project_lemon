import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CartModal({ cartItems, onClose, onCheckoutSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = async () => {
    if (!customerName) {
      alert("Please enter your name");
      return;
    }
    setLoading(true);
    try {
      // Insert purchases
      const purchases = cartItems.map(item => ({
        customer_name: customerName,
        plant_id: item.id,
        plant_name: item.name,
        price: item.price,
        quantity: item.quantity || 1
      }));

      const { error } = await supabase.from("purchases").insert(purchases);

      if (error) throw error;
      
      alert("Purchase successful!");
      onCheckoutSuccess();
    } catch (err) {
      console.error(err);
      alert("Error during checkout: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-[#14221e] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-semibold text-white mb-6">Your Cart</h2>
        
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl || item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <h4 className="text-white text-sm">{item.name}</h4>
                      <span className="text-[#4edea3] text-xs">Qty: {item.quantity || 1}</span>
                    </div>
                  </div>
                  <span className="text-white font-bold">${item.price * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4 mb-6">
              <span className="text-gray-400 uppercase tracking-wider text-sm">Total</span>
              <span className="text-2xl font-bold text-[#4edea3]">${total}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Customer Name</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#081612] border border-gray-600 rounded px-3 py-2 text-white focus:border-[#4edea3] focus:outline-none"
                />
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#4edea3] text-[#003824] font-bold py-3 rounded-xl disabled:opacity-50"
              >
                {loading ? "Processing..." : "Complete Purchase"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
