// Home.jsx

import React from "react";
import AboutUs from "../components/User/AboutUs";
import ChatBotWidget from "../components/User/ChatBotWidget";
import ContactUs from "../components/User/ContactUs";
import Footer from "../components/User/Footer";

import HeroSection from "../components/User/HeroSection";
import Services from "../components/User/Services";
import Testimonials from "../components/User/Testimonials";
import WhyChooseUs from "../components/User/WhyChooseUs";
import Navbar from "../components/Reservations/layout/Navbar";


const Home = () => {
  return (
    <div>
  
      <Navbar />
      <HeroSection/>
      <AboutUs/>
      <Services/>
      <WhyChooseUs/>
      <Testimonials/>
      <ContactUs/>
      <Footer/>
      
        
      <ChatBotWidget/>
    </div>
  );
};

export default Home;
