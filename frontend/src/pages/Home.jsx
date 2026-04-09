import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BarChart3, Shield, Globe, Zap, Users, Calendar, CheckCircle2, Radio, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-10 pb-8 pt-4 lg:space-y-14">
            <div className="hero-panel relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_52%)] lg:block" />
                <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="max-w-3xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-kicker mb-6">
                            <Sparkles className="h-4 w-4" />
                            Campus life, finally designed like it matters
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-heading max-w-4xl">
                            The social pulse of campus, built for the students who actually show up.
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="section-copy mt-6 max-w-2xl">
                            CampusPulse brings events, clubs, registrations, and campus momentum into one polished experience.
                            Browse what is happening, join communities faster, and keep your college life organized without the clutter.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
                            <Link to="/events" className="btn-primary group flex items-center gap-2 px-8 py-4 text-base">
                                Explore Events
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link to="/register" className="btn-secondary flex items-center gap-2 px-8 py-4 text-base">
                                Create Account
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-10 grid gap-4 sm:grid-cols-3">
                            <Metric value="5K+" label="Students active across the platform" />
                            <Metric value="120+" label="Events already tracked and organized" />
                            <Metric value="45+" label="Clubs building stronger communities" />
                        </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }} className="surface-panel rounded-[2rem] p-5 sm:p-6">
                        <div className="rounded-[1.5rem] bg-night-950 px-5 py-5 text-white shadow-2xl shadow-night-900/20 sm:px-6">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-white/60">Live Snapshot</p>
                                    <h2 className="mt-2 text-2xl font-bold">Tonight on campus</h2>
                                </div>
                                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold-300">Updated live</div>
                            </div>

                            <div className="space-y-3">
                                <DashboardRow icon={<Calendar className="h-4 w-4" />} label="Design Expo 2026" meta="7:00 PM • Main Hall" accent="text-electric-300" />
                                <DashboardRow icon={<Users className="h-4 w-4" />} label="Robotics Club Mixer" meta="84 members checked in" accent="text-gold-300" />
                                <DashboardRow icon={<Radio className="h-4 w-4" />} label="Open registrations" meta="HackSprint closes in 2 hours" accent="text-pink-300" />
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <MiniTile value="92%" label="Attendance" />
                                <MiniTile value="18" label="Open clubs" />
                                <MiniTile value="4.9" label="Avg rating" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="surface-panel rounded-[2rem] p-8 sm:p-10">
                    <div className="section-kicker mb-5">
                        <CheckCircle2 className="h-4 w-4" />
                        Why it feels better
                    </div>
                    <h2 className="text-3xl font-black text-white sm:text-4xl">Fast to scan. Easy to trust. Built to drive participation.</h2>
                    <div className="mt-8 space-y-5">
                        <Benefit icon={<BarChart3 className="h-5 w-5" />} title="Signal over noise" description="Event details, club info, and calls to action are structured to help students decide quickly." />
                        <Benefit icon={<Shield className="h-5 w-5" />} title="Confident discovery" description="A cleaner hierarchy makes official events, categories, and availability feel more trustworthy." />
                        <Benefit icon={<Globe className="h-5 w-5" />} title="A living campus feed" description="The product now feels less like a form portal and more like an active campus ecosystem." />
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="surface-panel rounded-[2rem] p-8 sm:p-10">
                    <div className="section-kicker mb-5">
                        <Trophy className="h-4 w-4" />
                        Quick access
                    </div>
                    <div className="grid gap-4">
                        <QuickAccessCard to="/clubs" icon={<Users className="w-8 h-8" />} title="Browse Clubs" description="Find your people, not just a list." gradient="from-electric-500 to-cyan-500" />
                        <QuickAccessCard to="/events" icon={<Calendar className="w-8 h-8" />} title="Explore Events" description="See what deserves your evening." gradient="from-neon-purple to-pink-500" />
                        <QuickAccessCard to="/dashboard" icon={<Zap className="w-8 h-8" />} title="My Dashboard" description="Track registrations and upcoming plans." gradient="from-gold-500 to-orange-500" />
                    </div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="surface-panel rounded-[2rem] p-8 sm:p-10">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="section-kicker mb-4">Explore the platform</div>
                        <h2 className="text-3xl font-black text-white sm:text-4xl">A calmer, sharper way to navigate campus life.</h2>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                        Every section is designed to feel connected, from discovery to registration to admin management.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FeatureCard icon={<BarChart3 className="w-6 h-6" />} iconColor="text-electric-500" glowColor="bg-electric-500" title="Live analytics" desc="Track registrations, event momentum, and club growth with much better visual clarity." />
                    <FeatureCard icon={<Shield className="w-6 h-6" />} iconColor="text-neon-purple" glowColor="bg-neon-purple" title="Clean administration" desc="Students and admins now move through the same polished design language with less friction." />
                    <FeatureCard icon={<Globe className="w-6 h-6" />} iconColor="text-gold-500" glowColor="bg-gold-400" title="Campus-wide connection" desc="A more intentional visual hierarchy makes the whole platform feel alive and worth exploring." />
                </div>
            </motion.div>
        </div>
    );
};

const Metric = ({ value, label }) => (
    <div className="stat-tile">
        <div className="text-3xl font-black text-white">{value}</div>
        <div className="mt-2 text-sm leading-6 text-slate-300">{label}</div>
    </div>
);

const DashboardRow = ({ icon, label, meta, accent }) => (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className={`rounded-xl bg-white/10 p-2 ${accent}`}>{icon}</div>
        <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{label}</p>
            <p className="truncate text-xs text-white/60">{meta}</p>
        </div>
    </div>
);

const MiniTile = ({ value, label }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center">
        <div className="text-xl font-bold text-white">{value}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">{label}</div>
    </div>
);

const Benefit = ({ icon, title, description }) => (
    <div className="flex gap-4 rounded-[1.5rem] border border-night-900/8 bg-night-800/40 p-5">
        <div className="mt-1 rounded-2xl bg-electric-500/12 p-3 text-electric-500">{icon}</div>
        <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm leading-7 text-slate-300">{description}</p>
        </div>
    </div>
);

const FeatureCard = ({ icon, iconColor, glowColor, title, desc }) => (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-card group relative overflow-hidden text-left">
        <div className={`absolute -right-10 -top-10 h-32 w-32 ${glowColor} rounded-full blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-20`} />
        <div className="relative mb-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-night-900/5 ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
                {icon}
            </div>
        </div>
        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-electric-500">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-300">{desc}</p>
    </motion.div>
);

const QuickAccessCard = ({ to, icon, title, description, gradient }) => (
    <Link to={to} className="group relative overflow-hidden rounded-[1.75rem] border border-night-900/10 bg-night-800/50 p-6 transition-all duration-300 hover:-translate-y-1">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 transition-opacity group-hover:opacity-20`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 blur-xl transition-opacity group-hover:opacity-5`} />
        <div className="relative z-10 flex items-center gap-4 text-left">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm text-slate-300">{description}</p>
            </div>
        </div>
    </Link>
);

export default Home;
