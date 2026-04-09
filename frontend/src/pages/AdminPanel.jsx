import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, Building, TrendingUp, UserCheck, Activity, Plus, Edit, Trash2 } from 'lucide-react';
import { userAPI, clubAPI, eventAPI, registrationAPI } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
    const { isAdmin, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!isAdmin) return;
        loadData();
    }, [authLoading, isAdmin]);

    const loadData = async () => {
        try {
            const [statsRes, usersRes, clubsRes, eventsRes] = await Promise.all([
                userAPI.getStats(),
                userAPI.getAllUsers(),
                clubAPI.getAll(),
                eventAPI.getAll()
            ]);
            setStats(statsRes.data.data || {});
            setUsers(usersRes.data.data || []);
            setClubs(clubsRes.data.data || []);
            setEvents(eventsRes.data.data || []);
        } catch (error) {
            console.error('Failed to load admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                    background: 'linear-gradient(135deg, rgba(109,89,122,0.18) 0%, rgba(192,108,132,0.18) 100%)',
                    border: '1px solid rgba(109,89,122,0.22)',
                }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 rounded-full blur-[80px]" />
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Control Panel</h1>
                    <p className="text-slate-700">Complete oversight of your campus ecosystem</p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard icon={<Users className="w-5 h-5" />} color="text-electric-500" label="Total Users" value={stats.totalUsers || 0} />
                <StatCard icon={<UserCheck className="w-5 h-5" />} color="text-neon-cyan" label="Students" value={stats.totalStudents || 0} />
                <StatCard icon={<Users className="w-5 h-5" />} color="text-neon-purple" label="Admins" value={stats.totalAdmins || 0} />
                <StatCard icon={<Calendar className="w-5 h-5" />} color="text-gold-500" label="Events" value={events.length} />
                <StatCard icon={<Building className="w-5 h-5" />} color="text-electric-500" label="Clubs" value={clubs.length} />
            </div>

            {/* Tabs */}
            <div className="glass-card p-2 flex gap-2 overflow-x-auto">
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} text="Overview" />
                <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} text={`Users (${users.length})`} />
                <TabButton active={activeTab === 'clubs'} onClick={() => setActiveTab('clubs')} text={`Clubs (${clubs.length})`} />
                <TabButton active={activeTab === 'events'} onClick={() => setActiveTab('events')} text={`Events (${events.length})`} />
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && <OverviewTab stats={stats} users={users} clubs={clubs} events={events} />}
            {activeTab === 'users' && <UsersTab users={users} />}
            {activeTab === 'clubs' && <ClubsTab clubs={clubs} />}
            {activeTab === 'events' && <EventsTab events={events} />}
        </div>
    );
};

const StatCard = ({ icon, color, label, value }) => (
    <motion.div whileHover={{ y: -3, scale: 1.02 }} className="glass-card">
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-night-900/5 ${color}`}>{icon}</div>
        </div>
        <p className="text-sm text-slate-300">{label}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
    </motion.div>
);

const TabButton = ({ active, onClick, text }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${active
                ? 'bg-night-900 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-night-900/5'
            }`}
    >
        {text}
    </button>
);

const OverviewTab = ({ stats, users, clubs, events }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-electric-500" />
                    Recent Registrations
                </h3>
                <div className="space-y-3">
                    {events.slice(0, 5).map(event => (
                        <div key={event.id} className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                            <div>
                                <p className="font-medium text-slate-200">{event.name}</p>
                                <p className="text-sm text-slate-400">{event.clubName}</p>
                            </div>
                            <span className="text-sm text-slate-300">{event.registrationCount || 0} registered</span>
                        </div>
                    ))}
                    {events.length === 0 && (
                        <p className="text-slate-400 text-center py-4">No events yet</p>
                    )}
                </div>
            </div>

            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-neon-purple" />
                    Quick Stats
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                        <span className="text-slate-300">User Growth</span>
                        <span className="text-green-600 font-semibold">+12% this month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                        <span className="text-slate-300">Event Participation</span>
                        <span className="text-green-600 font-semibold">
                            {events.reduce((acc, e) => acc + (e.registrationCount || 0), 0)} total
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                        <span className="text-slate-300">Active Clubs</span>
                        <span className="text-electric-500 font-semibold">{clubs.length} clubs</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                        <span className="text-slate-300">Upcoming Events</span>
                        <span className="text-neon-purple font-semibold">
                            {events.filter(e => new Date(e.date) > new Date()).length} events
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const UsersTab = ({ users }) => (
    <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-night-900/10 text-xs uppercase tracking-wider text-slate-400">
                        <th className="pb-3 pl-4 font-semibold">Name</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold">Role</th>
                        <th className="pb-3 font-semibold">Joined</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-night-900/10 text-sm">
                    {users.map((user, idx) => (
                        <tr key={user.id} className="hover:bg-night-900/[.03] transition-colors">
                            <td className="py-3.5 pl-4 font-medium text-slate-200">{user.name}</td>
                            <td className="py-3.5 text-slate-300">{user.email}</td>
                            <td className="py-3.5">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${user.role === 'ADMIN'
                                        ? 'bg-neon-purple/15 text-neon-purple'
                                        : 'bg-electric-500/15 text-electric-500'
                                    }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="py-3.5 text-slate-400">{user.createdAt?.split('T')[0] || 'Recently'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ClubsTab = ({ clubs }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club, idx) => (
            <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card group"
            >
                <div className={`h-16 -mx-6 -mt-6 mb-4 bg-gradient-to-r ${club.color || 'from-slate-500 to-gray-500'} opacity-20 rounded-t-xl`} />
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${club.color || 'from-slate-500 to-gray-500'} flex items-center justify-center text-white font-bold`}>
                        {club.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-white">{club.name}</h3>
                        <p className="text-xs text-slate-400">{club.eventCount || 0} events</p>
                    </div>
                </div>
                <p className="text-sm text-slate-300 mb-4">{club.description}</p>
                <div className="flex gap-2">
                    <button className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1">
                        <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button className="px-3 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
            </motion.div>
        ))}
    </div>
);

const EventsTab = ({ events }) => (
    <div className="grid grid-cols-1 gap-4">
        {events.map((event, idx) => (
            <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card flex flex-col md:flex-row gap-4 items-start md:items-center"
            >
                <img
                    src={event.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=200'}
                    alt={event.name}
                    className="w-full md:w-32 h-24 object-cover rounded-xl"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-electric-500/15 text-electric-500 text-xs font-semibold">
                            {event.category}
                        </span>
                        <span className="text-xs text-slate-400">{event.clubName}</span>
                    </div>
                    <h3 className="font-bold text-white truncate">{event.name}</h3>
                    <p className="text-sm text-slate-300 truncate">{event.description}</p>
                </div>
                <div className="flex items-center gap-4 md:text-right">
                    <div>
                        <p className="text-sm font-medium text-slate-700">{event.date}</p>
                        <p className="text-xs text-slate-400">{event.venue}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-electric-500/10 text-slate-300 hover:text-electric-500 transition-colors">
                            <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
);

export default AdminPanel;
