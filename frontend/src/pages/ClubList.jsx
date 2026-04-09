import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowUpRight, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { clubAPI } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const ClubList = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { isAdmin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);

    useEffect(() => {
        loadClubs();
    }, []);

    const loadClubs = async () => {
        try {
            const response = await clubAPI.getAll();
            setClubs(response.data.data || []);
        } catch (error) {
            console.error('Failed to load clubs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this club?')) return;
        try {
            await clubAPI.delete(id);
            setClubs(clubs.filter(c => c.id !== id));
        } catch (error) {
            alert('Failed to delete club');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Student Clubs</h1>
                    <p className="text-slate-300">Find your community. Join a club that matches your passion.</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search clubs..."
                            className="bg-white/75 border border-navy-700 rounded-xl py-2.5 pl-9 pr-4 outline-none focus:border-electric-500/60 text-sm w-48 md:w-60 text-slate-200 placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => { setSelectedClub(null); setShowModal(true); }}
                            className="btn-primary flex items-center gap-2 text-sm"
                        >
                            <Plus className="w-4 h-4" /> Add Club
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[40vh]">
                    <div className="w-10 h-10 border-4 border-electric-500/30 border-t-electric-500 rounded-full animate-spin" />
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredClubs.map((club, i) => (
                            <motion.div
                                key={club.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="glass-card group cursor-pointer relative overflow-hidden"
                            >
                                {isAdmin && (
                                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedClub(club); setShowModal(true); }}
                                            className="p-2 rounded-lg bg-white/90 hover:bg-electric-500 hover:text-white transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(club.id); }}
                                            className="p-2 rounded-lg bg-white/90 hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <div className={`h-20 -mx-6 -mt-6 mb-5 bg-gradient-to-r ${club.color || 'from-slate-500 to-gray-500'} opacity-20 group-hover:opacity-35 transition-opacity duration-500`} />

                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${club.color || 'from-slate-500 to-gray-500'} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                        {club.name.charAt(0)}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-slate-300 bg-night-900/5 px-2.5 py-1 rounded-lg">
                                        <Users className="w-3.5 h-3.5" />
                                        {club.memberCount || 0} members
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-electric-500 transition-colors">{club.name}</h3>
                                <p className="text-slate-300 text-sm mb-5 leading-relaxed">{club.description}</p>

                                <button className="w-full btn-secondary text-sm py-2.5 flex items-center justify-center gap-2 group-hover:bg-white group-hover:border-electric-500/30">
                                    View Club
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {filteredClubs.length === 0 && !loading && (
                <div className="text-center py-16">
                    <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No clubs found</h3>
                    <p className="text-slate-400">Try adjusting your search term</p>
                </div>
            )}

            {showModal && (
                <ClubModal
                    club={selectedClub}
                    onClose={() => { setShowModal(false); setSelectedClub(null); loadClubs(); }}
                />
            )}
        </div>
    );
};

const ClubModal = ({ club, onClose }) => {
    const [formData, setFormData] = useState({
        name: club?.name || '',
        description: club?.description || '',
        color: club?.color || 'from-electric-500 to-cyan-500',
        imageUrl: club?.imageUrl || ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (club?.id) {
                await clubAPI.update(club.id, formData);
            } else {
                await clubAPI.create(formData);
            }
            onClose();
        } catch (error) {
            alert('Failed to save club: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-md p-6"
            >
                <h2 className="text-2xl font-bold text-white mb-4">
                    {club ? 'Edit Club' : 'Create Club'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Club Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                            rows={3}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Color Theme</label>
                        <select
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                        >
                            <option value="from-blue-500 to-cyan-500">Blue/Cyan</option>
                            <option value="from-pink-500 to-rose-500">Pink/Rose</option>
                            <option value="from-violet-500 to-purple-500">Violet/Purple</option>
                            <option value="from-emerald-500 to-teal-500">Emerald/Teal</option>
                            <option value="from-amber-500 to-orange-500">Amber/Orange</option>
                            <option value="from-indigo-500 to-blue-500">Indigo/Blue</option>
                            <option value="from-electric-500 to-cyan-500">Electric</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 btn-secondary">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : (club ? 'Update' : 'Create')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ClubList;
