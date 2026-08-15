

import Layout from "../../components/layout/Layout";
import ProfileCard from "../../components/profile/ProfileCard";

import { useAuth } from "../../context/AuthContext";

function Profile() {

    const { user } = useAuth();

    return (

        <Layout>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <div className="flex flex-col items-center">

                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

                        {user?.name?.charAt(0)}

                    </div>

                    <h1 className="text-3xl font-bold mt-5">

                        {user?.name}

                    </h1>

                    <p className="text-gray-500">

                        {user?.email}

                    </p>

                    <span className="mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">

                        {user?.role}

                    </span>

                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-10">

                    <ProfileCard
                        label="Full Name"
                        value={user?.name}
                    />

                    <ProfileCard
                        label="Email"
                        value={user?.email}
                    />

                    <ProfileCard
                        label="Role"
                        value={user?.role}
                    />

                </div>

                <div className="mt-10 text-center">

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">

                        Edit Profile

                    </button>

                </div>

            </div>

        </Layout>

    );
}

export default Profile;