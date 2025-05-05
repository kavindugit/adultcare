import React from 'react';
import PackageManagement from '../../components/PackageManagement/PackageManagement';


const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold">AC</span>
            </div>
            <h1 className="text-xl font-bold">AdultCare</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li className="text-gray-400">Dashboard</li>
              <li className="text-primary font-medium">Packages</li>
              <li className="text-gray-400">Patients</li>
              <li className="text-gray-400">Staff</li>
              <li className="text-gray-400">Reports</li>
            </ul>
          </nav>
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        </div>
      </header>
      <main>
        <PackageManagement/>
      </main>
    </div>
  );
};

export default Index;