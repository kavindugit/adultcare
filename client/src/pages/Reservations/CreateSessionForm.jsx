import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Calendar, Clock, Tag, DollarSign, TimerIcon } from "lucide-react";

const CreateSessionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    sessionDate: "",
    sessionTime: "",
    sessionType: "",
    sessionPrice: "",
    sessionDuration: ""
  });

  const [data, setData] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [timeslots, setTimeslots] = useState([]);



  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);

  // Auto-fill from query params (e.g., /createForm?type=Counseling&price=2000)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const price = params.get("price");

    if (type || price) {
      setFormData((prev) => ({
        ...prev,
        sessionType: type || "",
        sessionPrice: price || ""
      }));
    }
  }, [location.search]);

  useEffect(() => {
    getAdults();
  },[]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.sessionDate ||
      !formData.sessionTime ||
      !formData.sessionType ||
      !formData.sessionPrice ||
      !formData.sessionDuration
    ) {
      setError("Please fill in all fields.");
      setMessage(null);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Check for past dates
      const selectedDate = new Date(formData.sessionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast.error("Date cannot be in the past.");
        setIsSubmitting(false);
        return false;
      }

      // Check for price
      if (formData.sessionPrice !== undefined && parseFloat(formData.sessionPrice) < 0) {
        toast.error("Price cannot be negative.");
        setIsSubmitting(false);
        return false;
      }

      const response = await axios.post("http://localhost:4000/api/sessions", {
        ...formData,
        sessionPrice: parseFloat(formData.sessionPrice),
      });

      toast.success("Session added successfully!");
      setMessage("Session created successfully!");
      setError(null);

      setFormData({
        sessionDate: "",
        sessionTime: "",
        sessionType: "",
        sessionPrice: "",
        sessionDuration: "",
      });

      navigate("/rservices");
    } catch (err) {
      console.error(err);
      setError("Failed to create session.");
      toast.error("Unable to create a new session!");
      setMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
     {
        setData([
          {
            "docUuId": "8zRPsvn2zH_9",
            "specialization": "Cardiology",
            "availability": {
              "Monday": { "booked": [], "available": ["08:00-10:00", "10:00-12:00"] },
              "Tuesday": { "booked": [], "available": ["08:00-10:00"] }
            }
          },
          {
            "docUuId": "xYZ123",
            "specialization": "Neurology",
            "availability": {
              "Monday": { "booked": [], "available": ["12:00-14:00"] }
            }
          }
        ]
        );

        // Extract unique specializations
        const uniqueSpecs = [
          ...new Set(data.map((doc) => doc.specialization)),
        ];
        setSpecializations(uniqueSpecs);
      }
     
  }, []);

  // When specialization is selected
  const handleSpecChange = (e) => {
    const spec = e.target.value;
    setSelectedSpec(spec);
    const filtered = data.filter((doc) => doc.specialization === spec);
    setDoctors(filtered.map((doc) => doc.docUuId));
    setSelectedDoctor("");
    setTimeslots([]);
  };

  // When doctor ID is selected
  const handleDoctorChange = (e) => {
    const docId = e.target.value;
    setSelectedDoctor(docId);

    const doctor = data.find((doc) => doc.docUuId === docId);
    const availability = doctor?.availability || {};

    const slots = [];
    for (const day in availability) {
      availability[day].available.forEach((slot) =>
        slots.push(`${day}: ${slot}`)
      );
    }
    setTimeslots(slots);
  };
  const getAdults =   async () => { 
    try {
      const users = await axios.get("http://localhost:4000/api/adult/users");
      setUsers(users.data);
    } catch (error) {
      
    }
  } 

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8 border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Session</h2>
      
      {message && (
        <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-700 font-medium text-center">{message}</p>
        </div>
      )}
      
      {error && (
        <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-700 font-medium text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar size={18} className="text-blue-500" />
            <span>Session Date</span>
          </label>
          <input
            type="date"
            name="sessionDate"
            value={formData.sessionDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Clock size={18} className="text-blue-500" />
            <span>Session Time</span>
          </label>
          <input
            type="text"
            name="sessionTime"
            placeholder="e.g. 10:00 AM"
            value={formData.sessionTime}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Tag size={18} className="text-blue-500" />
            <span>Session Type</span>
          </label>
          <input
            type="text"
            name="sessionType"
            placeholder="e.g. Physical Therapy"
            value={formData.sessionType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <DollarSign size={18} className="text-blue-500" />
            <span>Session Price (LKR)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="sessionPrice"
              placeholder="e.g. 1500"
              min="0"
              value={formData.sessionPrice}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            />
            <span className="absolute right-4 top-3 text-gray-500">LKR</span>
          </div>
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Clock size={18} className="text-blue-500" />
            <span>Session Duration</span>
          </label>
          <input
            type="text"
            name="sessionDuration"
            placeholder="e.g. 1 hour"
            value={formData.sessionDuration}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition duration-200 flex items-center justify-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Session"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;