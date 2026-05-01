const API_BASE_URL = "http://localhost:8000/api/v1";

async function PromptApi(data) {
    try {      
        const response = await fetch(`${API_BASE_URL}/callAgent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Backend Response:", result);
        return result;
    } catch (error) {
        console.error("Failed to connect to AI OS Core:", error);
    }
}

export default PromptApi;