// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditSessionModal from "./EditSessionModal";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Calendar,
  Clock,
  DollarSign,
  Edit3,
  Trash2,
  Search,
  Plus,
  User,
  AlertCircle,
  Calendar as CalendarIcon,
  Layers,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminSessionSection = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/sessions");
      setSessions(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching sessions", err);
      toast.error("Failed to load sessions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleEdit = (session) => {
    setSelectedSession(session);
    setEditOpen(true);
  };

  const handleDelete = (session) => {
    setSelectedSession(session);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/sessions/${selectedSession._id}`);
      toast.success("Session deleted successfully!");
      setDeleteOpen(false);
      setSelectedSession(null);
      fetchSessions();
    } catch (err) {
      toast.error("Failed to delete session.");
      console.error("Failed to delete session", err);
    }
  };

  const handleUpdateSuccess = () => {
    setEditOpen(false);
    setSelectedSession(null);
    toast.success("Session updated successfully!");
    fetchSessions();
  };

  const sessionTypes = ["All", ...new Set(sessions.map(session => session.sessionType))];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.sessionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.sessionTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(session.sessionDate).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || session.sessionType === selectedType;
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCardColor = (type) => {
    switch(type) {
      case "Counseling": return "from-blue-50 to-indigo-50 border-blue-200";
      case "Physical Therapy": return "from-emerald-50 to-teal-50 border-emerald-200";
      case "Medical Checkup": return "from-rose-50 to-red-50 border-rose-200";
      default: return "from-gray-50 to-slate-50 border-gray-200";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center">
              <Calendar className="mr-3" size={28} /> Admin Session Dashboard
            </h1>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/createForm" className="bg-white text-blue-700 hover:bg-blue-50 transition flex items-center px-4 py-2 rounded-lg font-medium shadow-md">
                <Plus size={18} className="mr-2" /> Add Session
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center shadow-sm">
              <div className="bg-white/30 p-3 rounded-full mr-4"><Layers size={20} /></div>
              <div><p className="text-sm font-medium text-blue-100">Total Sessions</p><p className="text-2xl font-bold">{sessions.length}</p></div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center shadow-sm">
              <div className="bg-white/30 p-3 rounded-full mr-4"><CalendarIcon size={20} /></div>
              <div><p className="text-sm font-medium text-blue-100">Session Types</p><p className="text-2xl font-bold">{sessionTypes.length - 1}</p></div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center shadow-sm">
              <div className="bg-white/30 p-3 rounded-full mr-4"><User size={20} /></div>
              <div><p className="text-sm font-medium text-blue-100">Latest Update</p><p className="text-base font-medium">{new Date().toLocaleDateString()}</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {sessionTypes.map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
            <button onClick={fetchSessions} className="bg-blue-50 text-blue-600 hover:bg-blue-100 transition p-2 rounded-lg" title="Refresh sessions">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-br ${getCardColor(session.sessionType)} border rounded-xl shadow hover:shadow-md transition overflow-hidden`}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/70 text-gray-700 backdrop-blur-sm">{session.sessionType}</span>
                    <div className="text-gray-500 text-sm">ID: {session._id.substring(0, 6)}...</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{session.sessionType} Session</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600"><Calendar size={16} className="mr-2 flex-shrink-0" /><span>{formatDate(session.sessionDate)}</span></div>
                    <div className="flex items-center text-gray-600"><Clock size={16} className="mr-2 flex-shrink-0" /><span>{session.sessionTime} • {session.sessionDuration}</span></div>
                    <div className="flex items-center text-gray-800 font-medium"><DollarSign size={16} className="mr-2 flex-shrink-0" /><span>Rs. {session.sessionPrice.toFixed(2)}</span></div>
                  </div>
                </div>
                <div className="flex justify-between border-t border-gray-200/50 bg-white/50 px-5 py-3">
                  <button onClick={() => handleEdit(session)} className="text-blue-600 hover:text-blue-800 transition flex items-center text-sm font-medium">
                    <Edit3 size={15} className="mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDelete(session)} className="text-red-600 hover:text-red-800 transition flex items-center text-sm font-medium">
                    <Trash2 size={15} className="mr-1" /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filteredSessions.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <div className="flex justify-center mb-4"><AlertCircle size={48} className="text-gray-400" /></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No sessions found</h3>
            <p className="text-gray-500 mb-6">{searchTerm || selectedType !== "All" ? "Try adjusting your search filters" : "Start by adding a new session"}</p>
            <div className="flex justify-center">
              <Link to="/createForm" className="bg-blue-600 text-white hover:bg-blue-700 transition flex items-center px-4 py-2 rounded-lg font-medium">
                <Plus size={18} className="mr-2" /> Add New Session
              </Link>
              {(searchTerm || selectedType !== "All") && (
                <button onClick={() => { setSearchTerm(""); setSelectedType("All"); }} className="ml-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">Reset Filters</button>
              )}
            </div>
          </div>
        )}
      </div>

      {editOpen && <EditSessionModal session={selectedSession} onClose={() => setEditOpen(false)} onSuccess={handleUpdateSuccess} />}
      {deleteOpen && <DeleteConfirmationDialog onConfirm={handleDeleteConfirm} onCancel={() => setDeleteOpen(false)} />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminSessionSection;
