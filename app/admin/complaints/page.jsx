export default function ComplaintsPage() {
    const complaints = [
        { id: "C-1001", reporter: "Alice Johnson", target: "Project #821", category: "Payment Issue", status: "Open", date: "Mar 04, 2026" },
        { id: "C-1002", reporter: "TechCorp", target: "Bob Smith", category: "Unresponsive Freelancer", status: "Investigating", date: "Mar 02, 2026" },
        { id: "C-1003", reporter: "Jane Smith", target: "FakeProfile123", category: "Fraudulent Profile", status: "Resolved", date: "Feb 28, 2026" },
        { id: "C-1004", reporter: "Ethan Hunt", target: "Gigs Platform", category: "Technical Bug", status: "Open", date: "Mar 05, 2026" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Complaints & Reports</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage user disputes, bug reports, and moderation flags.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-[#1dbf73]/20 focus:border-[#1dbf73]">
                        <option>All Statuses</option>
                        <option>Open</option>
                        <option>Investigating</option>
                        <option>Resolved</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">ID</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Reporter</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Target</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Category</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Status</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900">Date</th>
                                <th className="py-4 px-6 font-semibold text-sm text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint) => (
                                <tr key={complaint.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-medium text-[#1dbf73]">{complaint.id}</td>
                                    <td className="py-4 px-6 text-sm text-gray-900">{complaint.reporter}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{complaint.target}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{complaint.category}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${complaint.status === 'Open' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                complaint.status === 'Investigating' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                                    'bg-green-50 text-green-600 border border-green-100'
                                            }`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{complaint.date}</td>
                                    <td className="py-4 px-6 text-sm text-right">
                                        <button className="text-gray-600 hover:text-[#1dbf73] font-medium border border-gray-200 hover:border-[#1dbf73] rounded-lg px-3 py-1 transition-all">Review</button>
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
