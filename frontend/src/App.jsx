import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventList from './pages/EventList';
import ClubList from './pages/ClubList';
import AdminPanel from './pages/AdminPanel';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="events" element={<EventList />} />
                    <Route path="clubs" element={<ClubList />} />
                    <Route path="admin" element={<AdminPanel />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
