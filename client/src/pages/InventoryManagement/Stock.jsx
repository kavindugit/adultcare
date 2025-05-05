import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: '',
    quantity: '',
    price: '',
    restockThereshold: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch stock data initially
    axios
      .get('http://localhost:4000/api/stock/get-stock')
      .then((response) => {
        setStock(response.data);
        setFilteredStock(response.data);
      })
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []);

  const handleAddClick = () => {
    setShowModal(true);
    setFormData({
      medicineName: '',
      quantity: '',
      price: '',
      restockThereshold: '',
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure quantity and restock threshold cannot be less than 1
    if (name === 'quantity' || name === 'restockThereshold') {
      if (value < 1) {
        toast.error('Quantity and Restock Threshold must be at least 1.', {
          position: 'bottom-center',
          autoClose: 3000,
        });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Update medication
      axios
        .put(`http://localhost:4000/api/stock/update-stock/${editId}`, formData)
        .then((response) => {
          const updatedStock = stock.map((item) => (item._id === editId ? response.data : item));
          setStock(updatedStock);
          setFilteredStock(updatedStock); // Update filtered stock as well
          setShowModal(false);
          toast.success('Medication updated successfully!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          console.error('Error updating medication:', error);
          toast.error('Failed to update medication.', {
            position: 'bottom-center',
            autoClose: 3000,
          });
        });
    } else {
      // Add new medication
      axios
        .post('http://localhost:4000/api/stock/add', formData)
        .then((response) => {
          const updatedStock = [...stock, response.data];
          setStock(updatedStock);
          setFilteredStock(updatedStock); // Update filtered stock as well
          setShowModal(false);
          toast.success('Medication added successfully!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          console.error('Error adding medication:', error);
          toast.error('Failed to add medication.', {
            position: 'bottom-center',
            autoClose: 3000,
          });
        });
    }
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this medication?');
    if (confirmation) {
      axios
        .delete(`http://localhost:4000/api/stock/delete-stock/${id}`)
        .then(() => {
          const updatedStock = stock.filter((item) => item._id !== id);
          setStock(updatedStock);
          setFilteredStock(updatedStock); // Update filtered stock as well
          toast.success('Medication deleted successfully!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          console.error('Error deleting medication:', error);
          toast.error('Failed to delete medication.', {
            position: 'bottom-center',
            autoClose: 3000,
          });
        });
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    const itemToEdit = stock.find((item) => item._id === id);
    setFormData({
      medicineName: itemToEdit.medicineName,
      quantity: itemToEdit.quantity,
      price: itemToEdit.price,
      restockThereshold: itemToEdit.restockThereshold,
    });
    setShowModal(true);
  };

  const handleSearch = () => {
    const filtered = stock.filter((item) =>
      item.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStock(filtered);
  };

  return (
    <div className="p-8 min-h-screen bg-white relative">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900">Stock Management</h1>
        <p className="text-blue-600 mt-3 text-lg">Advanced medication tracking</p>
      </div>

      {/* Add Button and Search */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <button
          onClick={handleAddClick}
          className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg transform hover:scale-105"
        >
          <span className="group-hover:rotate-90 transition-transform duration-300">➕</span> Add Medication
        </button>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <input
              type="text"
              placeholder="Search by medication name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-xl bg-blue-50 border border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-300/50 outline-none shadow-xl transition-all duration-300 text-blue-900 placeholder-blue-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 animate-bounce-subtle">🔍</span>
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto rounded-xl shadow-xl bg-white border border-blue-600 max-w-5xl mx-auto">
        <table className="w-full text-left text-blue-900">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold">Medication Name</th>
              <th className="px-4 py-3 text-sm font-semibold">Quantity</th>
              <th className="px-4 py-3 text-sm font-semibold">Price</th>
              <th className="px-4 py-3 text-sm font-semibold">Threshold</th>
              <th className="px-4 py-3 text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item) => (
              <tr key={item._id} className="border-t border-blue-600/50 hover:bg-blue-100/70 transition-all duration-300">
                <td className="px-4 py-3 text-sm truncate">{item.medicineName}</td>
                <td className="px-4 py-3 text-sm">{item.quantity}</td>
                <td className="px-4 py-3 text-sm">Rs. {item.price}</td>
                <td className="px-4 py-3 text-sm">{item.restockThereshold}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.quantity < item.restockThereshold
                        ? 'bg-red-500/70 text-red-100'
                        : 'bg-green-500/70 text-green-100'
                    }`}
                  >
                    {item.quantity < item.restockThereshold ? 'Low' : 'High'}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-3">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="text-blue-300 hover:text-blue-100 transition-all duration-300 transform hover:scale-110"
                  >
                    🖌️
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-400 hover:text-red-300 transition-all duration-300 transform hover:scale-110"
                  >
                    🗑️
                  </button>


                  <button
                   onClick={() => alert("clicked")}
                    className="text-green-500 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
                  >
                    📤
                  </button> 

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-600 transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-5 tracking-wide">
              {editId ? 'Edit Medication' : 'Add Medication'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Medication Name</label>
                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Price (Rs)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-md"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Restock Threshold</label>
                <input
                  type="number"
                  name="restockThereshold"
                  value={formData.restockThereshold}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-md"
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 text-blue-500 hover:text-blue-300 transition-all duration-300 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {editId ? 'Update' : 'Save'}
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
