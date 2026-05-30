import { useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CartModal({ cartItems, onClose, onCheckoutSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const receiptRef = useRef(null);

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
      
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Error during checkout: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, { backgroundColor: "#14221e" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Planto_Receipt_${customerName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  const handleCloseSuccess = () => {
    onCheckoutSuccess();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-[#14221e] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={success ? handleCloseSuccess : onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#4edea3]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#4edea3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#4edea3] mb-2">Purchase Successful!</h2>
            <p className="text-gray-400 mb-8">Thank you for your order, {customerName}.</p>
            
            {/* Hidden Receipt for PDF Generation */}
            <div className="hidden">
              <div ref={receiptRef} className="p-8 bg-[#14221e] text-white w-[600px]">
                <h1 className="text-3xl font-bold text-[#4edea3] mb-6">Planto Receipt</h1>
                <p className="mb-2"><span className="text-gray-400">Customer:</span> {customerName}</p>
                <p className="mb-6"><span className="text-gray-400">Date:</span> {new Date().toLocaleString()}</p>
                
                <div className="border-t border-white/10 pt-4 mb-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between mb-2">
                      <span>{item.quantity || 1}x {item.name}</span>
                      <span>${item.price * (item.quantity || 1)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-xl text-[#4edea3]">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleDownloadPDF}
                className="w-full bg-[#14221e] border border-[#4edea3] text-[#4edea3] font-bold py-3 rounded-xl hover:bg-[#4edea3]/10 transition-colors"
              >
                Download Receipt (PDF)
              </button>
              <button 
                onClick={handleCloseSuccess}
                className="w-full bg-[#4edea3] text-[#003824] font-bold py-3 rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6">Your Cart</h2>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-3">
                        <img src={item.imageUrl || item.image || item.img} alt={item.name} className="w-12 h-12 object-cover rounded" />
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
          </>
        )}
      </div>
    </div>
  );
}
