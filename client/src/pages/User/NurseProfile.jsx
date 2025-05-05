import { useContext, useEffect, useState } from 'react';
import { User, Shield, Award, Clock, MapPin, Phone, Mail, Heart, Calendar } from 'lucide-react';

const NurseProfile = () => {
  const [userData, setUserData] = useState(null);
  const [nurseInfo, setNurseInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // Mock user data
      const mockUserData = {
        userId: "12345",
        name: "Sarah Johnson",
        email: "sarah.johnson@hospital.com",
        phoneNo: "(555) 123-4567",
        address: "123 Medical Center Dr, Healthcare City, HC 12345"
      };
      
      // Mock nurse professional data
      const mockNurseInfo = {
        licenseNumber: "RN-987654321",
        yearsOfExperience: 8,
        specialization: "Critical Care",
        availableShifts: "Morning, Night",
        certifications: ["BLS", "ACLS", "PALS", "Critical Care Certification"],
        salary: "85,000"
      };
      
      setUserData(mockUserData);
      setNurseInfo(mockNurseInfo);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-blue-800 font-medium">Loading nurse profile...</p>
      </div>
    );
  }

  // Mock data for the profile photo
  const profilePhoto = "/api/placeholder/400/400";
  
  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Nurse Profile</h1>
          <div className="h-1 w-24 bg-blue-500 mt-2"></div>
        </div>
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white flex-shrink-0 mb-4 md:mb-0">
              <img 
                src={profilePhoto} 
                alt="Nurse profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-0 md:ml-6 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
              <p className="text-blue-100 text-lg">Registered Nurse</p>
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <Award className="w-5 h-5 text-yellow-300 mr-1" />
                <span className="text-blue-100">{nurseInfo?.yearsOfExperience} Years Experience</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">Personal Info</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-700">{userData.phoneNo}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-700">{userData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Professional Information */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">Professional Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium text-blue-800">{nurseInfo.licenseNumber}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium text-blue-800">{nurseInfo.yearsOfExperience} years</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-medium text-blue-800">{nurseInfo.specialization}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Available Shifts</p>
                  <p className="font-medium text-blue-800">{nurseInfo.availableShifts}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg md:col-span-2">
                  <p className="text-sm text-gray-500">Certifications</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {nurseInfo.certifications.length > 0 ? 
                      nurseInfo.certifications.map((cert, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {cert}
                        </span>
                      )) : 
                      <span className="text-gray-600">None</span>
                    }
                  </div>
                </div>
              </div>
            </div>
            
            {/* Salary Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">Compensation</h3>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Annual Salary</p>
                  <p className="text-2xl font-bold text-blue-800">${nurseInfo.salary}</p>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Shift Status</p>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-blue-900">Recent Activity</h3>
          </div>
          
          <div className="space-y-4">
            {/* Activity items would be populated dynamically */}
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <p className="text-sm text-gray-500">Yesterday</p>
              <p className="text-gray-700">Completed 12-hour shift at Main Hospital</p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <p className="text-sm text-gray-500">May 3, 2025</p>
              <p className="text-gray-700">Completed CPR recertification training</p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <p className="text-sm text-gray-500">April 28, 2025</p>
              <p className="text-gray-700">Attended monthly staff meeting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseProfile;