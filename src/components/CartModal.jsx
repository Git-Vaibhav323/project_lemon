import { useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import emailjs from "@emailjs/browser";

export default function CartModal({ cartItems, onClose, onCheckoutSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const receiptRef = useRef(null);

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const generateAndSendEmail = async () => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_3i86esl";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_3tptqsd";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "qvwnHWkmEVPkinND1";

      await emailjs.send(
        serviceId,
        templateId,
        {
          customer_name: customerName,
          customer_email: customerEmail,
          order_total: `$${total.toFixed(2)}`,
        },
        publicKey
      );
      console.log("Confirmation email sent without PDF!");
    } catch (err) {
      console.error("Failed to send email via EmailJS:", err);
      // We don't fail the checkout if email fails
    }
  };

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !customerPhone) {
      alert("Please fill in all details (Name, Email, Phone)");
      return;
    }
    setLoading(true);
    try {
      // Insert purchases
      const purchases = cartItems.map(item => ({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        plant_id: item.id,
        plant_name: item.name,
        price: item.price,
        quantity: item.quantity || 1
      }));

      const { error } = await supabase.from("purchases").insert(purchases);

      if (error) throw error;
      
      setSuccess(true);

      // Send email in background
      generateAndSendEmail();
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
      const canvas = await html2canvas(receiptRef.current, { 
        backgroundColor: "#ffffff",
        scale: 3
      });
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/20 backdrop-blur-sm p-4">
      <div className="bg-white border border-brand-bark/12 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={success ? handleCloseSuccess : onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-brand-dark"
        >
          ✕
        </button>
        
        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-brand-moss/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-moss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-brand-moss mb-2">Purchase Successful!</h2>
            <p className="text-gray-400 mb-8">Thank you for your order, {customerName}. We've sent a receipt to {customerEmail}.</p>
            
            {/* Hidden Receipt for high-quality local PDF Generation */}
            <div className="absolute top-[-9999px] left-[-9999px]">
              <div ref={receiptRef} className="p-12 bg-white text-brand-dark w-[800px] border border-brand-bark/12 shadow-2xl">
                <div className="flex justify-between items-end mb-8 border-b border-brand-bark/12 pb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-brand-moss mb-2">Planto</h1>
                    <p className="text-gray-400">Premium Botanical Specimen</p>
                  </div>
                  <h2 className="text-3xl font-light text-brand-dark">RECEIPT</h2>
                </div>
                
                <div className="flex justify-between mb-10 text-lg">
                  <div>
                    <p className="text-gray-400 mb-1">Customer</p>
                    <p className="font-medium text-xl">{customerName}</p>
                    <p className="text-brand-dark/70 text-base">{customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 mb-1">Date</p>
                    <p className="font-medium">{new Date().toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border border-brand-bark/12 rounded-xl overflow-hidden mb-8">
                  <table className="w-full text-left">
                    <thead className="bg-brand-sand/50">
                      <tr>
                        <th className="p-4 text-gray-400 font-medium">Item</th>
                        <th className="p-4 text-gray-400 font-medium text-center">Qty</th>
                        <th className="p-4 text-gray-400 font-medium text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, idx) => (
                        <tr key={idx} className="border-t border-white/5">
                          <td className="p-4 text-lg">{item.name}</td>
                          <td className="p-4 text-lg text-center">{item.quantity || 1}</td>
                          <td className="p-4 text-lg text-right">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end pt-4 pb-8">
                  <div className="w-1/2 flex justify-between items-center bg-brand-moss/10 p-6 rounded-xl border border-brand-moss/20">
                    <span className="text-xl text-gray-300 uppercase tracking-widest">Total</span>
                    <span className="text-4xl font-bold text-brand-moss">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="text-center text-gray-500 mt-12 pt-8 border-t border-white/5 text-sm">
                  Thank you for bringing nature into your home.<br/>
                  planto © all rights reserved
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleDownloadPDF}
                className="w-full bg-white border border-brand-moss text-brand-moss font-bold py-3 rounded-xl hover:bg-brand-moss/10 transition-colors"
              >
                Download Beautiful Receipt
              </button>
              <button 
                onClick={handleCloseSuccess}
                className="w-full bg-brand-moss text-white font-bold py-3 rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-brand-dark mb-6">Your Cart</h2>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-6">Your cart is empty.</p>
                <div className="bg-brand-sand/50 p-6 rounded-2xl border border-brand-bark/12 text-left">
                  <span className="text-brand-moss text-[10px] uppercase tracking-widest font-bold mb-2 block">Most Sold Species</span>
                  <h3 className="text-brand-dark text-lg font-semibold mb-1">Calathea Plant</h3>
                  <p className="text-gray-400 text-sm mb-4">A living masterpiece for your space.</p>
                  <button 
                    onClick={() => { window.location.hash = "#shop"; onClose(); }}
                    className="bg-brand-moss text-white px-6 py-2 rounded-full text-sm font-bold w-full hover:bg-brand-moss/90 transition-colors"
                  >
                    View in Shop
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-3">
                        <img src={item.imageUrl || item.image || item.img} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <h4 className="text-brand-dark text-sm">{item.name}</h4>
                          <span className="text-brand-moss text-xs">Qty: {item.quantity || 1}</span>
                        </div>
                      </div>
                      <span className="text-brand-dark font-bold">${item.price * (item.quantity || 1)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-brand-bark/12 pt-4 mb-6">
                  <span className="text-gray-400 uppercase tracking-wider text-sm">Total</span>
                  <span className="text-2xl font-bold text-brand-moss">${total}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-brand-sand border border-brand-bark/20 rounded px-3 py-2 text-brand-dark focus:border-brand-moss focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-brand-sand border border-brand-bark/20 rounded px-3 py-2 text-brand-dark focus:border-brand-moss focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Mobile Number</label>
                    <input 
                      type="tel" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+1 (234) 567-890"
                      className="w-full bg-brand-sand border border-brand-bark/20 rounded px-3 py-2 text-brand-dark focus:border-brand-moss focus:outline-none"
                    />
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-brand-moss text-white font-bold py-3 rounded-xl disabled:opacity-50 mt-4"
                  >
                    {loading ? "Preparing your plant..." : "Reserve Your Specimen"}
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
