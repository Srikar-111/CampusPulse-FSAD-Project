import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, MapPin, Clock, Ticket, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { eventAPI, clubAPI, registrationAPI } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [clubFilter, setClubFilter] = useState('All');
    const { isAuthenticated, isAdmin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const categories = ['All', 'Academic', 'Cultural', 'Business', 'Sports', 'Workshop'];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [eventsRes, clubsRes] = await Promise.all([
                eventAPI.getAll(),
                clubAPI.getAll()
            ]);
            setEvents(eventsRes.data.data || []);
            setClubs(clubsRes.data.data || []);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filter === 'All' || event.category === filter;
        const matchesClub = clubFilter === 'All' || event.clubId === parseInt(clubFilter);
        return matchesSearch && matchesCategory && matchesClub;
    });

    const handleRegister = async (eventId) => {
        if (!isAuthenticated) {
            alert('Please login to register for events');
            return;
        }
        try {
            await registrationAPI.registerForEvent(eventId);
            alert('Successfully registered for event!');
            loadData();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to register');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await eventAPI.delete(id);
            setEvents(events.filter(e => e.id !== id));
        } catch (error) {
            alert('Failed to delete event');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Events</h1>
                    <p className="text-slate-300">Discover what's happening on campus.</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="bg-white/75 border border-navy-700 rounded-xl py-2.5 pl-9 pr-4 outline-none focus:border-electric-500/60 text-sm w-48 md:w-60 text-slate-200 placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => { setSelectedEvent(null); setShowModal(true); }}
                            className="btn-primary flex items-center gap-2 text-sm"
                        >
                            <Plus className="w-4 h-4" /> Create Event
                        </button>
                    )}
                </div>
            </div>

            <div className="glass-card p-4 flex flex-wrap gap-3 items-center">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Category:</span>
                <div className="flex gap-1.5 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === cat
                                    ? 'bg-night-900 text-white shadow-lg shadow-night-900/25'
                                    : 'text-slate-300 hover:text-white hover:bg-night-900/5'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="w-px h-6 bg-navy-700 mx-2" />
                <span className="text-sm font-medium text-slate-300">Club:</span>
                <select
                    value={clubFilter}
                    onChange={(e) => setClubFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-sm border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                >
                    <option value="All">All Clubs</option>
                    {clubs.map(club => (
                        <option key={club.id} value={club.id}>{club.name}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[40vh]">
                    <div className="w-10 h-10 border-4 border-electric-500/30 border-t-electric-500 rounded-full animate-spin" />
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                isAdmin={isAdmin}
                                isAuthenticated={isAuthenticated}
                                onRegister={() => handleRegister(event.id)}
                                onDelete={() => handleDelete(event.id)}
                                onEdit={() => { setSelectedEvent(event); setShowModal(true); }}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {filteredEvents.length === 0 && !loading && (
                <div className="text-center py-16">
                    <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No events found</h3>
                    <p className="text-slate-400">Try adjusting your filters or search term</p>
                </div>
            )}

            {showModal && (
                <EventModal
                    event={selectedEvent}
                    clubs={clubs}
                    onClose={() => { setShowModal(false); setSelectedEvent(null); loadData(); }}
                />
            )}
        </div>
    );
};

const EventCard = ({ event, isAdmin, isAuthenticated, onRegister, onDelete, onEdit }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5 }}
            className="glass-card p-0 overflow-hidden group cursor-pointer relative"
        >
            {isAdmin && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                        className="p-2 rounded-lg bg-white/90 hover:bg-electric-500 hover:text-white transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-2 rounded-lg bg-white/90 hover:bg-red-500 hover:text-white transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="relative h-44 overflow-hidden">
                <img
                    src={event.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800'}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-900/75 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-lg text-night-900 border border-night-900/15">
                    {event.category}
                </span>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-electric-500 transition-colors">
                    {event.name}
                </h3>
                <div className="space-y-1.5 text-sm text-slate-300 mb-5">
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-electric-500" />{event.date}</div>
                    {event.time && <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-neon-purple" />{event.time.substring(0, 5)}</div>}
                    <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gold-500" />{event.venue}</div>
                    <div className="flex items-center gap-2"><Ticket className="w-3.5 h-3.5 text-neon-cyan" />{event.clubName}</div>
                </div>
                <button
                    onClick={onRegister}
                    className="w-full btn-secondary text-sm py-2.5 flex items-center justify-center gap-2 group-hover:bg-electric-500/10 group-hover:border-electric-500/45 group-hover:text-electric-500"
                >
                    <Ticket className="w-4 h-4" /> {isAuthenticated ? 'Register' : 'Login to Register'}
                </button>
            </div>
        </motion.div>
    );
};

const EventModal = ({ event, clubs, onClose }) => {
    const [formData, setFormData] = useState({
        name: event?.name || '',
        description: event?.description || '',
        date: event?.date || '',
        time: event?.time || '',
        venue: event?.venue || '',
        category: event?.category || 'Academic',
        clubId: event?.clubId || clubs[0]?.id || '',
        imageUrl: event?.imageUrl || ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                clubId: parseInt(formData.clubId)
            };
            if (event?.id) {
                await eventAPI.update(event.id, payload);
            } else {
                await eventAPI.create(payload);
            }
            onClose();
        } catch (error) {
            alert('Failed to save event: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-lg p-6 my-8"
            >
                <h2 className="text-2xl font-bold text-white mb-4">
                    {event ? 'Edit Event' : 'Create Event'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Event Name</label>
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
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Time</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Venue</label>
                        <input
                            type="text"
                            value={formData.venue}
                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                            placeholder="e.g., Main Auditorium, Room 201"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                            >
                                <option value="Academic">Academic</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Business">Business</option>
                                <option value="Sports">Sports</option>
                                <option value="Workshop">Workshop</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Club</label>
                            <select
                                value={formData.clubId}
                                onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                                className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                                required
                            >
                                {clubs.map(club => (
                                    <option key={club.id} value={club.id}>{club.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Image URL (optional)</label>
                        <input
                            type="url"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-navy-700 bg-white/75 outline-none focus:border-electric-500/60"
                            placeholder="https://..."
                        />
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
                            {loading ? 'Saving...' : (event ? 'Update' : 'Create')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EventList;
