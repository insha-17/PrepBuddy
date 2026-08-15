import {
    FileText,
    MessageSquare,
    User,
    TrendingUp
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <Layout>

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-800">
                  Welcome Back, {user?.name} 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Here's an overview of your interview preparation.
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

              <DashboardCard
                  title="Resume Score"
                  value="85%"
                  description="Current ATS Score"
                  icon={FileText}
              />

              <DashboardCard
                  title="AI Interviews"
                  value="12"
                  description="Practice Sessions"
                  icon={MessageSquare}
              />

              <DashboardCard
                  title="Profile"
                  value="90%"
                  description="Profile Completion"
                  icon={User}
              />

              <DashboardCard
                  title="Progress"
                  value="7 Days"
                  description="Current Streak"
                  icon={TrendingUp}
              />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div
                    onClick={() => navigate("/resume")}
                    className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition"
                >
                    <h2 className="text-xl font-bold">📄 Resume Analyzer</h2>
                    <p className="text-gray-500 mt-2">
                        Analyze your resume with AI and get improvement suggestions.
                    </p>
                </div>

                <div
                    onClick={() => navigate("/interview")}
                    className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition"
                >
                    <h2 className="text-xl font-bold">🤖 AI Interview</h2>
                    <p className="text-gray-500 mt-2">
                        Generate personalized technical interview questions.
                    </p>
                </div>

                <div
                    onClick={() => navigate("/interview/evaluate")}
                    className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition"
                >
                    <h2 className="text-xl font-bold">🎯 Answer Evaluation</h2>
                    <p className="text-gray-500 mt-2">
                        Get AI feedback and a score for your interview answers.
                    </p>
                </div>

            </div>
        </Layout>
    );
}

export default Dashboard;