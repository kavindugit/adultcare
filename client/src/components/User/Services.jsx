import React from "react";

const services = [
  { 
    title: "Comprehensive Care Packages", 
    description: "Tailored packages including doctor visits, nursing care, and caregiver support." 
  },
  { 
    title: "Specialist Doctor Channeling", 
    description: "Book specialist consultations with transport and caregiver assistance included." 
  },
  { 
    title: "Home Pharmacy Services", 
    description: "Get prescribed medicines delivered to your doorstep for convenience and safety." 
  },
  { 
    title: "Safe & Assisted Travel", 
    description: "Provide drivers and caregivers to accompany seniors for travel and appointments." 
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-blue-900">Our Services</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Elder Bliss offers a range of specialized services to ensure comfort, safety, and well-being for seniors.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-72 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-900">{service.title}</h3>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Navigation Links (Centered) */}
      <nav className="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-6">
            <li><a href="/report-module" className="hover:text-gray-300">Report Management</a></li>
          </ul>
        </nav>
    </section>
  );
};

export default Services;
