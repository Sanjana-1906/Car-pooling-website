import React from 'react';
import './Contact.css';
import LottieAnimation2 from './LottieAnimation2';
import Header from "./Header";
import Footer from "./Footer";

function Contact() {
  return (
    <div className="contact">
      <Header />
      <div className="contact-container my-5">
        <div className="contact-text-center">
          <h1 className="contact-display-4">Contact</h1>
        </div>
        <div className="contact-content-animation-wrapper mt-5 ">
          <div className="contact-content1">
            <h1>FAQ's</h1>
            <h5>
              1. How do I sign up for the carpooling service?<br />
              2. How do I find a carpool match?<br />
              3. Is there a fee for using the carpooling service?
            </h5>
          </div>
          <div className="contact-animation">
            <LottieAnimation2 />
          </div>
          <div className="contact-content2">
            <h5 className="contact-fs-5">
              <b>Mail:</b> rideshift@gmail.com<br />
              <b>Phone no:</b> +91 7893746576<br />
              <b>Address:</b> Plot no:23, Hitech City, 500090
            </h5>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;