import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    roles: {
      caregivers: false,
      nurses: false,
      doctors: false,
    },
    extraServices: {
      transport: false,
      extraCaregiverAssignments: false,
    },
  });

  useEffect(() => {
    fetchParcelData();
  }, []);

  const fetchParcelData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/packages/${id}`);
      if (response.status === 200) {
        setFormData(response.data.data);
      } else {
        toast.error("Error fetching package details");
      }
    } catch (error) {
      toast.error("Error fetching package details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.roles) {
      setFormData((prev) => ({
        ...prev,
        roles: { ...prev.roles, [name]: checked },
      }));
    } else if (name in formData.extraServices) {
      setFormData((prev) => ({
        ...prev,
        extraServices: { ...prev.extraServices, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:4000/api/packages/${id}`, formData);
      toast.success("Package updated successfully");
      navigate("/packages");
    } catch (error) {
      toast.error("Failed to update package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-3xl bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-4 text-blue-800 text-center">Update Package</h2>
      
      {loading ? (
        <p className="text-center text-blue-600">Loading package data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Package Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Package Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (LKR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Roles</label>
            <div className="flex gap-4">
              <label>
                <input type="checkbox" name="caregivers" checked={formData.roles.caregivers} onChange={handleChange} />
                Caregivers
              </label>
              <label>
                <input type="checkbox" name="nurses" checked={formData.roles.nurses} onChange={handleChange} />
                Nurses
              </label>
              <label>
                <input type="checkbox" name="doctors" checked={formData.roles.doctors} onChange={handleChange} />
                Doctors
              </label>
            </div>
          </div>

          {/* Extra Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Extra Services</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="checkbox"
                  name="transport"
                  checked={formData.extraServices.transport}
                  onChange={handleChange}
                />
                Transport
              </label>
              <label>
                <input
                  type="checkbox"
                  name="extraCaregiverAssignments"
                  checked={formData.extraServices.extraCaregiverAssignments}
                  onChange={handleChange}
                />
                Extra Caregiver Assignments
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Package"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateParcel;
