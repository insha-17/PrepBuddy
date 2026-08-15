import {
    LayoutDashboard,
    User,
    FileText,
    MessageSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: User,
        },
        {
            name: "Resume Analyzer",
            path: "/resume",
            icon: FileText,
        },
        {
            name: "AI Interview",
            path: "/interview",
            icon: MessageSquare,
        },
    ];

    return (
        <aside className="w-72 bg-slate-900 text-white flex flex-col">

            <div className="p-8 border-b border-slate-800">

                <h1 className="text-3xl font-bold text-blue-400">
                    PrepBuddy
                </h1>

                <p className="text-sm text-slate-400 mt-2">
                    Smart Interview Preparation
                </p>

            </div>

            <nav className="flex-1 p-4">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                                location.pathname === item.path
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`}
                        >

                            <Icon size={20}/>

                            <span>{item.name}</span>

                        </Link>

                    );

                })}

            </nav>

        </aside>
    );
}

export default Sidebar;