import { ArrowUpRight } from "lucide-react";

function DashboardCard({ title, value, description, icon: Icon }) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-2">
                        {value}
                    </h2>

                </div>

                <div className="bg-blue-100 p-3 rounded-xl">
                    <Icon className="text-blue-600" size={26}/>
                </div>

            </div>

            <div className="flex items-center gap-2 mt-5">

                <ArrowUpRight size={18} className="text-green-500"/>

                <span className="text-sm text-gray-500">
                    {description}
                </span>

            </div>

        </div>
    );
}

export default DashboardCard;