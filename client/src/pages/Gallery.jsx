import React from "react";

const galleryData = [
  {
    id: 1,
    title: "A Day with Our Caregivers",
    description: "Our caregivers provide personalized support to ensure comfort and well-being.",
    images: [
      "https://www.griswoldcare.com/wp-content/uploads/2024/04/live-caregiver-duties-responsibilities.jpg",
      "https://images.unsplash.com/photo-1573126617892-52d4f036c802",
      "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg",
    ],
  },
  {
    id: 2,
    title: "Doctor Consultations & Health Monitoring",
    description: "Regular doctor visits help maintain the best health for our elders.",
    images: [
      "https://thumbs.dreamstime.com/b/young-male-asian-doctor-crouch-down-holding-hand-talk-to-senior-adult-patient-wheelchair-hospital-hallway-medical-196791034.jpg",
    ],
  },
  {
    id: 3,
    title: "Medication & Pharmacy Services",
    description: "We ensure timely medication delivery and caregiver support.",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      "https://images.pexels.com/photos/3987023/pexels-photo-3987023.jpeg",
    ],
  },
  {
    id: 4,
    title: "Special Moments: Safe & Assisted Travel",
    description: "Our seniors enjoy worry-free travel with professional caregiver support.",
    images: [
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      "https://images.pexels.com/photos/325962/pexels-photo-325962.jpeg",
      "https://images.pexels.com/photos/2041388/pexels-photo-2041388.jpeg",
    ],
  },
];

const Gallery = () => {
  return (
    <section className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-blue-900">Our Memories & Activities</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Elder Bliss captures the precious moments of our elders, celebrating care, health, and happiness.
      </p>

      {/* Gallery Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {galleryData.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-semibold text-blue-900 p-4">{item.title}</h3>
            <p className="text-gray-600 px-4">{item.description}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md shadow-md hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button (For Future Expansion) */}
      <div className="mt-10">
        <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Load More
        </button>
      </div>
    </section>
  );
};

export default Gallery;
