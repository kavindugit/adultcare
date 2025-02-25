import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7551592/pexels-photo-7551592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Elderly care"
          className="w-full h-full object-cover object-top brightness-75"
        />
      </div>

      {/* Text Overlay */}
      <div className="relative z-10 text-white text-center px-6 md:px-12">
        <p className="text-lg md:text-xl font-light">Caring for Your Loved Ones</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-2">
          Compassionate Adult Care for a Better Tomorrow
        </h1>
        <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto">
          Providing expert medical, emotional, and daily support services for elderly individuals.
        </p>

        {/* Button Group */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-full text-lg shadow-md transition duration-300">
          Explore Care Packages
          </button>   
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
