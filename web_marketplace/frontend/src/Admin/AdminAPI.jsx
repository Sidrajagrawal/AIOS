const BASE_API = import.meta.env.VITE_BACKEND_API;

export async function TotalUser() {
    try {
        // 1. Grab the token from local storage
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE_API}/admin/totalUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching user data:", err);
        return null;
    }
}

export async function AddAgentByRole(formData) {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE_API}/admin/addAgentByRole`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;

    } catch (err) {
        throw err;
    }
}


export async function GetAllAgents() {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_API}/admin/showAllAgents`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || "Failed to fetch agents");
        }

        return data;

    } catch (err) {
        console.error("Error fetching agents:", err);
        return null;
    }
}