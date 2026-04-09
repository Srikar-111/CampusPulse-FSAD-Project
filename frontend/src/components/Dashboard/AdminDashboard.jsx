import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Calendar, Activity, TrendingUp, UserCheck, Building } from 'lucide-react';
import { userAPI, clubAPI, eventAPI, registrationAPI } from '../../services/apiService';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalStudents: 0, totalAdmins: 0, totalEvents: 0, totalClubs: 0 });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [usersResponse, clubsResponse, eventsResponse] = await Promise.all([
                userAPI.getStats(),
                clubAPI.getAll(),
                eventAPI.getAll()
            ]);

            const usersData = usersResponse.data.data || {};
            const clubsData = clubsResponse.data.data || [];
            const eventsData = eventsResponse.data.data || [];

            setStats({
                totalUsers: usersData.totalUsers || 0,
                totalStudents: usersData.totalStudents || 0,
                totalAdmins: usersData.totalAdmins || 0,
                totalEvents: eventsData.length,
                totalClubs: clubsData.length
            });

            // Generate recent activity from events
            const activity = eventsData.slice(0, 5).map(event => ({
                user: event.clubName || 'Admin',
                action: 'Created Event',
                target: event.name,
                time: 'Recently',
                status: 'Success'
            }));

            setRecentActivity(activity);
        } catch (error) {
            console.error('Failed to load admin dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="w-10 h-10 border-4 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
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
                    background: 'linear-gradient(135deg, rgba(109,89,122,0.18) 0%, rgba(192,108,132,0.18) 100%)',
                    border: '1px solid rgba(109,89,122,0.22)',
                }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 rounded-full blur-[80px]" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
                        <p className="text-slate-700">Manage your campus ecosystem.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn-primary flex items-center gap-2 text-sm">
                            <Plus className="w-4 h-4" /> Create Event
                        </button>
                        <button className="btn-secondary flex items-center gap-2 text-sm">
                            <Plus className="w-4 h-4" /> Add Club
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard icon={<Users className="w-5 h-5" />} color="text-electric-500" label="Total Users" value={stats.totalUsers} change="+12%" />
                <StatCard icon={<UserCheck className="w-5 h-5" />} color="text-neon-cyan" label="Students" value={stats.totalStudents} change="+8%" />
                <StatCard icon={<Users className="w-5 h-5" />} color="text-neon-purple" label="Admins" value={stats.totalAdmins} />
                <StatCard icon={<Calendar className="w-5 h-5" />} color="text-gold-500" label="Active Events" value={stats.totalEvents} change="+3" />
                <StatCard icon={<Building className="w-5 h-5" />} color="text-electric-500" label="Total Clubs" value={stats.totalClubs} change="+2" />
            </div>

            <div className="glass-card">
                <h2 className="text-xl font-bold text-white mb-5">Recent Activity</h2>
                {recentActivity.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No recent activity to display</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-night-900/10 text-xs uppercase tracking-wider text-slate-400">
                                    <th className="pb-3 pl-4 font-semibold">User</th>
                                    <th className="pb-3 font-semibold">Action</th>
                                    <th className="pb-3 font-semibold">Target</th>
                                    <th className="pb-3 font-semibold">Time</th>
                                    <th className="pb-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-night-900/10 text-sm">
                                {recentActivity.map((row, idx) => (
                                    <Row key={idx} {...row} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, color, label, value, change }) => (
    <motion.div whileHover={{ y: -3, scale: 1.02 }} className="glass-card">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-2.5 rounded-lg bg-night-900/5 ${color}`}>{icon}</div>
            {change && (
                <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-500/10 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3" /> {change}
                </span>
            )}
        </div>
        <p className="text-sm text-slate-300 mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
    </motion.div>
);

const Row = ({ user, action, target, time, status }) => (
    <tr className="hover:bg-night-900/[.03] transition-colors">
        <td className="py-3.5 pl-4 font-medium text-slate-200">{user}</td>
        <td className="py-3.5 text-slate-300">{action}</td>
        <td className="py-3.5 text-electric-500 font-medium">{target}</td>
        <td className="py-3.5 text-slate-400 text-xs">{time}</td>
        <td className="py-3.5">
            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${status === 'Success' ? 'bg-green-500/15 text-green-700' : 'bg-gold-400/15 text-gold-500'
                }`}>
                {status}
            </span>
        </td>
    </tr>
);

export default AdminDashboard;
