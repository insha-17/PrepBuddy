import { useState } from "react";
import { evaluateAnswer } from "../../services/aiService";

function AnswerEvaluation() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEvaluate = async () => {

        if (!question.trim() || !answer.trim()) {
            setError("Please enter both the question and your answer.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setResult(null);

            const response = await evaluateAnswer(question, answer);

            setResult(response);

        } catch (err) {
            console.error(err);
            setError("Failed to evaluate your answer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800">
                    AI Answer Evaluation
                </h1>

                <p className="text-gray-500 mt-2">
                    Get instant AI feedback on your interview answer.
                </p>

                <div className="bg-white rounded-xl shadow p-6 mt-8">

                    <label className="block font-medium mb-2">
                        Interview Question
                    </label>

                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="e.g. What is polymorphism in Java?"
                        className="w-full border rounded-lg p-3 h-28 mb-5"
                    />

                    <label className="block font-medium mb-2">
                        Your Answer
                    </label>

                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your interview answer here..."
                        className="w-full border rounded-lg p-3 h-40"
                    />

                    {error && (
                        <p className="text-red-500 mt-3">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleEvaluate}
                        disabled={loading}
                        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Evaluating..." : "Evaluate Answer"}
                    </button>

                </div>

                {result && (
                    <div className="bg-white rounded-xl shadow p-6 mt-6">

                        <h2 className="text-2xl font-bold mb-4">
                            AI Feedback
                        </h2>

                        <div className="text-4xl font-bold text-blue-600 mb-4">
                            {result.score}/100
                        </div>

                        <p className="text-gray-700 mb-5">
                            {result.feedback}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <h3 className="font-bold text-lg mb-2">
                                    Strengths
                                </h3>

                                <ul className="list-disc pl-5">
                                    {result.strengths?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-2">
                                    Improvements
                                </h3>

                                <ul className="list-disc pl-5">
                                    {result.improvements?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default AnswerEvaluation;