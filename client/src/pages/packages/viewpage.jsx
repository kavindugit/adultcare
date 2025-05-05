import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';

const Parcels = () => {
  const { userData } = useContext(AppContent);
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
        window.alert('Error Fetching Parcels');
      }
    } catch (error) {
      console.error('Error fetching parcels:', error);
      window.alert('Error Fetching Parcels');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = async (parcel) => {
    if (!userData?.userId) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/packages/request", {
        guardianId: userData.userId,
        packageId: parcel._id
      });

      if (response.status === 201) {
        alert("Package request sent successfully!");
      } else {
        alert("Failed to send package request.");
      }
    } catch (error) {
      console.error("Error sending package request:", error);
      alert("An error occurred while sending the request.");
    }
  };

  const filteredParcels = apiData.filter((parcel) =>
    parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-7xl mx-auto p-6 bg-blue-100 rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold text-blue-900 text-center mb-6">Packages</h1>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Packages"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 shadow"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredParcels.length > 0 ? (
            filteredParcels.map((parcel) => (
              <div
                key={parcel._id}
                className="bg-white p-4 border border-blue-300 rounded-xl shadow-xl hover:shadow-blue-500/50 transition-transform duration-300 hover:-translate-y-1"
              >
                {parcel.image ? (
                  <img
                    src={`http://localhost:4000/uploads/${parcel.image}`}
                    alt={parcel.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                    No Image
                  </div>
                )}

                <h2 className="text-xl font-bold text-blue-700 mb-2 text-center">{parcel.name}</h2>

                <ul className="list-disc list-inside text-gray-700 mb-2 font-medium text-sm">
                  {parcel.description.split(',').map((line, index) => (
                    <li key={index}>{line.trim()}</li>
                  ))}
                </ul>

                <p className="text-sm text-blue-800 mb-1 font-medium">
                  <span className="font-bold">Duration:</span> {parcel.duration} days
                </p>
                <p className="text-sm text-blue-900 font-bold mb-2">
                  LKR {parcel.price}
                </p>

                <div className="text-xs text-gray-700 mb-2 space-y-1">
                  {parcel.roles?.caregivers && <p>👩‍⚕️ Caregivers: Included</p>}
                  {parcel.roles?.nurses && <p>🧑‍⚕️ Nurses: Included</p>}
                  {parcel.roles?.doctors && <p>👨‍⚕️ Doctors: Included</p>}
                </div>

                <div className="text-xs text-gray-700 space-y-1">
                  {parcel.extraServices?.transport && <p>🚗 Transport: Included</p>}
                  {parcel.extraServices?.extraCaregiverAssignments && <p>🤝 Extra Caregiver: Included</p>}
                </div>

                <button
                  onClick={() => handleSelect(parcel)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Select Package
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              <img
                src="https://illustrations.popsy.co/gray/empty-state.svg"
                alt="No parcels"
                className="w-40 mx-auto mb-4"
              />
              <p>No parcels found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parcels;
