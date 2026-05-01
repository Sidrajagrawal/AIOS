const API_BASE_URL = 'http://localhost:8000/api/v1'
export async function ExecuteSetupAPI(payload) { 
    try {
        const res = await fetch(`${API_BASE_URL}/execute-cmd`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        
        if (!res.ok) throw new Error('Network response was not ok');
        
        const result = await res.json(); 
        return result;
    } catch (err) {
        console.error("API Fetch Error:", err);
        throw err;
    }
}
