import { useNavigate } from 'react-router-dom';
function Services() {
    const navigate = useNavigate();
    const roles = [
        {
            title: 'DEVELOPER',
            description: 'Instant local environment setup, background dependency management, and automated testing workflows.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_12px_rgba(57,255,20,0.8)] mb-4">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            )
        },
        {
            title: 'CREATOR',
            description: 'Optimized rendering power, intelligent asset tagging, and seamless creative pipeline organization.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_12px_rgba(255,140,0,0.8)] mb-4">
                    <path d="M18 2l4 4-10 10-4-4 10-10z"></path>
                    <path d="M2 22l4-4"></path>
                    <path d="M14 6l4 4"></path>
                </svg>
            )
        },
        {
            title: 'GAMER',
            description: 'Background process silencing, automated driver updates, and maximum resource allocation for peak FPS.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_12px_rgba(0,191,255,0.8)] mb-4">
                    <line x1="6" y1="12" x2="10" y2="12"></line>
                    <line x1="8" y1="10" x2="8" y2="14"></line>
                    <line x1="15" y1="13" x2="15.01" y2="13"></line>
                    <line x1="18" y1="11" x2="18.01" y2="11"></line>
                    <path d="M22 14c0 3-2 5-5 5H7c-3 0-5-2-5-5V9c0-2 2-4 4-4h8c2 0 4 2 4 4v5z"></path>
                </svg>
            )
        },
        {
            title: 'STUDENT',
            description: 'Automated study scheduling, curated research organization, and forced focus-mode environments.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#9D00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_12px_rgba(157,0,255,0.8)] mb-4">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
            )
        }
    ];

    return (
        <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-16 px-8 md:px-16" style={{ backgroundImage: `url(${import.meta.env.VITE_HERO_II})` }}>
            <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-transparent z-0 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />



            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-10">
                    {roles.map((role, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5 cursor-pointer" >
                            {role.icon}
                            <h3 className="text-white font-bold tracking-widest text-sm mb-3">{role.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">{role.description}</p>
                        </div>
                    ))}
                </div>

                <button onClick={() => navigate('/packages')} className="group flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black">
                    Explore More Agents
                    <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
                </button>
            </div>
        </div>
    )
}
export default Services;