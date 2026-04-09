import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { isAuthenticated, isAdmin, isStudent, loading } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-electric-500/30 border-t-electric-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="space-y-6">
            {isAdmin && (
                <div className="glass-card flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-semibold text-slate-700">View Mode</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveView('dashboard')}
                            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${activeView === 'dashboard'
                                    ? 'bg-electric-500/20 text-electric-500 border border-electric-500/40 shadow-lg shadow-electric-500/10'
                                    : 'bg-night-800/70 text-slate-300 border border-navy-700 hover:border-navy-600'
                                }`}
                        >
                            Student View
                        </button>
                        <button
                            onClick={() => setActiveView('admin')}
                            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${activeView === 'admin'
                                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40 shadow-lg shadow-neon-purple/10'
                                    : 'bg-night-800/70 text-slate-300 border border-navy-700 hover:border-navy-600'
                                }`}
                        >
                            Admin View
                        </button>
                    </div>
                </div>
            )}

            {activeView === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
        </div>
    );
};

export default Dashboard;
