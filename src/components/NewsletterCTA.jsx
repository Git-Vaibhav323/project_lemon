export default function NewsletterCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-4xl mx-auto relative z-10">
      <div className="newsletter-pulse glass rounded-3xl py-10 sm:py-14 lg:py-16 px-6 sm:px-10 text-center border-2">
        <h2 className="text-brand-dark text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-3">
          Plant care tips, delivered.
        </h2>
        <p className="text-brand-dark/50 text-sm sm:text-base mb-8">
          Weekly guides for happy, thriving plants.
        </p>

        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-home-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-home-email"
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 bg-white border border-brand-bark/15 rounded-full text-brand-dark text-sm px-5 py-3 outline-none placeholder:text-brand-dark/35 focus:border-brand-moss/40 transition-colors duration-300"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-brand-moss text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-brand-moss/90 active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
