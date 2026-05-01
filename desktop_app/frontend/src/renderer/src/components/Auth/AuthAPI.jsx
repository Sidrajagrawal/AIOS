const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function sendOtp(email) {
    const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to send OTP");
    return data;
}

export async function verify(email, otp) {
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Verification failed");
    return data;
}