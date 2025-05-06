import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const ParcelsAdmin = () => {
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/packages/all');
      if (response.status === 200) {
        setApiData(response.data.data);
      } else {
        window.alert('Error Fetching Packages');
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      window.alert('Error Fetching Packages');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this package?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:4000/api/packages/${id}`);
      if (response.status === 200) {
        window.alert('Package Deleted Successfully');
        fetchData();
      } else {
        window.alert('Error Deleting Package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      window.alert('Error Deleting Package');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = (id) => {
    window.alert(`Navigate to Update Form for Package ID: ${id}`);
    // You can later replace this with modal or page redirection
  };

  const filteredParcels = apiData.filter((parcel) =>
    parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Parcels Report', 14, 16);
    let y = 30;
    filteredParcels.forEach((parcel, index) => {
      doc.text(`Parcel ${index + 1}:`, 14, y);
      doc.text(`Name: ${parcel.name}`, 14, y + 10);
      doc.text(`Description: ${parcel.description}`, 14, y + 20);
      doc.text(`Duration: ${parcel.duration} days`, 14, y + 30);
      doc.text(`Price: LKR ${parcel.price}`, 14, y + 40);
      doc.text(`Caregivers: ${parcel.roles.caregivers ? 'Included' : 'Not Included'}`, 14, y + 50);
      doc.text(`Nurses: ${parcel.roles.nurses ? 'Included' : 'Not Included'}`, 14, y + 60);
      doc.text(`Doctors: ${parcel.roles.doctors ? 'Included' : 'Not Included'}`, 14, y + 70);
      doc.text(`Transport: ${parcel.extraServices.transport ? 'Included' : 'Not Included'}`, 14, y + 80);
      doc.text(`Extra Caregiver Assignments: ${parcel.extraServices.extraCaregiverAssignments ? 'Included' : 'Not Included'}`, 14, y + 90);
      y += 100;
    });
    doc.save('parcels-report.pdf');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">All Care Packages</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search packages..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PDF Button */}
      <div className="text-right mb-6">
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate PDF
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredParcels.length > 0 ? (
          filteredParcels.map((parcel) => (
            <div key={parcel._id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-800">{parcel.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{parcel.description}</p>
              <p className="text-sm text-gray-600 mt-1">Duration: {parcel.duration} days</p>
              <p className="text-lg font-bold text-blue-700 mt-1">LKR {parcel.price}</p>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                {parcel.roles.caregivers && <p>✔ Caregivers Included</p>}
                {parcel.roles.nurses && <p>✔ Nurses Included</p>}
                {parcel.roles.doctors && <p>✔ Doctors Included</p>}
                {parcel.extraServices.transport && <p>🚗 Transport Included</p>}
                {parcel.extraServices.extraCaregiverAssignments && <p>👥 Extra Caregiver Assignments</p>}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleUpdate(parcel._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">No parcels found.</p>
        )}
      </div>
    </div>
  );
};

export default ParcelsAdmin;
