import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Award, MapPin, TrendingUp, Ticket } from 'lucide-react';
import { registrationAPI, eventAPI } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [stats, setStats] = useState({ events: 0, clubs: 2, hours: 12, certs: 1 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [regResponse, eventsResponse] = await Promise.all([
                registrationAPI.getMyRegistrations(),
                eventAPI.getUpcoming()
            ]);

            setRegistrations(regResponse.data.data || []);
            setUpcomingEvents(eventsResponse.data.data || []);
            setStats(prev => ({
                ...prev,
                events: (regResponse.data.data || []).length
            }));
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="w-10 h-10 border-4 border-electric-500/30 border-t-electric-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                    background: 'linear-gradient(135deg, rgba(42,157,143,0.18) 0%, rgba(214,149,62,0.16) 100%)',
                    border: '1px solid rgba(42,157,143,0.2)',
                }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/18 rounded-full blur-[80px]" />
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-2">Hello, {user?.name || 'Student'}!</h1>
                    <p className="text-slate-700 text-lg">Here's what's happening on campus today.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<Calendar className="w-5 h-5" />} color="text-electric-500" label="My Events" value={stats.events} />
                <StatCard icon={<Users className="w-5 h-5" />} color="text-neon-purple" label="My Clubs" value={stats.clubs} />
                <StatCard icon={<Clock className="w-5 h-5" />} color="text-neon-cyan" label="Hours Spent" value={stats.hours} />
                <StatCard icon={<Award className="w-5 h-5" />} color="text-gold-500" label="Certificates" value={stats.certs} />
            </div>

            <div>
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-electric-500" />
                    My Registrations
                </h2>
                {registrations.length === 0 ? (
                    <div className="glass-card text-center py-12">
                        <Ticket className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-300">You haven't registered for any events yet.</p>
                        <p className="text-slate-400 text-sm mt-1">Explore events and join the fun!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {registrations.map((reg, idx) => (
                            <EventCard
                                key={reg.id}
                                title={reg.eventName}
                                date={reg.registeredAt?.split('T')[0] || 'TBD'}
                                status={reg.status}
                                idx={idx}
                            />
                        ))}
                    </div>
                )}
            </div>

            {upcomingEvents.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-neon-purple" />
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {upcomingEvents.slice(0, 3).map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -3 }}
                                className="glass-card cursor-pointer group relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple rounded-tr-full rounded-br-full" />
                                <h3 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors mb-2">{event.name}</h3>
                                <p className="text-sm text-slate-300 flex items-center gap-1.5 mb-1">
                                    <Calendar className="w-3.5 h-3.5" /> {event.date}
                                </p>
                                <p className="text-sm text-slate-300 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" /> {event.venue}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, color, label, value }) => (
    <motion.div whileHover={{ y: -3, scale: 1.02 }} className="glass-card flex items-center gap-4">
        <div className={`p-2.5 rounded-lg bg-night-900/5 ${color}`}>{icon}</div>
        <div>
            <p className="text-sm text-slate-300">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </motion.div>
);

const EventCard = ({ title, date, status, idx }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        whileHover={{ y: -3 }}
        className="glass-card cursor-pointer group relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-1 h-full bg-electric-500 rounded-tr-full rounded-br-full" />
        <div className="flex justify-between items-start mb-3">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${status === 'CONFIRMED' ? 'bg-green-500/15 text-green-700' : 'bg-gold-400/15 text-gold-500'
                }`}>
                {status}
            </span>
            <span className="text-slate-400 text-sm">{date}</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-electric-500 transition-colors mb-2">{title}</h3>
    </motion.div>
);

export default StudentDashboard;
