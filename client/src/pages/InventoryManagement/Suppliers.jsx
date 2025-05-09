import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the toast styles
import { MdPhone, MdEmail } from 'react-icons/md';
import { FiSearch, FiPlus } from 'react-icons/fi';

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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#183a6d] to-[#2563eb] text-white rounded-xl shadow-lg hover:from-[#2563eb] hover:to-[#183a6d] transition-all duration-300 text-lg font-semibold"
        >
          <FiPlus className="w-6 h-6" /> Add Supplier
        </button>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-3 pl-10 pr-20 rounded-xl bg-[#e3f0ff] border border-blue-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] outline-none shadow-lg transition-all duration-300 text-blue-900 placeholder-blue-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2563eb] w-5 h-5" />
          <button
            onClick={() => {}}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#183a6d] to-[#2563eb] text-white px-4 py-1 rounded-lg shadow hover:from-[#2563eb] hover:to-[#183a6d] transition-all duration-200 text-sm font-semibold"
          >
            Search
          </button>
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => (
          <div
            key={supplier._id}
            className="bg-[#e3f0ff] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-[#b6d0e2] hover:bg-[#d0e6fa] transform hover:-translate-y-1 flex flex-col gap-4"
          >
            {/* Header: Name and Actions */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-extrabold text-blue-900 truncate">{supplier.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpen(supplier)}
                  className="bg-[#a7c7e7] hover:bg-[#7ea6d6] text-blue-900 font-semibold px-3 py-1 text-xs rounded-full shadow-sm border border-blue-200 transition-all duration-200"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(supplier._id)}
                  className="bg-[#f7c6c7] hover:bg-[#f49ca0] text-red-700 font-semibold px-3 py-1 text-xs rounded-full shadow-sm border border-red-200 transition-all duration-200"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="border-b border-[#b6d0e2] mb-2"></div>
            {/* Contact & Email Section */}
            <div className="flex flex-col gap-2 text-blue-800 text-sm">
              <div className="flex items-center gap-2">
                <MdPhone className="text-blue-500 text-lg" />
                <span className="font-semibold">Phone:</span>
                <span className="font-medium">{supplier.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="text-blue-500 text-lg" />
                <span className="font-semibold">Email:</span>
                <span className="font-medium truncate">{supplier.email}</span>
              </div>
            </div>
            {/* Supplies Section */}
            <div className="mt-2">
              <div className="text-blue-900 text-sm font-semibold mb-1">Supplies:</div>
              <div className="flex flex-wrap gap-2">
                {supplier.medicineSupplied.map(med => (
                  <span
                    key={med._id}
                    className="px-3 py-1 bg-[#b7e4c7] text-green-900 rounded-full text-xs font-semibold shadow-sm border border-green-200 hover:bg-[#7ed6a7] transition-colors duration-200"
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
