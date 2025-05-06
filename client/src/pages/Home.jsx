// Home.jsx

import React from "react";
import AboutUs from "../components/User/AboutUs";
import ChatBotWidget from "../components/User/ChatBotWidget";
import ContactUs from "../components/User/ContactUs";
import Footer from "../components/User/Footer";
import Header from "../components/User/Header";
import HeroSection from "../components/User/HeroSection";
import Services from "../components/User/Services";
import Testimonials from "../components/User/Testimonials";
import WhyChooseUs from "../components/User/WhyChooseUs";


const Home = () => {
  return (
    <div>
  
      <Header />
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
