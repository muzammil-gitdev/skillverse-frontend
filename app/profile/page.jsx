import GigsNavbar from "@/components/GigsNavbar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GigsNavbar />

      <main className="pt-24 px-6 pb-20 max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Cover Banner (Optional aesthetic upgrade) */}
          <div className="h-48 bg-gradient-to-r from-[#1dbf73]/10 to-emerald-100"></div>

          <div className="px-8 pb-8 -mt-20 relative">
            {/* Profile Image & Basic Info Row */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative">
                <div className="h-40 w-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-4 h-6 w-6 bg-[#1dbf73] border-2 border-white rounded-full"></div>
              </div>

              {/* Info */}
              <div className="flex-1 pt-2 md:pt-20 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      John Doe
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                      Expert Full-Stack Developer & UI Designer
                    </p>
                  </div>

                  {/* Rating Pill */}
                  <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                    <svg
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-900">4.9</span>
                    <span className="text-gray-400 text-sm">(127 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About & Skills */}
          <div className="lg:col-span-1 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed">
                I am a passionate developer with over 6 years of experience in
                building modern web applications. I specialize in React,
                Next.js, and Node.js. My goal is to help businesses grow by
                delivering high-quality, scalable code and intuitive user
                interfaces. When I&apos;m not coding, I love exploring new
                design trends and contributing to open-source projects.
              </p>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "Tailwind CSS",
                  "TypeScript",
                  "Figma",
                  "MongoDB",
                  "UI Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium border border-gray-100 hover:border-[#1dbf73]/30 hover:text-[#1dbf73] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Gigs */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Gigs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gig Card 1 */}
              <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-[#1dbf73]/10 hover:border-[#1dbf73]/30 transition-all duration-300">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Gig Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1dbf73] transition-colors">
                    I will build a modern Next.js website for your business
                  </h3>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-gray-500">Starting at</span>
                    <span className="text-xl font-bold text-[#1dbf73]">
                      $150
                    </span>
                  </div>
                </div>
              </div>

              {/* Gig Card 2 */}
              <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-[#1dbf73]/10 hover:border-[#1dbf73]/30 transition-all duration-300">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Gig Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1dbf73] transition-colors">
                    I will design a stunning UI/UX for your mobile app
                  </h3>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-gray-500">Starting at</span>
                    <span className="text-xl font-bold text-[#1dbf73]">
                      $80
                    </span>
                  </div>
                </div>
              </div>

              {/* Gig Card 3 */}
              <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-[#1dbf73]/10 hover:border-[#1dbf73]/30 transition-all duration-300">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Gig Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1dbf73] transition-colors">
                    I will create a comprehensive marketing strategy
                  </h3>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-gray-500">Starting at</span>
                    <span className="text-xl font-bold text-[#1dbf73]">
                      $200
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
