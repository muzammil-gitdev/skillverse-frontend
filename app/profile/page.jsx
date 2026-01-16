import GigsNavbar from "@/components/GigsNavbar";
import Link from "next/link";

export default function ProfilePage() {
  const profile = {
    name: "John Doe",
    role: "Expert Full-Stack Developer & UI Designer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80",
    rating: 4.9,
    reviews: 127
  };

  return (
    <div className="page-wrapper">
      <GigsNavbar />

      <main className="pt-32 pb-20 container-main">
        {/* Profile Header Card */}
        <div className="card mb-8">
          {/* Cover Banner */}
          <div className="h-48 bg-gradient-to-r from-[#1dbf73]/10 to-emerald-100"></div>

          <div className="px-8 pb-8 -mt-20 relative">
            {/* Profile Image & Basic Info Row */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative">
                <div className="h-40 w-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src={profile.avatar}
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
                    <h1 className="heading-1">{profile.name}</h1>
                    <p className="text-subtitle font-medium">
                      {profile.role}
                    </p>
                  </div>

                  {/* Rating Pill */}
                  <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-900">{profile.rating}</span>
                    <span className="text-gray-400 text-sm">({profile.reviews} reviews)</span>
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
            <div className="card p-8">
              <h2 className="heading-3 mb-4">About Me</h2>
              <p className="text-body">
                I am a passionate developer with over 6 years of experience in
                building modern web applications. I specialize in React,
                Next.js, and Node.js. My goal is to help businesses grow by
                delivering high-quality, scalable code and intuitive user
                interfaces. When I&apos;m not coding, I love exploring new
                design trends and contributing to open-source projects.
              </p>
            </div>

            {/* Skills Section */}
            <div className="card p-8">
              <h2 className="heading-3 mb-4">Skills</h2>
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
                    className="badge badge-light hover:border-[#1dbf73]/30 hover:text-[#1dbf73] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Gigs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2">My Gigs</h2>
              <Link href="/gigs/create" className="flex items-center gap-2 text-[#1dbf73] font-bold hover:text-[#19a463] hover:underline transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Gig
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: "101",
                  title: "I will build a modern Next.js website for your business",
                  price: "150",
                  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  description: "Get a high-performance website built with the latest technologies. I ensure fast loading times and SEO optimization."
                },
                {
                  id: "102",
                  title: "I will design a stunning UI/UX for your mobile app",
                  price: "80",
                  img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  description: "Professional UI/UX design that focuses on user experience and conversion optimization."
                },
                {
                  id: "103",
                  title: "I will create a comprehensive marketing strategy",
                  price: "200",
                  img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  description: "Boost your business with a tailored marketing strategy that targets your ideal audience."
                }
              ].map((gig, idx) => (
                <Link
                  key={idx}
                  href={{
                    pathname: `/gigs/${gig.id}`,
                    query: {
                      title: gig.title,
                      userName: profile.name,
                      userAvatar: profile.avatar,
                      description: gig.description,
                      rating: profile.rating,
                      reviews: profile.reviews,
                      thumbnail: gig.img
                    }
                  }}
                  className="card card-hover group block"
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <img
                      src={gig.img}
                      alt="Gig Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="heading-3 text-lg mb-2 group-hover:text-[#1dbf73] transition-colors">
                      {gig.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4 text-sm">
                      <span className="text-gray-500">Starting at</span>
                      <span className="text-xl font-bold text-[#1dbf73]">
                        ${gig.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
