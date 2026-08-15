import { useState } from "react";
import Layout from "../../components/layout/Layout";
import { analyzeResume } from "../../services/aiService";

function ResumeAnalysis() {

    const [resumeText, setResumeText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {

        if (!resumeText.trim()) {
            setError("Please enter your resume text.");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        try {
            const response = await analyzeResume(resumeText);
            setResult(response);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        AI Resume Analyzer
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Get AI-powered feedback on your resume.
                    </p>

                    <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume here..."
                        className="w-full h-64 mt-6 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && (
                        <p className="text-red-500 mt-3">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="mt-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl"
                    >
                        {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>

                </div>

                {result && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            AI Analysis
                        </h2>

                        <div className="text-center mb-8">
                            <div className="text-5xl font-bold text-blue-600">
                                {result.score}/100
                            </div>
                            <p className="text-gray-500 mt-2">Resume Score</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <h3 className="text-xl font-bold mb-3">
                                    💪 Strengths
                                </h3>

                                <ul className="list-disc pl-5 space-y-2">
                                    {result.strengths?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">
                                    ⚠️ Weaknesses
                                </h3>

                                <ul className="list-disc pl-5 space-y-2">
                                    {result.weaknesses?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">
                                    🎯 ATS Suggestions
                                </h3>

                                <ul className="list-disc pl-5 space-y-2">
                                    {result.atsSuggestions?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">
                                    📚 Missing Skills
                                </h3>

                                <ul className="list-disc pl-5 space-y-2">
                                    {result.missingSkills?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                    </div>
                )}

            </div>

        </Layout>
    );
}

export default ResumeAnalysis;