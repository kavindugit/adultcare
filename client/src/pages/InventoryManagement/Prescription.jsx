import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [stock, setStock] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePrescription, setActivePrescription] = useState(null);
  const [medLines, setMedLines] = useState([
    { medicineId: '', quantity: 1 }
  ]);
  const [undoData, setUndoData] = useState(null);

  // Fetch prescriptions and stock data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prescriptionsRes, stockRes] = await Promise.all([
          axios.get('http://localhost:4000/api/prescriptions'),
          axios.get('http://localhost:4000/api/stock/get-stock')
        ]);
        setPrescriptions(prescriptionsRes.data);
        setStock(stockRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  // Populate sample prescriptions
  const handlePopulateSamples = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/prescriptions/populate-samples');
      toast.success('Sample prescriptions added successfully!');
      
      // Refresh the prescriptions list
      const prescriptionsRes = await axios.get('http://localhost:4000/api/prescriptions');
      setPrescriptions(prescriptionsRes.data);
    } catch (error) {
      console.error('Error populating samples:', error);
      toast.error(error.response?.data?.message || 'Failed to add sample prescriptions');
    }
  };

  // Open modal for a prescription
  const handlePrepare = (id) => {
    setActivePrescription(id);
    setShowModal(true);
    setMedLines([{ medicineId: '', quantity: 1 }]);
  };

  // Add new medicine line
  const addLine = () => {
    setMedLines([...medLines, { medicineId: '', quantity: 1 }]);
  };

  // Remove a medicine line
  const removeLine = (idx) => {
    setMedLines(medLines.filter((_, i) => i !== idx));
  };

  // Change medicine or quantity
  const handleLineChange = (idx, field, value) => {
    setMedLines(medLines.map((line, i) =>
      i === idx ? { ...line, [field]: value } : line
    ));
  };

  // Calculate total price
  const getLinePrice = (line) => {
    const med = stock.find(m => m._id === line.medicineId);
    return med ? med.price * (Number(line.quantity) || 0) : 0;
  };
  const totalPrice = medLines.reduce((sum, line) => sum + getLinePrice(line), 0);

  // Check stock availability
  const getStockWarning = (line) => {
    const med = stock.find(m => m._id === line.medicineId);
    if (!med) return '';
    if (Number(line.quantity) > med.quantity) return 'Insufficient stock!';
    return '';
  };

  // Submit preparation
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for stock issues
    for (let line of medLines) {
      const med = stock.find(m => m._id === line.medicineId);
      if (!med || Number(line.quantity) > med.quantity) {
        toast.error('Insufficient stock for one or more medicines.');
        return;
      }
    }

    try {
      // Save undo data
      setUndoData({
        prescriptions: [...prescriptions],
        stock: [...stock],
      });

      // Call the prepare prescription endpoint
      const response = await axios.post(`http://localhost:4000/api/prescriptions/${activePrescription}/prepare`, {
        medicines: medLines,
        preparedBy: 'current-user' // You might want to get this from your auth context
      });

      // Update local state with the response from server
      setPrescriptions(prev => prev.map(p =>
        p._id === activePrescription ? { ...p, status: 'Prepared' } : p
      ));

      // Refresh stock data
      const stockResponse = await axios.get('http://localhost:4000/api/stock/get-stock');
      setStock(stockResponse.data);

      setShowModal(false);
      toast.success('Medicines prepared and stock updated!');
    } catch (error) {
      console.error('Error preparing prescription:', error);
      toast.error('Failed to prepare prescription');
      
      // If there's an error, restore the previous state
      if (undoData) {
        setPrescriptions(undoData.prescriptions);
        setStock(undoData.stock);
        setUndoData(null);
      }
    }
  };

  // Undo preparation
  const handleUndo = async () => {
    if (undoData) {
      try {
        // Restore stock quantities in the database
        for (let med of undoData.stock) {
          await axios.put(`http://localhost:4000/api/stock/update-stock/${med._id}`, med);
        }

        // Refresh stock data
        const response = await axios.get('http://localhost:4000/api/stock/get-stock');
        setStock(response.data);

        setPrescriptions(undoData.prescriptions);
        setUndoData(null);
        toast.info('Preparation undone.');
      } catch (error) {
        console.error('Error undoing preparation:', error);
        toast.error('Failed to undo preparation');
      }
    }
  };

  return (
    <div className="p-8 min-h-screen bg-white relative">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900">Prescription Management</h1>
        <p className="text-blue-600 mt-3 text-lg">Manage and track prescriptions here.</p>
      </div>

      {/* Add Sample Data Button */}
      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={handlePopulateSamples}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 text-sm rounded-full shadow-sm border border-purple-200 transition-all duration-200"
        >
          Add Sample Prescriptions
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-xl bg-white border border-blue-600 max-w-5xl mx-auto mb-8">
        <table className="w-full text-left text-blue-900">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold">Patient Name</th>
              <th className="px-4 py-3 text-sm font-semibold">Prescription</th>
              <th className="px-4 py-3 text-sm font-semibold">Description</th>
              <th className="px-4 py-3 text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((item) => (
              <tr key={item._id} className="border-t border-blue-600/50 hover:bg-blue-100/70 transition-all duration-300">
                <td className="px-4 py-3 text-sm truncate">{item.patient}</td>
                <td className="px-4 py-3 text-sm">{item.prescription}</td>
                <td className="px-4 py-3 text-sm">{item.description}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Prepared' ? 'bg-green-500/70 text-green-100' : 'bg-yellow-500/70 text-yellow-100'}`}>{item.status}</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {item.status !== 'Prepared' && (
                    <button
                      onClick={() => handlePrepare(item._id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1 rounded-full shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-200"
                    >
                      Prepare Medicines
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Undo Button */}
      {undoData && (
        <div className="flex justify-end max-w-5xl mx-auto mb-4">
          <button
            onClick={handleUndo}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-6 py-2 text-sm rounded-full shadow-sm border border-yellow-200 transition-all duration-200"
          >
            Undo Preparation
          </button>
        </div>
      )}

      {/* Modal for Prepare Medicines */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-lg relative">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Prepare Medicines</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {medLines.map((line, idx) => (
                <div key={idx} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-900 mb-1">Medicine</label>
                    <select
                      value={line.medicineId}
                      onChange={e => handleLineChange(idx, 'medicineId', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Medicine</option>
                      {stock.map(med => (
                        <option key={med._id} value={med._id}>{med.medicineName} (Stock: {med.quantity})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-1">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={line.quantity}
                      onChange={e => handleLineChange(idx, 'quantity', e.target.value)}
                      className="w-20 px-2 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-blue-700 font-semibold">Price</span>
                    <span className="text-sm">Rs. {getLinePrice(line)}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    {getStockWarning(line) && <span className="text-xs text-red-600 font-semibold">{getStockWarning(line)}</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(idx)}
                    className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold"
                    disabled={medLines.length === 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLine}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-4 py-1 rounded-full shadow-sm border border-blue-200 transition-all duration-200"
              >
                + Add Medicine
              </button>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-blue-900">Total: Rs. {totalPrice}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 text-blue-500 hover:text-blue-300 transition-all duration-300 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Prepare
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
}
