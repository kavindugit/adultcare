import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaThumbsUp } from 'react-icons/fa'; // Import thumbs-up icon
import { FiPlus } from 'react-icons/fi';

export default function Restoke() {
  const [restokes, setRestokes] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: '',
    quantity: '',
    Notes: '',
  });

  useEffect(() => {
    fetchRestokes();
    fetchMedicines();
  }, []);

  const fetchRestokes = () => {
    axios
      .get('http://localhost:4000/api/restoke/get-restoke')
      .then((res) => setRestokes(res.data.data))
      .catch((err) => console.error('Error fetching restokes:', err));
  };

  const fetchMedicines = () => {
    axios
      .get('http://localhost:4000/api/stock/get-stock')
      .then((res) => setMedicines(res.data))
      .catch((err) => console.error('Error fetching medicine list:', err));
  };

  const handleAddClick = () => {
    setShowModal(true);
    setFormData({
      medicineName: '',
      quantity: '',
      Notes: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/restoke/add', formData)
      .then(() => {
        fetchRestokes();
        setShowModal(false);
        toast.success('Restoke added successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((err) => {
        console.error('Error adding restoke:', err);
        toast.error('Failed to add restoke. Try again.', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
        });
      });
  };

  const handleCompleteStatus = (id) => {
    axios
      .patch(`http://localhost:4000/api/restoke/update-status/${id}`, { status: 'Completed' })
      .then(() => {
        fetchRestokes();
        toast.success('Restoke marked as completed!', {
          position: 'bottom-center',
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        toast.error('Failed to update status', {
          position: 'bottom-center',
          autoClose: 3000,
        });
      });
  };
 
  
  return (
    <div className="p-8 min-h-screen bg-white relative">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900">Restock Management</h1>
      </div>

      {/* Add Button and Search */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#183a6d] to-[#2563eb] text-white rounded-xl shadow-lg hover:from-[#2563eb] hover:to-[#183a6d] transition-all duration-300 text-lg font-semibold"
        >
          <FiPlus className="w-6 h-6" /> Add Medication
        </button>
        
      </div>

      <div className="overflow-x-auto rounded-xl shadow-xl bg-white border border-blue-600 max-w-5xl mx-auto">
        <table className="w-full text-left text-blue-900">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold">Medicine Name</th>
              <th className="px-4 py-3 text-sm font-semibold">Quantity</th>
              <th className="px-4 py-3 text-sm font-semibold">Notes</th>
              <th className="px-4 py-3 text-sm font-semibold">Created Date</th>
              <th className="px-4 py-3 text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restokes.map((item) => (
              <tr key={item._id} className="border-t border-blue-600/50 hover:bg-blue-100/70 transition-all duration-300">
                <td className="px-4 py-3 text-sm truncate">{item.medicineName?.medicineName || 'N/A'}</td>
                <td className="px-4 py-3 text-sm">{item.quantity}</td>
                <td className="px-4 py-3 text-sm">{item.Notes || '-'}</td>
                <td className="px-4 py-3 text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {item.status === 'Pending' && (
                    <button
                      onClick={() => handleCompleteStatus(item._id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-1 rounded-full"
                    >
                      <FaThumbsUp /> {/* Thumbs-up icon */}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Add Restoke</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Medicine Name</label>
                <select
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Medicine</option>
                  {medicines.map((med) => (
                    <option key={med._id} value={med._id}>
                      {med.medicineName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Notes</label>
                <textarea
                  name="Notes"
                  value={formData.Notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
}
