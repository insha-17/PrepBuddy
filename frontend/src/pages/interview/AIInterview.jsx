import { useState } from "react";
import { generateInterviewQuestions } from "../../services/aiService";

function AIInterview() {
    const [topic, setTopic] = useState("Java");
    const [difficulty, setDifficulty] = useState("Medium");
    const [count, setCount] = useState(5);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        try {
            setLoading(true);
            setError("");
            setQuestions([]);

            const response = await generateInterviewQuestions(
                topic,
                difficulty,
                count
            );

            setQuestions(response);
        } catch (err) {
            console.error(err);
            setError("Failed to generate interview questions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800">
                    AI Interview
                </h1>

                <p className="text-gray-500 mt-2">
                    Generate AI-powered interview questions for your preparation.
                </p>

                <div className="bg-white rounded-xl shadow p-6 mt-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Topic
                            </label>

                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Java, DBMS, Spring Boot..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Difficulty
                            </label>

                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Number of Questions
                            </label>

                            <select
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value))}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                        </div>

                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Generating..." : "Generate Questions"}
                    </button>

                    {error && (
                        <p className="text-red-500 mt-4">
                            {error}
                        </p>
                    )}
                </div>

                {questions.length > 0 && (
                    <div className="mt-8 space-y-4">

                        <h2 className="text-2xl font-bold">
                            Your Interview Questions
                        </h2>

                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow p-5"
                            >
                                <p className="font-semibold">
                                    {index + 1}.{" "}
                                    {typeof question === "string"
                                        ? question
                                        : question.question}
                                </p>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default AIInterview;