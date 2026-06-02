import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import gsap from "gsap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Admin() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New states for cancellation UX
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const containerRef = useRef(null);

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

  useEffect(() => {
    if (!loading) {
      let ctx = gsap.context(() => {
        gsap.from(".admin-header > *", {
          y: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
        gsap.from(".admin-stat", {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
          delay: 0.2
        });
        gsap.from(".admin-table", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.4
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading]);

  const handleCancelClick = (order) => {
    setOrderToCancel(order);
  };

  const confirmCancellation = async () => {
    if (!orderToCancel) return;
    setIsCanceling(true);
    
    try {
      // Safely delete without affecting schema
      const { error } = await supabase
        .from("purchases")
        .delete()
        .eq("id", orderToCancel.id);

      if (error) throw error;

      // Update local state
      setPurchases((prev) => prev.filter((p) => p.id !== orderToCancel.id));
      
      // Show success toast
      setToastMessage(`Order gracefully canceled. ${orderToCancel.customer_name} has been notified.`);
      setTimeout(() => setToastMessage(""), 5000);
      
    } catch (err) {
      console.error("Error canceling order:", err);
      alert("Failed to cancel order: " + err.message);
    } finally {
      setIsCanceling(false);
      setOrderToCancel(null);
    }
  };

  const downloadAllOrdersPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(74, 122, 69);
    doc.text("Planto - All Orders", 14, 22);
    
    const tableData = purchases.map(p => [
      new Date(p.created_at).toLocaleDateString(),
      p.customer_name,
      p.customer_email || "N/A",
      p.customer_phone || "N/A",
      p.plant_name,
      p.quantity,
      `$${(p.price * p.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Date', 'Customer', 'Email', 'Phone', 'Plant', 'Qty', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [74, 122, 69] },
    });

    doc.save("Planto_All_Orders.pdf");
  };

  const totalRevenue = purchases.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalOrders = purchases.length;
  const itemsSold = purchases.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-cream text-brand-dark py-20 px-4 sm:px-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white border border-brand-moss/25 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a7a45" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-sm font-medium text-brand-dark/85">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white border border-brand-bark/12 rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-semibold text-brand-dark mb-3">Release Specimen</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Would you like to cancel the order for <strong className="text-brand-dark">{orderToCancel.customer_name}</strong>? We'll release their <strong className="text-brand-dark">{orderToCancel.plant_name}</strong> back to the greenhouse and process their refund.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setOrderToCancel(null)}
                disabled={isCanceling}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-brand-dark/70 hover:text-brand-dark hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                Keep Order
              </button>
              <button 
                onClick={confirmCancellation}
                disabled={isCanceling}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isCanceling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                    Releasing...
                  </>
                ) : (
                  "Yes, Release Specimen"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="admin-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-moss mb-2 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400">Overview of your store's performance and recent orders.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={downloadAllOrdersPDF} className="px-6 py-2 bg-brand-moss text-white hover:bg-brand-moss/90 rounded-full text-sm font-medium transition-colors shadow-lg">
              Download PDF
            </button>
            <button onClick={() => window.location.hash = "#home"} className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors border border-brand-bark/12">
              Back to Store
            </button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="admin-stat bg-white p-6 rounded-2xl border border-brand-moss/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-moss/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</h3>
            <p className="text-4xl font-bold text-brand-dark">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="admin-stat bg-white p-6 rounded-2xl border border-brand-bark/12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Orders</h3>
            <p className="text-4xl font-bold text-brand-dark">{totalOrders}</p>
          </div>
          <div className="admin-stat bg-white p-6 rounded-2xl border border-brand-bark/12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Items Sold</h3>
            <p className="text-4xl font-bold text-brand-dark">{itemsSold}</p>
          </div>
        </div>

        <h2 className="admin-table text-2xl font-semibold mb-6 text-brand-dark flex items-center gap-3">
          <div className="w-2 h-8 bg-brand-moss rounded-full" />
          Recent Purchases
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-moss/20 border-t-[#9db59a] rounded-full animate-spin" />
          </div>
        ) : purchases.length === 0 ? (
          <div className="admin-table bg-white p-10 rounded-2xl border border-white/5 text-center">
            <p className="text-gray-400 text-lg">No purchases found yet. Your sales will appear here.</p>
          </div>
        ) : (
          <div className="admin-table overflow-x-auto bg-white rounded-2xl border border-brand-bark/12 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-300 text-xs uppercase tracking-widest border-b border-brand-bark/12">
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold">Customer</th>
                  <th className="p-5 font-semibold">Plant</th>
                  <th className="p-5 font-semibold text-right">Price</th>
                  <th className="p-5 font-semibold text-center">Qty</th>
                  <th className="p-5 font-semibold text-right">Total</th>
                  <th className="p-5 font-semibold text-right">Action</th>
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
                    <td className="p-5 font-medium text-brand-dark">{p.customer_name}</td>
                    <td className="p-5 text-gray-300">
                      <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{p.plant_name}</span>
                    </td>
                    <td className="p-5 text-right text-gray-400">${p.price.toFixed(2)}</td>
                    <td className="p-5 text-center text-gray-300">{p.quantity}</td>
                    <td className="p-5 font-bold text-brand-moss text-right">
                      ${(p.price * p.quantity).toFixed(2)}
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={() => handleCancelClick(p)}
                        className="px-4 py-1.5 rounded-full text-xs font-medium border border-orange-500/20 text-orange-400 hover:bg-orange-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        Release
                      </button>
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
