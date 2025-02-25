// Testimonials.jsx
import React from "react";

const testimonials = [
  { name: "John Doe", review: "Amazing service! My grandmother is so happy." },
  { name: "Sarah Lee", review: "Professional and caring staff. Highly recommend!" },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 text-center bg-gray-100">
      <h2 className="text-3xl font-bold">What Our Clients Say</h2>
      <div className="mt-6">
        {testimonials.map((t, index) => (
          <div key={index} className="mt-4">
            <p className="text-lg font-semibold">{t.name}</p>
            <p className="text-gray-600">{t.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
