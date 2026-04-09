import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="app-shell relative min-h-screen overflow-hidden bg-navy-950 text-slate-200">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 h-[600px] w-[600px] animate-float rounded-full bg-electric-500/[.10] blur-[160px]" />
                <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] animate-float-slow rounded-full bg-neon-purple/[.12] blur-[160px]" />
                <div className="absolute -bottom-40 left-1/3 h-[420px] w-[420px] animate-float-slower rounded-full bg-gold-400/[.12] blur-[140px]" />
            </div>

            <div className="mesh-line fixed inset-0 z-0 pointer-events-none opacity-[0.55]" />

            <div className="relative z-10 font-sans">
                <Navbar />
                <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
