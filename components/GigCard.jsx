import Link from "next/link";

export default function GigCard({ gig }) {
  // Truncate description to roughly 20 words
  const truncateDescription = (desc) => {
    const words = desc.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return desc;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-[#1dbf73]/10 hover:border-[#1dbf73]/30 transition-all duration-300 flex flex-col h-full">
      {/* Gig Thumbnail */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img
          src={gig.thumbnail}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* User Info & Title Header */}
        <div className="flex items-start gap-3 mb-3">
          <img
            src={gig.userAvatar}
            alt={gig.userName}
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
          />
          <div>
            <Link
              href={{
                pathname: `/gigs/${gig.id}`,
                query: {
                  title: gig.title,
                  userName: gig.userName,
                  userAvatar: gig.userAvatar,
                  description: gig.description,
                  rating: gig.rating,
                  reviews: gig.reviews,
                  thumbnail: gig.thumbnail
                }
              }}
            >
              <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 hover:text-[#1dbf73] transition-colors cursor-pointer">
                {gig.title}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 mt-1">
              by{" "}
              <span className="font-medium text-gray-700">{gig.userName}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {truncateDescription(gig.description)}
        </p>

        {/* Rating & Contact Button */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-gray-900 text-sm">
              {gig.rating}
            </span>
            <span className="text-gray-400 text-xs">({gig.reviews})</span>
          </div>

          <Link href="/profile">
            <button className="px-4 py-2 bg-[#1dbf73]/10 text-[#1dbf73] text-sm font-semibold rounded-lg hover:bg-[#1dbf73] hover:text-white transition-all duration-300">
              Contact Me
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
