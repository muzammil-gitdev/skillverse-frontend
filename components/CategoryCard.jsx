export default function CategoryCard({ icon, title, description, count }) {
    return (
        <div className="group flex items-start gap-4 p-6 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#1dbf73]/10 hover:border-[#1dbf73]/30 cursor-pointer">
            {/* Icon Box */}
            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-[#1dbf73]/10 text-[#1dbf73] transition-all duration-300 group-hover:bg-[#1dbf73] group-hover:text-white group-hover:scale-110">
                {icon}
            </div>

            {/* Content */}
            <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1dbf73] transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {description}
                </p>
                <div className="pt-2 text-sm font-medium text-[#1dbf73]">
                    {count}
                </div>
            </div>
        </div>
    );
}
