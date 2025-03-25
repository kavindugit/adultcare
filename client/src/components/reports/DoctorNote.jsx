import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TextAreaDoctorNote = () => {
  // State for storing the values of the text areas
  const [formData, setFormData] = useState({
    text1: "",
  });

  // Handle change in text area
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // You can replace this with your form submission logic
  };

  return (
    <form onSubmit={handleSubmit} >
      <textarea
        name="text1"
        value={formData.text1}
        onChange={handleChange}
        className="border p-2 h-40 w-full resize-none"
        placeholder="Enter text here..."
        id='text1'
      ></textarea>
      
      <div >
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default TextAreaDoctorNote;
