"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminApi";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Status", "Joined Date"];
    const rows = filteredUsers.map((user) => [
      `"${user.fullName || ""}"`,
      `"${user.email || ""}"`,
      `"${user.isVerified ? "Active" : "Pending"}"`,
      `"${new Date(user.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "skillverse_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:border-[#1dbf73] focus:ring-[#1dbf73] focus:outline-none transition-colors"
          />
          <button 
            onClick={handleExportCSV}
            className="bg-[#1dbf73] hover:bg-[#179b5d] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>

                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Joined</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* NAME */}
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {user.fullName}
                  </td>

                  {/* EMAIL */}
                  <td className="py-4 px-6 text-gray-500">{user.email}</td>

                  {/* ROLE */}

                  {/* STATUS */}
                  <td className="py-4 px-6">
                    <span
                      className={`flex items-center gap-2 ${
                        user.isVerified ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          user.isVerified ? "bg-green-600" : "bg-yellow-600"
                        }`}
                      ></span>
                      {user.isVerified ? "Active" : "Pending"}
                    </span>
                  </td>

                  {/* JOINED */}
                  <td className="py-4 px-6 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-4 px-6 text-right">
                    <button className="text-red-500 font-medium">Ban</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="p-6 text-center text-gray-500">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
}
