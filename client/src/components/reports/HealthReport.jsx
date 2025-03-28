import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";

const HealthReport = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    gender: "",
    dob: "",
  });
  const [loading, setLoading] = useState(true);   
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("/api/healthreport/adultInfo", config);
        setUser(data);
        setLoading(false);
      } catch (error) {
        setMessage("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put("/api/users/profile", user, config);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Update failed. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-blue-300">
      <div className="relative w-full h-40 bg-blue-500 rounded-t-lg flex items-center justify-center">
        
      <div className="grid grid-cols-3 md:grid-cols-2 gap-4 p-6">
            <div>
              <label className="block flex text-gray-600">Adult Name</label>
              <input type="label" name="fullName" value={user.fullName} disabled className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block flex text-gray-600">Age</label>
              <input type="label" name="email" value={user.email} disabled className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block flex text-gray-600">Blood Group</label>
              <input type="label" name="fullName" value={user.fullName} disabled className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block flex text-gray-600">Doctor Assigned</label>
              <input type="label" name="email" value={user.email} disabled className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"/>
            </div>
          </div>
      </div>

      <div className="p-6">
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 flexDirection:column">
            <div>
              <label className="block flex text-gray-600">Prescription</label>
              <input type="text" name="fullName" value={user.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div>
              <label className="block text-gray-600">Doctor Note</label>
              <input type="email" name="email" value={user.email} disabled className="w-full px-4 py-2 border rounded-md bg-gray-100" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-600">Nurse Note</label>
              <input type="text" name="phoneNo" value={user.phoneNo} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-gray-600">CareGiver Note</label>
              <input type="text" name="address" value={user.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
            <FaUserEdit /> Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default HealthReport;
