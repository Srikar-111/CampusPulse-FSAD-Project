import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Calendar, Users, LogIn, LogOut, Menu, X, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, isAuthenticated, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="sticky top-0 z-50 px-4 pt-4"
        >
            <div className="surface-panel mx-auto flex max-w-7xl items-center justify-between rounded-[1.75rem] px-4 py-3 sm:px-6">
                <Link to="/" className="group flex items-center gap-3 text-xl font-bold tracking-tight">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-electric-500 blur-md opacity-35 transition-opacity group-hover:opacity-55" />
                        <div className="relative rounded-lg bg-night-900 p-2">
                            <Zap className="h-5 w-5 text-gold-300" />
                        </div>
                    </div>
                    <span className="hidden text-white sm:block">
                        Campus<span className="text-electric-500">Pulse</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-1 md:flex">
                    <TopNavLink to="/events" icon={<Calendar className="h-4 w-4" />} text="Events" />
                    <TopNavLink to="/clubs" icon={<Users className="h-4 w-4" />} text="Clubs" />
                    {isAuthenticated && (
                        <TopNavLink to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} text="Dashboard" />
                    )}
                    {isAdmin && (
                        <TopNavLink to="/admin" icon={<UserIcon className="h-4 w-4" />} text="Admin" />
                    )}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {isAuthenticated ? (
                        <>
                            <div className="rounded-full border border-night-900/10 bg-night-800/40 px-4 py-2 text-sm text-slate-300">
                                Hi, <span className="font-semibold text-white">{user?.name}</span>
                            </div>
                            <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 text-sm">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary flex items-center gap-2 text-sm">
                            <LogIn className="h-4 w-4" />
                            Sign In
                        </Link>
                    )}
                </div>

                <button onClick={() => setOpen(!open)} className="rounded-full border border-night-900/10 bg-white/60 p-2 text-slate-700 transition-colors hover:text-white md:hidden">
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="surface-panel mx-4 mt-2 rounded-[1.75rem] p-4 md:hidden"
                >
                    <div className="flex flex-col gap-2">
                        <MobileLink to="/events" text="Events" onClick={() => setOpen(false)} />
                        <MobileLink to="/clubs" text="Clubs" onClick={() => setOpen(false)} />
                        {isAuthenticated && (
                            <MobileLink to="/dashboard" text="Dashboard" onClick={() => setOpen(false)} />
                        )}
                        {isAdmin && (
                            <MobileLink to="/admin" text="Admin Panel" onClick={() => setOpen(false)} />
                        )}
                        {isAuthenticated ? (
                            <>
                                <div className="px-4 py-2 text-sm text-slate-300">Hi, {user?.name}</div>
                                <button onClick={handleLogout} className="btn-secondary text-center text-sm">
                                    <LogOut className="mr-2 inline h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn-primary mt-2 text-center text-sm">
                                <LogIn className="mr-2 inline h-4 w-4" />
                                Sign In
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

const TopNavLink = ({ to, icon, text }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                    ? 'bg-night-900 text-white shadow-lg shadow-night-900/15'
                    : 'text-slate-300 hover:bg-white/75 hover:text-white'
            }`
        }
    >
        {icon}
        {text}
    </NavLink>
);

const MobileLink = ({ to, text, onClick }) => (
    <Link to={to} onClick={onClick} className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition-all hover:bg-night-800/60 hover:text-white">
        {text}
    </Link>
);

export default Navbar;
