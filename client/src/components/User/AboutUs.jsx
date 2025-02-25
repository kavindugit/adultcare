import React from "react";

const AboutUs = () => {
  const pastActivities = [
    { 
      id: 1, 
      image: "https://www.griswoldcare.com/wp-content/uploads/2024/04/live-caregiver-duties-responsibilities.jpg", 
      title: "Dedicated Caregivers Providing Personalized Support" 
    },
    { 
      id: 2, 
      image: "https://thumbs.dreamstime.com/b/young-male-asian-doctor-crouch-down-holding-hand-talk-to-senior-adult-patient-wheelchair-hospital-hallway-medical-196791034.jpg", 
      title: "Doctors Reviewing Health Reports for Better Care" 
    },
    { 
      id: 3, 
      image: "https://images.squarespace-cdn.com/content/v1/6024992352cb0b327fe94efc/4455586e-a23a-463c-9901-b76a7a42cb84/AdobeStock_547340539.jpeg", 
      title: "Compassionate Nurses Providing Essential Treatments" 
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gray-100 text-center">
      {/* About Us Section */}
      <h2 className="text-3xl font-bold text-blue-900">About Elder Bliss</h2>
      <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-700">
      At Elder Bliss, we provide personalized, high-quality care for your loved ones. Our services include access to specialist doctors, experienced caregivers, and comfortable transportation with a dedicated driver and caregiver. We offer tailored care packages, including medical support and caregiver visits, ensuring peace of mind for families. Additionally, we deliver essential medications directly to your door, making sure your loved ones receive the care they need, when they need it.      </p>

      {/* Past Activities Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-blue-900">Our Journey & Activities</h3>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto">
          Over the years, we've conducted various community programs to support elderly well-being.
        </p>

        {/* Image Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {pastActivities.map((activity) => (
            <div key={activity.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                src={activity.image} 
                alt={activity.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{activity.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-6">
          <a href="/gallery" className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            See More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
