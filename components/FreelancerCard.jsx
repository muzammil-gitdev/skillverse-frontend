export default function FreelancerCard({ freelancer }) {
    return (
        <div className="flex flex-col p-6 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#1dbf73]/5 hover:border-[#1dbf73]/20 h-full">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-4">
                <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-50 group-hover:ring-[#1dbf73]/20 transition-all">
                    {/* Placeholder Avatar - simpler than external images */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    {/* Online badge */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#1dbf73] border-2 border-white rounded-full"></div>
                </div>

                <h3 className="text-lg font-bold text-gray-900">{freelancer.name}</h3>
                <p className="text-sm font-medium text-gray-500 mb-1">{freelancer.title}</p>

                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {freelancer.location}
                </div>

                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                    <span className="text-yellow-400">★</span>
                    {freelancer.rating}
                    <span className="text-gray-400 font-normal text-xs">({freelancer.reviews} reviews)</span>
                </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {freelancer.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md">
                        {skill}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p className="text-sm text-center text-gray-500 mb-6 line-clamp-2 flex-grow">
                {freelancer.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100 mb-6">
                <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{freelancer.projects}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                </div>
                <div className="text-center border-l border-gray-100">
                    <div className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {freelancer.responseTime}
                    </div>
                    <div className="text-xs text-gray-500">Response time</div>
                </div>
            </div>


        </div>
    );
}
