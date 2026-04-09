import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Mail, Eye, EyeOff, Sparkles, CalendarDays, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-[80vh] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="hero-panel hidden rounded-[2rem] p-10 lg:block">
                <div className="section-kicker mb-6">
                    <Sparkles className="h-4 w-4" />
                    Student access
                </div>
                <h1 className="text-4xl font-black leading-tight text-white">Welcome back to the center of campus activity.</h1>
                <p className="mt-5 text-base leading-8 text-slate-300">
                    Sign in to manage your registrations, discover upcoming events, and keep your college life organized from one place.
                </p>
                <div className="mt-8 space-y-4">
                    <BenefitRow icon={<CalendarDays className="h-5 w-5" />} title="Track every event" description="See what you joined and what is coming next." />
                    <BenefitRow icon={<ShieldCheck className="h-5 w-5" />} title="Verified campus access" description="Students and admins work in the same secure experience." />
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto w-full max-w-md lg:max-w-none">
                <div className="surface-panel relative overflow-hidden rounded-[2rem] p-8">
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-electric-500/20 blur-[60px]" />

                    <div className="relative z-10">
                        <div className="mb-8 text-center">
                            <h2 className="mb-2 text-3xl font-bold text-white">Welcome Back</h2>
                            <p className="text-slate-300">Sign in to your account</p>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600">
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email</label>
                                <div className="field-shell group">
                                    <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-electric-500" />
                                    <input
                                        type="email"
                                        className="field-input pl-12"
                                        placeholder="you@college.edu"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Password</label>
                                <div className="field-shell group">
                                    <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-neon-purple" />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        className="field-input pl-12 pr-12"
                                        placeholder="********"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-3.5 text-slate-400 transition-colors hover:text-slate-700">
                                        {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex cursor-pointer items-center gap-2 text-slate-300 hover:text-slate-700">
                                    <input type="checkbox" className="rounded border-navy-700 bg-white text-electric-500 focus:ring-electric-500/50" />
                                    Remember me
                                </label>
                                <a href="#" className="text-electric-500 transition-colors hover:text-electric-400">Forgot password?</a>
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary mt-2 flex w-full items-center justify-center gap-2 group disabled:cursor-not-allowed disabled:opacity-50">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Signing in...
                                    </span>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 border-t border-navy-700/70 pt-6 text-center">
                            <p className="text-slate-300">
                                New here?{' '}
                                <Link to="/register" className="font-medium text-electric-500 transition-colors hover:text-electric-400">
                                    Create an account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 rounded-xl border border-night-900/8 bg-navy-900/35 p-4 text-xs text-slate-300">
                            <p className="mb-1 font-semibold">Demo Credentials:</p>
                            <p>Admin: admin@campuspulse.com / admin123</p>
                            <p>Student: student@campuspulse.com / student123</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const BenefitRow = ({ icon, title, description }) => (
    <div className="flex gap-4 rounded-[1.5rem] border border-night-900/8 bg-night-800/40 p-5">
        <div className="mt-1 rounded-2xl bg-electric-500/12 p-3 text-electric-500">{icon}</div>
        <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm leading-7 text-slate-300">{description}</p>
        </div>
    </div>
);

export default Login;
