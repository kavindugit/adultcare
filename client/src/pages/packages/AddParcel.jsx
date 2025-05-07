import React, { useState } from 'react';
import axios from 'axios';

const AddParcel = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    duration: '',
    price: '',
    imageUrl: '', // Added image URL
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
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name in formData.roles) {
      setFormData((prev) => ({
        ...prev,
        roles: {
          ...prev.roles,
          [name]: checked,
        },
      }));
    } else if (name in formData.extraServices) {
      setFormData((prev) => ({
        ...prev,
        extraServices: {
          ...prev.extraServices,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Package name is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.duration || Number(formData.duration) <= 0)
      newErrors.duration = 'Duration must be a positive number.';
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = 'Price must be a positive number.';
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
          imageUrl: '',
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
        setErrors({
          name: '',
          description: '',
          duration: '',
          price: '',
        });
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
    <div className="bg-blue-50 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">Add a New Package</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label htmlFor="id" className="text-sm font-medium text-blue-700 w-40">Package ID</label>
          <input
            type="text"
            name="id"
            id="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full md:w-2/3 px-4 py-2 border border-blue-400 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label htmlFor="name" className="text-sm font-medium text-blue-700 w-40">Package Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full md:w-2/3 px-4 py-2 border border-blue-400 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
  <label htmlFor="description" className="text-sm font-medium text-blue-700 w-40">
    Description
  </label>
  <textarea
    name="description"
    id="description"
    value={formData.description}
    onChange={handleChange}
    rows={4}
    className="w-full md:w-2/3 px-4 py-2 border border-blue-400 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 resize-y"
  />
  {errors.description && (
    <span className="text-red-500 text-sm">{errors.description}</span>
  )}
</div>


        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label htmlFor="duration" className="text-sm font-medium text-blue-700 w-40">Duration (days)</label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full md:w-2/3 px-4 py-2 border border-blue-400 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
          {errors.duration && <span className="text-red-500 text-sm">{errors.duration}</span>}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label htmlFor="price" className="text-sm font-medium text-blue-700 w-40">Price (LKR)</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full md:w-2/3 px-4 py-2 border border-blue-400 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label htmlFor="imageUrl" className="text-sm font-medium text-blue-700 w-40">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full md:w-2/3 px-4 py-2 border border-blue-400 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-blue-700 mb-1">Roles (Included)</p>
          <div className="flex gap-6 flex-wrap">
            {['caregivers', 'nurses', 'doctors'].map((role) => (
              <label key={role} className="text-sm text-gray-600">
                <input
                  type="checkbox"
                  name={role}
                  checked={formData.roles[role]}
                  onChange={handleChange}
                  className="mr-2"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-blue-700 mb-1">Extra Services</p>
          <div className="flex gap-6 flex-wrap">
            {['transport', 'extraCaregiverAssignments'].map((service) => (
              <label key={service} className="text-sm text-gray-600">
                <input
                  type="checkbox"
                  name={service}
                  checked={formData.extraServices[service]}
                  onChange={handleChange}
                  className="mr-2"
                />
                {service === 'transport' ? 'Transport' : 'Extra Caregiver Assignments'}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Package'}
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
