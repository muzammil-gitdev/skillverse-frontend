export default function AllUsersPage() {
    const users = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Freelancer", status: "Active", joined: "Oct 24, 2025" },
        { id: 2, name: "Bob Smith", email: "bob@techcorp.com", role: "Client", status: "Active", joined: "Nov 02, 2025" },
        { id: 3, name: "Charlie Davis", email: "charlie@design.io", role: "Freelancer", status: "Suspended", joined: "Jan 15, 2026" },
        { id: 4, name: "Diana Prince", email: "diana@amazon.com", role: "Client", status: "Active", joined: "Feb 20, 2026" },
        { id: 5, name: "Ethan Hunt", email: "ethan@imf.gov", role: "Freelancer", status: "Pending", joined: "Mar 01, 2026" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
                <button className="bg-[#1dbf73] hover:bg-[#179b5d] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Export Data
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Name</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Email</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Role</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Status</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Joined</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{user.email}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Freelancer' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        <span className={`flex items-center gap-1.5 ${user.status === 'Active' ? 'text-green-600' : user.status === 'Suspended' ? 'text-red-600' : 'text-yellow-600'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : user.status === 'Suspended' ? 'bg-red-600' : 'bg-yellow-600'
                                                }`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{user.joined}</td>
                                    <td className="py-4 px-6 text-sm text-right">
                                        <button className="text-[#1dbf73] hover:text-[#179b5d] font-medium mr-3">Edit</button>
                                        <button className="text-red-500 hover:text-red-700 font-medium">Ban</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
