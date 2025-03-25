import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextAreaDoctorNote from "./DoctorNote"
import TextAreaNurseNote from "./NurseNote"
import TextAreaCGNote from "./CareGiverNote"

const Notes = () => {
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // You can replace this with your form submission logic
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-5">   
      <TextAreaDoctorNote />
      <TextAreaNurseNote/>
      <TextAreaCGNote/>
    </div>
  );
};

export default Notes;
