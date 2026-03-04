export default function AdminDashboardPage() {
    const stats = [
        { label: "Total Users", value: "1,234", trend: "+12%", trendUp: true },
        { label: "Active Jobs", value: "856", trend: "+5%", trendUp: true },
        { label: "Pending Complaints", value: "23", trend: "-2%", trendUp: false },
        { label: "Revenue (M)", value: "$45.2K", trend: "+18%", trendUp: true }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="text-sm text-gray-500">Last updated: Just now</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <span className={`text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mt-8 min-h-[400px]">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="flex flex-col gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                        <span className="font-semibold text-gray-900">John Doe</span> registered as a new Freelancer. <span className="text-xs text-gray-400 block mt-1">2 mins ago</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                        <span className="font-semibold text-gray-900">TechCorp</span> posted a new job &quot;React Native Developer needed&quot;. <span className="text-xs text-gray-400 block mt-1">15 mins ago</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                        <span className="font-semibold text-gray-900">Jane Smith</span> submitted a profile report. <span className="text-xs text-gray-400 block mt-1">1 hour ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
