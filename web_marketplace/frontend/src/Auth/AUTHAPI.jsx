const BASE_API = import.meta.env.VITE_BACKEND_API;

async function AUTHAPI(id_token) {
    try {
        const res = await fetch(`${BASE_API}/auth/google`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: id_token
            })
        });

        const data = await res.json();

        if (res.ok) {
            return { status: true, data: data };
        }

        return { status: false, message: data.message };

    } catch (err) {
        console.error("Login failed", err);
        return { status: false, message: "Something went wrong" };
    }
}

export default AUTHAPI;
