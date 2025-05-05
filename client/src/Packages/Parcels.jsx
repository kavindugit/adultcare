import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Parcels = () => {
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/packages/all');
      if (response.status === 200) {
        setApiData(response.data.data);
      } else {
        window.alert('Error Fetching Parcels');
      }
    } catch (error) {
      console.error('Error fetching parcels:', error);
      window.alert('Error Fetching Parcels');
    }
  };


  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this parcel?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:4000/api/packages/${id}`);
      if (response.status === 200) {
        window.alert('Parcel Deleted Successfully');
        fetchData(); // Refresh data after deletion
      } else {
        window.alert('Error Deleting Parcel');
      }
    } catch (error) {
      console.error('Error deleting parcel:', error);
      window.alert('Error Deleting Parcel');
    }
  };

  // Handle Add Parcel
  const handleAddParcel = () => {
    navigate('/');
  };

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter parcels based on the search term
  const filteredParcels = apiData.filter((parcel) =>
    parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Packages</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Parcels"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Button to Add New Package */}
      <div className="text-right mb-4">
        <button
          onClick={handleAddParcel}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add New Package
        </button>
      </div>

      {/* Generate PDF Button */}
      <div className="text-right mb-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Generate PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredParcels.length > 0 ? (
          filteredParcels.map((parcel) => (
            <div key={parcel._id} className="p-4 border rounded-lg shadow hover:shadow-lg transition duration-300">
              <h2 className="text-lg font-semibold text-blue-800">{parcel.name}</h2>
              <p className="text-gray-600">{parcel.description}</p>
              <p className="text-gray-500">Duration: {parcel.duration} days</p>
              <p className="text-gray-900 font-bold">Price: LKR {parcel.price}</p>

     
              <div className="text-sm text-gray-600 mt-2">
                {parcel.roles.caregivers && <p>Caregivers Included</p>}
                {parcel.roles.nurses && <p>Nurses Included</p>}
                {parcel.roles.doctors && <p>Doctors Included</p>}
              </div>


              <div className="text-sm text-gray-600 mt-2">
                {parcel.extraServices.transport && <p>Transport Included</p>}
                {parcel.extraServices.extraCaregiverAssignments && <p>Extra Caregiver Assignments Included</p>}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleUpdate(parcel._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No parcels found.</p>
        )}
      </div>
    </div>
  );
};

export default Parcels;
