import { useState } from 'react';
import { sendOtp, verify } from './AuthAPI.jsx';

function AuthHome({ onVerify, setAgentData }) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            setStatusMsg("Operator email required.");
            return;
        }

        try {
            setIsLoading(true);
            setStatusMsg("Dispatching code...");
            await sendOtp(email);
            setStatusMsg("Code dispatched successfully.");
        } catch (error) {
            setStatusMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (email && otp) {
            try {
                setIsLoading(true);
                setStatusMsg("Verifying credentials...");

                const result = await verify(email, otp);
                console.log(result);
                
                if (result.status === "success") {
                    const fetchedAgents = result.agents || [];
                    setAgentData(fetchedAgents);

                    localStorage.setItem('isVerified', 'true');
                    localStorage.setItem('agentData', JSON.stringify(fetchedAgents));

                    onVerify();
                }
            } catch (error) {
                setStatusMsg(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <div className="bg-[#070b14]/80 border border-cyan-900/50 rounded-xl p-8 w-96 shadow-[0_0_30px_rgba(0,240,255,0.05)] backdrop-blur-md">

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest font-mono">
                    System Auth
                </h2>
                <p className="text-cyan-600/70 text-xs mt-2 uppercase tracking-wide">Enter credentials to initialize</p>
            </div>

            <div className="h-4 mb-4 text-center">
                <p className="text-[10px] text-cyan-400 font-mono tracking-widest animate-pulse">
                    {statusMsg}
                </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">

                <div>
                    <div className="flex justify-between items-end mb-2">
                        <label className="block text-xs text-cyan-500 uppercase tracking-wider font-mono">Operator Email</label>
                        <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={isLoading}
                            className="text-[10px] text-cyan-400 hover:text-cyan-200 transition-colors uppercase tracking-widest border border-cyan-800 rounded px-2 py-1 bg-cyan-950/30 disabled:opacity-50"
                        >
                            Send OTP
                        </button>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#03050a] border border-cyan-900/60 rounded px-4 py-2 text-cyan-100 font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-all duration-300"
                        placeholder="operator@domain.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs text-cyan-500 mb-2 uppercase tracking-wider font-mono">One Time Password</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full bg-[#03050a] border border-cyan-900/60 rounded px-4 py-2 text-cyan-100 font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-all duration-300 text-center tracking-[0.5em] text-lg"
                        placeholder="000000"
                        maxLength={6}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 py-3 rounded hover:bg-cyan-500 hover:text-[#03050a] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 uppercase text-sm tracking-widest font-bold font-mono disabled:opacity-50"
                >
                    {isLoading ? 'Processing...' : 'Verify'}
                </button>

            </form>
        </div>
    );
}

export default AuthHome;