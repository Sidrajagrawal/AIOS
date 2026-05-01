const BASE_API = import.meta.env.VITE_BACKEND_API;

export async function AssignAgent(agentId) {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_API}/agent/assignAgent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ agentIds: [agentId] })
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || "Failed to assign agent");
        }
        return data;

    } catch (err) {
        console.error("Assign Agent Error:", err);
        throw err;
    }
}