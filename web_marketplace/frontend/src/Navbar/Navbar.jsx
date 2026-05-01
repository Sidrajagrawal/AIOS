import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Invalid user data", err);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate('/authentication');
    };

    useEffect(() => {
        const handleClick = () => setOpen(false);
        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <nav className="text-white w-full h-[12vh] flex font-sans fixed">

            <div onClick={() => navigate('/')} className="part-I w-[20%] h-full flex justify-end items-center text-3xl font-medium tracking-tight cursor-pointer">
                AI OS
            </div>

            <div className="part-II w-[60%] h-full flex justify-center items-center">
                <ul className="flex gap-10 text-md text-[#AFAFAF] font-medium">
                    <li onClick={() => navigate('/packages')} className="hover:text-white mt-2 cursor-pointer transition-colors duration-200">Packages</li>
                    <li onClick={() => navigate('/docs')} className="hover:text-white cursor-pointer transition-colors duration-200 mt-2">Documents</li>
                    <li onClick={() => navigate('/contact')} className="hover:text-white cursor-pointer transition-colors duration-200 mt-2">Contact</li>
                    {!user && (
                        <li
                            onClick={() => navigate('/authentication')}
                            className="hover:text-white cursor-pointer mt-2"
                        >
                            Login
                        </li>
                    )}

                    {user && (
                        <div className="relative">
                            <img
                                src={user.picture}
                                alt="user"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen(!open);
                                }}
                                className="w-10 h-10 rounded-full cursor-pointer border border-gray-600 hover:scale-105 transition"
                            />

                            {open && (
                                <div className="absolute right-0 top-full mt-3 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl p-4">

                                    <p className="text-sm font-semibold text-white">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-gray-400 break-all mt-1">
                                        {user.email}
                                    </p>
                                    {user.role === 'admin' ? <button onClick={() => navigate('/admin')} className="w-full text-left text-sm text-gray-300 hover:text-white transition-colors mt-4">
                                        Admin Profile
                                    </button> : <></>}

                                    <hr className="my-3 border-gray-700" />

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Logout
                                    </button>

                                </div>)}
                        </div>
                    )}
                </ul>
            </div>

            <div className="part-III w-[20%] h-full flex items-center">
                {/* 
                  Converted button to an anchor tag (<a>) for native downloading 
                  Using the direct Google Drive download trick!
                */}
                <a
                    href="https://drive.google.com/uc?export=download&id=1-UORBU1xSlJEtlAUvyJ_IsjfJSQ0jFI-"
                    className="bg-[#FF5A06] text-white font-semibold text-sm px-8 py-3.5 
                               rounded-tr-3xl rounded-bl-3xl 
                               hover:bg-[#eb4f00] 
                               transition-all duration-300 ease-in-out
                               hover:shadow-[0_4px_20px_rgba(255,90,6,0.4)] 
                               hover:-translate-y-0.5 active:translate-y-0
                               inline-block cursor-pointer"
                >
                    Downloads
                </a>
            </div>

        </nav>
    );
}

export default Navbar;