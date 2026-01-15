export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center min-h-[90vh] px-4 pt-32 pb-16 text-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight drop-shadow-sm">
          Hire Experts or <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1dbf73] to-emerald-600">
            Get Hired for Your Skills
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed font-light">
          Connect with top freelancers worldwide or showcase your skills to land
          your dream projects. Join millions of professionals building their
          careers on SkillVerse.
        </p>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl mx-auto p-2 bg-white border border-gray-200 rounded-2xl shadow-xl transition-transform hover:scale-[1.01] focus-within:ring-2 focus-within:ring-[#1dbf73]/50">
          <div className="flex-1 flex items-center px-4 h-14 w-full">
            <svg
              className="w-6 h-6 text-gray-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="What service are you looking for?"
              className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-lg"
            />
          </div>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#1dbf73]/30 flex items-center justify-center gap-2">
            <span>Search</span>
          </button>
        </div>

        {/* Popular Tags (Optional Visual Enhancement) */}
        <div className="pt-6 flex flex-wrap justify-center items-center gap-3 text-sm text-gray-500">
          <span>Popular:</span>
          <span className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-colors bg-white/50">
            Web Design
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-colors bg-white/50">
            WordPress
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-colors bg-white/50">
            Logo Design
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-colors bg-white/50">
            AI Services
          </span>
        </div>
      </div>
    </section>
  );
}
