import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateParcel = () => {
  const [parcelData, setParcelData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    roles: {
      caregivers: true,
      nurses: true,
      doctors: true,
    },
    extraServices: {
      transport: false,
      extraCaregiverAssignments: false,
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/packages/${id}`);
        if (response.status === 200) {
          setParcelData({
            name: response.data.data.name || "",
            description: response.data.data.description || "",
            duration: response.data.data.duration || "",
            price: response.data.data.price || "",
            roles: response.data.data.roles || {
              caregivers: true,
              nurses: true,
              doctors: true,
            },
            extraServices: response.data.data.extraServices || {
              transport: false,
              extraCaregiverAssignments: false,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching parcel:", error);
        window.alert("Error fetching parcel data");
      }
    };

    fetchData();
  }, [id]);

  // Handle changes for regular fields and nested roles/extra services
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in parcelData.roles) {
      // Handle changes for roles (caregivers, nurses, doctors)
      setParcelData({
        ...parcelData,
        roles: {
          ...parcelData.roles,
          [name]: checked,
        },
      });
    } else if (name in parcelData.extraServices) {
      // Handle changes for extra services (transport, extra caregiver assignments)
      setParcelData({
        ...parcelData,
        extraServices: {
          ...parcelData.extraServices,
          [name]: checked,
        },
      });
    } else {
      // Handle regular fields (name, description, duration, price)
      setParcelData({ ...parcelData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!parcelData.name) {
      newErrors.name = 'Package name is required.';
    }
    if (!parcelData.description) {
      newErrors.description = 'Description is required.';
    }
    if (!parcelData.duration || parcelData.duration<= 0) {
      newErrors.duration = 'Duration must be a positive number.';
    }
    if (!parcelData.price || parcelData.price <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/packages/${id}`, parcelData);
      if (response.status === 200) {
        window.alert("Parcel updated successfully!");
        navigate("/parcels"); // Redirect after update
      }
      setErrors({});
    } catch (error) {
      console.error("Error updating parcel:", error);
      window.alert("Failed to update parcel");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Update Parcel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Package Name</label>
          <input
            type="text"
            name="name"
            value={parcelData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={parcelData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
                        {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Duration (Days)</label>
          <input
            type="number"
            name="duration"
            value={parcelData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
                        {errors.duration && <span className="text-red-500 text-sm">{errors.duration}</span>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Price ($)</label>
          <input
            type="number"
            name="price"
            value={parcelData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}

        </div>

        {/* Roles Selection */}
        <div>
          <p className="text-sm font-medium text-blue-700">Roles (Included by Default)</p>
          <div className="flex gap-4">
            <div>
              <input
                type="checkbox"
                name="caregivers"
                checked={parcelData.roles.caregivers}
                onChange={handleChange}
              />
              <label className="text-sm text-gray-600 ml-2">Caregivers</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="nurses"
                checked={parcelData.roles.nurses}
                onChange={handleChange}
              />
              <label className="text-sm text-gray-600 ml-2">Nurses</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="doctors"
                checked={parcelData.roles.doctors}
                onChange={handleChange}
              />
              <label className="text-sm text-gray-600 ml-2">Doctors</label>
            </div>
          </div>
        </div>

        {/* Extra Services */}
        <div>
          <p className="text-sm font-medium text-blue-700">Extra Services</p>
          <div className="flex gap-4">
            <div>
              <input
                type="checkbox"
                name="transport"
                checked={parcelData.extraServices.transport}
                onChange={handleChange}
              />
              <label className="text-sm text-gray-600 ml-2">Transport</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="extraCaregiverAssignments"
                checked={parcelData.extraServices.extraCaregiverAssignments}
                onChange={handleChange}
              />
              <label className="text-sm text-gray-600 ml-2">Extra Caregiver Assignments</label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Parcel
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;
