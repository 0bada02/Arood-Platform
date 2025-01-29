import axios from 'axios';
axios.defaults.withCredentials = true;

export const analyzePoetry = async (text) => {
    if (!text || text.trim() === '') {
        console.error("Error: Input text is empty.");
        return { error: "Input text cannot be empty" };
    }
    try {
        const response = await axios.post("http://localhost:8080/api/poetry/classify", { text });
        return response.data;
    } catch (error) {
        console.error("Error processing poetry:", error.response?.data || error.message);
        return { error: error.response?.data || "Unknown error occurred" };
    }
};