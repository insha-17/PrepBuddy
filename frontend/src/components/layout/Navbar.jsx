import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (

        <header className="bg-white shadow-sm h-20 flex justify-between items-center px-8">

            <h2 className="text-2xl font-semibold">
                Dashboard
            </h2>

            <div className="flex items-center gap-6">

                <Bell className="text-gray-600"/>

                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold">

                   {user?.name?.charAt(0)}

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                >
                    Logout
                </button>

            </div>

        </header>

    );
}

export default Navbar;