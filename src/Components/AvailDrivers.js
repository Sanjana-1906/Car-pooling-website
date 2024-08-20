import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AvailDrivers.css";
import Header from "./Header";
import Footer from "./Footer";
import { auth, db } from "../config/firebase-configuration";
import { collection, query, where, getDocs } from "firebase/firestore";

function AvailDrivers() {
   

  const navigate = useNavigate();
  const { state } = useLocation(); 
  const ridesCollection = collection(db, "rides");
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Check if the state is available and contains pickup and destination
        if (state && state.pickup && state.destination) {
          const q = query(
            ridesCollection,
            where("isDriver", "==", true),
            where("pickup", "==", state.pickup),
            where("destination", "==", state.destination)
          );

          const querySnapshot = await getDocs(q);
          const availableDrivers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setDrivers(availableDrivers);
        } else {
          
          setError("Pickup location and destination are required to find available drivers.");
        }
      } catch (error) {
        console.error("Error fetching drivers: ", error);
        setError("An error occurred while fetching drivers. Please try again.");
      }
    };

    fetchDrivers();
  }, [state, ridesCollection]);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + cardsPerPage);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
  };

  if (error) {
    return (
      <div className="page">
        <Header />
        <div className="container mt-5 text-center">
          <p className="text-danger">{error}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <h1 className="pt-3 mx-auto text-center">Available Drivers</h1>
      <div className=" mt-2 mb-2">
        <div className="card-deck mx-auto text-center d-flex gap-3 justify-content-center mt-3">
        {drivers.map((driver) => (
            <div key={driver.id} className="card w-25" style={{minHeight:"400px"}}>
              <div className="card-header">
                <h5 className="card-title">
                  {driver.firstName} {driver.lastName}
                </h5>
              </div>
              <div className="card-body">
                  Car Model: {driver.carModel}<br />
                  Car Number: {driver.carNumber}<br />
                  Pickup: {driver.pickup}<br />
                  Destination: {driver.destination}<br />
                  Restrictions: {driver.restrictions}<br />
                  Phone: {driver.phoneNo}
                
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => {
                      navigate('/Chat', { state: { email: driver.email } });
                }}>Contact Driver</button>
              </div>
            </div>
          ))}
        </div>
        <div className="navigation-buttons mt-3 text-center">
          {startIndex > 0 && (
            <button onClick={handlePrev} className="btn btn-secondary mr-2">
              Previous
            </button>
          )}
          {startIndex + cardsPerPage < drivers.length && (
            <button onClick={handleNext} className="btn btn-secondary">
              Next
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AvailDrivers;
