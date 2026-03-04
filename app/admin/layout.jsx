import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex flex-1 mt-20">
                {/* Sidebar */}
                <div className="hidden md:block">
                    <AdminSidebar />
                </div>

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
