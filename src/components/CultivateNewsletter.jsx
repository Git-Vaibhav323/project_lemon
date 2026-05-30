export default function CultivateNewsletter() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto relative z-10">
      <div
        className="cultivate-panel rounded-[20px] p-8 sm:p-12 lg:p-[60px] lg:px-[80px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(61,255,160,0.1)",
        }}
      >
        {/* Left */}
        <div className="lg:max-w-[50%]">
          <span className="text-[#3dffa0] text-[11px] font-semibold tracking-[2px] uppercase">
            CULTIVATE
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-serif font-bold mt-2 leading-tight">
            Plant care, once a week.
          </h2>
          <p className="text-white/50 text-sm sm:text-base mt-2 leading-relaxed">
            No noise. Just what your plants need this week — light, water, season.
          </p>
        </div>

        {/* Right: form */}
        <form
          className="w-full lg:w-auto lg:min-w-[320px] flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="cultivate-email" className="sr-only">Email address</label>
          <input
            id="cultivate-email"
            type="email"
            placeholder="Enter your email"
            className="flex-1 w-full px-[18px] py-[14px] rounded-xl text-sm text-white outline-none transition-colors"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-[14px] rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-[0.98]"
            style={{
              background: "#3dffa0",
              color: "#0b1d0d",
            }}
          >
            Join the journal
          </button>
        </form>
      </div>
    </section>
  );
}
