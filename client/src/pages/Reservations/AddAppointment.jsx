import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";
import {
  Calendar,
  UserIcon,
  Mail,
  FileText,
  BookOpen,
  User,
} from "lucide-react";
import Navbar from "../../components/Reservations/layout/Navbar";

const AddAppointment = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    date: "",
    note: "",
    sessionType: "",
    doctorName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all specializations
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/employee/doctors/specializations"
        );
        setSpecializations(response.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
        toast.error("Failed to fetch specializations.");
      }
    };

    fetchSpecializations();
  }, []);

  // Fetch doctors when specialization is selected
  useEffect(() => {
    const fetchDoctorsBySpecialization = async () => {
      if (selectedSpecialization) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/employee/doctors/specialization/${selectedSpecialization}`
          );
          const doctors = response.data;

          const doctorsWithNames = await Promise.all(
            doctors.map(async (doctor) => {
              try {
                const userResponse = await axios.get(
                  `http://localhost:4000/api/user/${doctor.userId}`
                );
                return {
                  ...doctor,
                  doctorName: userResponse.data.data.fullName || "Unknown Doctor",
                };
              } catch (error) {
                console.error(`Error fetching name for doctor ${doctor.userId}:`, error);
                return {
                  ...doctor,
                  doctorName: "Unknown Doctor",
                };
              }
            })
          );

          setFilteredDoctors(doctorsWithNames);
          setSelectedDoctorId("");
        } catch (error) {
          console.error(`Error fetching doctors for ${selectedSpecialization}:`, error);
          toast.error("Failed to fetch doctors.");
          setFilteredDoctors([]);
        }
      } else {
        setFilteredDoctors([]);
      }
    };

    fetchDoctorsBySpecialization();
  }, [selectedSpecialization]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpecializationChange = (e) => {
    const selected = e.target.value;
    setSelectedSpecialization(selected);
    setFormData((prev) => ({ ...prev, sessionType: selected }));
  };

  const handleDoctorChange = (e) => {
    const id = e.target.value;
    setSelectedDoctorId(id);
    const selectedDoctor = filteredDoctors.find(
      (doctor) => doctor.userId === id
    );
    setFormData((prev) => ({
      ...prev,
      doctorName: selectedDoctor ? selectedDoctor.doctorName : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, email, date, sessionType, note } = formData;

    if (!name || !age || !email || !date || !sessionType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("Date cannot be in the past.");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(
        `http://localhost:4000/api/appoinments/confirm/${userData?.userId}`,
        {
          patientName: formData.name,
          age: parseInt(formData.age), // Ensure age is a number
          patientEmail: formData.email,
          date: formData.date,
          serviceName: formData.sessionType,
          note: formData.note,
        }
      );
      toast.success("Booking successful!");
      navigate("/rservices");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create reservation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Book This Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <UserIcon size={18} className="text-blue-500" />
                  <span>Patient's Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <UserIcon size={18} className="text-blue-500" />
                  <span>Age</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail size={18} className="text-blue-500" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <BookOpen size={18} className="text-blue-500" />
                  <span>Specialization</span>
                </label>
                <select
                  name="sessionType"
                  onChange={handleSpecializationChange}
                  value={selectedSpecialization}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 bg-white"
                  required
                >
                  <option value="">-- Select Specialization --</option>
                  {specializations.map((spec, idx) => (
                    <option key={idx} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User size={18} className="text-blue-500" />
                  <span>Doctor's Name</span>
                </label>
                <select
                  name="doctorName"
                  onChange={handleDoctorChange}
                  value={selectedDoctorId}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 bg-white"
                  required
                >
                  <option value="">-- Select Doctor's Name --</option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc.userId} value={doc.userId}>
                      {doc.doctorName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={18} className="text-blue-500" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Full width for note */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText size={18} className="text-blue-500" />
              <span>Note (optional)</span>
            </label>
            <textarea
              name="note"
              rows={4}
              value={formData.note}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
              placeholder="Add any additional information or special requests here..."
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition duration-200 flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAppointment;