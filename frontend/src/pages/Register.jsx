import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Mail, BookOpen, GraduationCap, Wand2, Users, CalendarDays } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'STUDENT' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(formData.name, formData.email, formData.password, formData.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-[80vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto w-full max-w-md lg:max-w-none">
                <div className="surface-panel relative overflow-hidden rounded-[2rem] p-8">
                    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-neon-purple/20 blur-[60px]" />

                    <div className="relative z-10">
                        <div className="mb-8 text-center">
                            <h2 className="mb-2 text-3xl font-bold text-white">Get Started</h2>
                            <p className="text-slate-300">Create your campus account</p>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600">
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <RoleBtn active={formData.role === 'STUDENT'} onClick={() => setFormData({ ...formData, role: 'STUDENT' })} icon={<GraduationCap className="h-5 w-5" />} label="Student" activeColor="electric" />
                                <RoleBtn active={formData.role === 'ADMIN'} onClick={() => setFormData({ ...formData, role: 'ADMIN' })} icon={<BookOpen className="h-5 w-5" />} label="Admin" activeColor="purple" />
                            </div>

                            <InputField label="Full Name" icon={<User className="h-5 w-5" />} type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            <InputField label="Email" icon={<Mail className="h-5 w-5" />} type="email" placeholder="you@college.edu" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            <InputField label="Password" icon={<Lock className="h-5 w-5" />} type="password" placeholder="Create a password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            <InputField label="Confirm Password" icon={<Lock className="h-5 w-5" />} type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

                            <button type="submit" disabled={loading} className="btn-primary mt-2 flex w-full items-center justify-center gap-2 group disabled:cursor-not-allowed disabled:opacity-50">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Creating account...
                                    </span>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 border-t border-navy-700/70 pt-6 text-center">
                            <p className="text-slate-300">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-electric-500 transition-colors hover:text-electric-400">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="hero-panel hidden rounded-[2rem] p-10 lg:block">
                <div className="section-kicker mb-6">
                    <Wand2 className="h-4 w-4" />
                    New account
                </div>
                <h2 className="text-4xl font-black leading-tight text-white">Create your space in the most active part of campus.</h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                    Join events faster, discover student communities, and keep track of everything you care about in one place.
                </p>
                <div className="mt-8 space-y-4">
                    <BenefitRow icon={<Users className="h-5 w-5" />} title="Join the right communities" description="Clubs and events are easier to browse, compare, and commit to." />
                    <BenefitRow icon={<CalendarDays className="h-5 w-5" />} title="Stay ahead of campus" description="Your dashboard keeps registrations and upcoming moments in view." />
                </div>
            </motion.div>
        </div>
    );
};

const RoleBtn = ({ active, onClick, icon, label, activeColor }) => {
    const colors = activeColor === 'electric'
        ? { bg: 'bg-electric-500/15', border: 'border-electric-500/50', text: 'text-electric-500' }
        : { bg: 'bg-neon-purple/15', border: 'border-neon-purple/45', text: 'text-neon-purple' };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                active
                    ? `${colors.bg} ${colors.border} ${colors.text} shadow-lg`
                    : 'border-navy-700 bg-night-800/60 text-slate-300 hover:border-navy-600'
            }`}
        >
            {icon}
            <span className="text-sm font-semibold">{label}</span>
        </button>
    );
};

const InputField = ({ label, icon, ...inputProps }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="field-shell group">
            <span className="absolute left-4 top-4 text-slate-400 transition-colors group-focus-within:text-electric-500">
                {icon}
            </span>
            <input className="field-input pl-12" required {...inputProps} />
        </div>
    </div>
);

const BenefitRow = ({ icon, title, description }) => (
    <div className="flex gap-4 rounded-[1.5rem] border border-night-900/8 bg-night-800/40 p-5">
        <div className="mt-1 rounded-2xl bg-neon-purple/12 p-3 text-neon-purple">{icon}</div>
        <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm leading-7 text-slate-300">{description}</p>
        </div>
    </div>
);

export default Register;
