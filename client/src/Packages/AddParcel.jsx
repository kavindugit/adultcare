import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddParcel = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    duration: '',
    price: '',
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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.roles) {
      setFormData({
        ...formData,
        roles: {
          ...formData.roles,
          [name]: checked,
        },
      });
    } else if (name in formData.extraServices) {
      setFormData({
        ...formData,
        extraServices: {
          ...formData.extraServices,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

//back button
  const navigate = useNavigate();


  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Package name is required.';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required.';
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duration must be a positive number.';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }
    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/packages/add', formData);

      if (response.status === 201) {
        alert('Package Added Successfully');
        setFormData({
          id: '',
          name: '',
          description: '',
          duration: '',
          price: '',
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
        setErrors({}); 
      } else {
        alert('Error Adding Package');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error Adding Package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">Add The Package</h1>

      <div className="flex gap-6">
        <div className="w-40 h-40">
          <img
            src="https://img.freepik.com/free-vector/checking-boxes-concept-illustration_114360-2465.jpg?semt=ais_hybrid"
            alt="Package"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between gap-4">
              <label htmlFor="id" className="text-sm font-medium text-blue-700 w-1/3">Package ID</label>
              <input
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <label htmlFor="name" className="text-sm font-medium text-blue-700 w-1/3">Package Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <label htmlFor="description" className="text-sm font-medium text-blue-700 w-1/3">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <label htmlFor="duration" className="text-sm font-medium text-blue-700 w-1/3">Duration</label>
              <input
                type="number"
                name="duration"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              {errors.duration && <span className="text-red-500 text-sm">{errors.duration}</span>}
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <label htmlFor="price" className="text-sm font-medium text-blue-700 w-1/3">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="w-2/3 px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
            </div>

            <div>
              <p className="text-sm font-medium text-blue-700">Roles (Included by Default)</p>
              <div className="flex gap-4">
                <div>
                  <input
                    type="checkbox"
                    name="caregivers"
                    checked={formData.roles.caregivers}
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-600 ml-2">Caregivers</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="nurses"
                    checked={formData.roles.nurses}
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-600 ml-2">Nurses</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="doctors"
                    checked={formData.roles.doctors}
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-600 ml-2">Doctors</label>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-blue-700">Extra Services</p>
              <div className="flex gap-4">
                <div>
                  <input
                    type="checkbox"
                    name="transport"
                    checked={formData.extraServices.transport}
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-600 ml-2">Transport</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="extraCaregiverAssignments"
                    checked={formData.extraServices.extraCaregiverAssignments}
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-600 ml-2">Extra Caregiver Assignments</label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Package'}
            </button>




          </form>


          <button
  type="button"
  onClick={() => navigate('/parcels')}
  className="mt-6 w-full bg-blue-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
>
  Back
</button>
        </div>
      </div>
    </div>
  );
};



export default AddParcel;
