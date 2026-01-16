import Link from "next/link";

export default function CallToAction() {
    return (
        <section id="cta" className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden bg-[#1dbf73] rounded-[2.5rem] px-6 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-[#1dbf73]/20">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full border-[60px] border-white/20"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] rounded-full border-[40px] border-white/20"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                        {/* Heading */}
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                                Ready to Start Your Freelancing Journey?
                            </h2>
                            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
                                Join millions of professionals who trust SkillVerse to build their careers
                                and grow their businesses.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/signup">
                                <button className="min-w-[200px] px-8 py-4 bg-white text-[#1dbf73] font-bold text-lg rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
                                    Sign Up as Freelancer
                                </button>
                            </Link>
                            <button className="min-w-[200px] px-8 py-4 bg-[#19a463] text-white border border-white/20 font-bold text-lg rounded-xl hover:bg-[#158f55] hover:scale-105 transition-all duration-300 cursor-pointer">
                                Hire Talent
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-8 border-t border-white/20">
                            {[
                                { value: "2M+", label: "Active Freelancers" },
                                { value: "500K+", label: "Projects Completed" },
                                { value: "$100M+", label: "Paid to Freelancers" }
                            ].map((stat, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm font-medium text-green-100 uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
