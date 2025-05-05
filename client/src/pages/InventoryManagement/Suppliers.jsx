import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the toast styles

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', medicineSupplied: [] });
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);

  const BACKEND_URL = 'http://localhost:4000';

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/supplier/get-suppliers`);
      setSuppliers(res.data);
    } catch (err) {
      toast.error("Failed to fetch suppliers", {
        position: 'bottom-center',
        autoClose: 3000,
      });
    }
  };



  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/stock/get-stock`);
      setMedicines(res.data);
    } catch (err) {
      toast.error("Failed to fetch medicines", {
        position: 'bottom-center',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchSuppliers();
    fetchMedicines();
  }, []);

  const handleOpen = (supplier = null) => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        medicineSupplied: supplier.medicineSupplied.map(med => med._id),
      });
      setEditId(supplier._id);
    } else {
      setFormData({ name: '', contact: '', email: '', medicineSupplied: [] });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    const { name, contact, email, medicineSupplied } = formData;

    // Validate required fields
    if (!name || !contact || !email || medicineSupplied.length === 0) {
      toast.error("All fields are required, please fill in the missing fields.", {
        position: 'bottom-center',
        autoClose: 3000,
      });
      return false;
    }

    // Validate name (no numbers allowed)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error("Cannot enter numbers in the Supplier Name.", {
        position: 'bottom-center',
        autoClose: 3000,
      });
      return false;
    }

    // Validate contact number (must match +94XXXXXXXXX format)
    const contactRegex = /^\+94\d{9}$/;
    if (!contactRegex.test(contact)) {
      toast.error("Contact Number is Invalid.", {
        position: 'bottom-center',
        autoClose: 3000,
      });
      return false;
    }

    // Validate email (must be in a valid email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Email is Invalid.", {
        position: 'bottom-center',
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (editId) {
        await axios.put(`${BACKEND_URL}/api/supplier/update-supplier/${editId}`, formData);
        toast.success("Supplier updated!", {
          position: 'bottom-center',
          autoClose: 3000,
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/supplier/add`, formData);
        toast.success("Supplier added!", {
          position: 'bottom-center',
          autoClose: 3000,
        });
      }
      handleClose();
      fetchSuppliers();
    } catch (error) {
      toast.error("Error saving supplier", {
        position: 'bottom-center',
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await axios.delete(`${BACKEND_URL}/api/supplier/delete-supplier/${id}`);
        toast.success("Supplier deleted", {
          position: 'bottom-center',
          autoClose: 3000,
        });
        fetchSuppliers();
      } catch (error) {
        toast.error("Failed to delete supplier", {
          position: 'bottom-center',
          autoClose: 3000,
        });
      }
    }
  };

  const filteredSuppliers = suppliers.filter(sup =>
    sup.name.toLowerCase().includes(search.toLowerCase()) ||
    sup.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen bg-white relative">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-800">Supplier Management</h1>
        <p className="text-blue-600 mt-3 text-lg">Seamless supplier coordination</p>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <button
          onClick={() => handleOpen()}
          className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg transform hover:scale-105"
        >
          <span className="group-hover:rotate-90 transition-transform duration-300">➕</span> Add Supplier
        </button>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl bg-blue-100 border border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none shadow-xl transition-all duration-300 text-blue-900 placeholder-blue-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 animate-bounce-subtle">🔍</span>
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => (
          <div
            key={supplier._id}
            className="bg-blue-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 border border-blue-400 hover:bg-blue-300/90 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-blue-800 truncate">{supplier.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpen(supplier)}
                  className="text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-110"
                >
                  🖌️
                </button>
                <button
                  onClick={() => handleDelete(supplier._id)}
                  className="text-red-600 hover:text-red-800 transition-all duration-300 transform hover:scale-110"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="mt-2 text-blue-600 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-blue-500">📱</span> {supplier.contact}
              </p>
              <p className="flex items-center gap-2 truncate">
                <span className="text-blue-500">📧</span> {supplier.email}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-blue-800 text-sm font-medium">Supplies:</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {supplier.medicineSupplied.map(med => (
                  <span
                    key={med._id}
                    className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 transition-colors duration-300"
                  >
                    {med.medicineName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-400 transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-5 tracking-wide">
              {editId ? "Edit Supplier" : "Add Supplier"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Supplier Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-md hover:bg-blue-100/70 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-md hover:bg-blue-100/70 transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-md hover:bg-blue-100/70 transition-all duration-300"
              />
              <div>
                <p className="text-blue-800 text-sm font-medium mb-2">Medicines Supplied:</p>
                <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-2">
                  {medicines.map(med => (
                    <label key={med._id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.medicineSupplied.includes(med._id)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...formData.medicineSupplied, med._id]
                            : formData.medicineSupplied.filter(id => id !== med._id);
                          setFormData({ ...formData, medicineSupplied: updated });
                        }}
                        className="w-4 h-4 text-blue-400 rounded border-blue-500 focus:ring-blue-400"
                      />
                      <span className="text-blue-600 text-sm hover:text-blue-800 transition-colors duration-200">
                        {med.medicineName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleClose}
                className="px-5 py-2 text-blue-500 hover:text-blue-300 transition-all duration-300 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Suppliers;
