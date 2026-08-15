import api from "./api";

export const analyzeResume = async (resumeText) => {
    const response = await api.post(
        "/ai/resume/analyze",
        resumeText,
        {
            headers: {
                "Content-Type": "text/plain",
            },
        }
    );

    return response.data;
};

export const generateInterviewQuestions = async (
    topic,
    difficulty,
    count
) => {
    const response = await api.post(
        "/ai/interview/questions",
        null,
        {
            params: {
                topic,
                difficulty,
                count,
            },
        }
    );

    return response.data;
};

export const evaluateAnswer = async (
    question,
    answer
) => {
    const response = await api.post(
        "/ai/interview/evaluate",
        null,
        {
            params: {
                question,
                answer,
            },
        }
    );

    return response.data;
};