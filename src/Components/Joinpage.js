import React from 'react';
import './Joinpage.css'; // Import the regular CSS file
import LottieAnimation1 from './LottieAnimation1';
import Header from "./Header";
import Footer from "./Footer";

function Joinpage() {
  return (
    <div className="joinpage">
      <Header />
      <div className="joinpage-container my-5">
        <div className="joinpage-text-center">
          <h1 className="joinpage-display-4">About Us</h1>
          <div className="joinpage-navy-line" />
          <h5 className="mt-5">
            Our carpooling website is designed to revolutionize daily commuting by offering a smart, efficient, and eco-friendly solution. By connecting drivers and passengers, our platform enables users to share rides, significantly reducing fuel consumption and vehicle emissions. This not only helps individuals save on petrol costs but also contributes to a greener environment by minimizing the number of cars on the road. With user-friendly features and a focus on community and convenience, our website makes carpooling an easy and effective way to commute, fostering a more sustainable and connected society.
          </h5>
        </div>
        <div className="joinpage-content-animation-wrapper mt-2">
          <div className="joinpage-animation">
            <LottieAnimation1 />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Joinpage;