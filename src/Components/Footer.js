import React from "react";
import "./Footer.css"; // Import the CSS file for styling
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <ul className="d-flex ml-6 p-4 justify-content-center ">
            <li className="n-2">
              <a href="#">
                <span className="icon">
                  <FaFacebook />
                </span>
              </a>
            </li>
            <li className="m-2">
              {" "}
              <a href="#">
                <span className="icon">
                  <FaInstagram />
                </span>
              </a>
            </li>
            <li className="m-2">
              <a href="#">
                <span className="icon">
                  <FaYoutube />
                </span>
              </a>
            </li>
            <li className="m-2">
              <a href="#">
                <span className="icon">
                  <FaTwitter />
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="row">
          <ul className="d-flex ml-6 justify-content-center ">
            <li >
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Our Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>

        <div className=" id15 d-flex ml-6 justify-content-center  ">
          RideShift Copyright © 2024 RideShift - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;