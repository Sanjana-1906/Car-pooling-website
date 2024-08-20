import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AvailDrivers.css";
import Header from "./Header";
import Footer from "./Footer";
import { auth, db } from "../config/firebase-configuration";
import { collection, query, where, getDoc,getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

function AvailUsers() {
  const navigate = useNavigate();
  const { state } = useLocation(); // Assuming state contains the user's ride details (pickup and destination)
  const ridesCollection = collection(db, "rides");
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Check if the state is available and contains pickup and destination
        if (state && state.pickup && state.destination) {
          const q = query(
            ridesCollection,
            where("isDriver", "==", false),
            where("pickup", "==", state.pickup),
            where("destination", "==", state.destination)
          );

          const querySnapshot = await getDocs(q);
          const availableUsers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setUsers(availableUsers);
        } else {
          setError("Pickup location and destination are required to find available drivers.");
        }
      } catch (error) {
        console.error("Error fetching drivers: ", error);
        setError("An error occurred while fetching drivers. Please try again.");
      }
    };

    fetchUsers();
  }, [state, ridesCollection]);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + cardsPerPage);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
  };
  const handleContactUser = async (user) => {
    try {
      const driver = auth.currentUser;
  
      // Query the rides collection to find the document where the driver's UID matches the current user's UID
      const driverQuery = query(ridesCollection, where("uid", "==", driver.uid));
      const driverQuerySnapshot = await getDocs(driverQuery);
  
      if (!driverQuerySnapshot.empty) {
        // Assuming the user's ride is unique, get the document ID of the first matched document
        const driverDocId = driverQuerySnapshot.docs[0].id;
  
        const driverDoc = doc(db, "rides", driverDocId);
        await updateDoc(driverDoc, {
          passengersOfRide: arrayUnion(user.email),
          status: "Process"
        });
        console.log("Status updated successfully");
  
        // Update the user's ride status
        const userRideRef = doc(db, "rides", user.id);
        await updateDoc(userRideRef, {
          status: "Confirmed"
        });
  
        // Navigate to the chat page with the user's email passed as state
        navigate('/Chat', { state: { email: user.email } });
      } else {
        console.error("No matching driver document found.");
        setError("Could not find the current user's ride document.");
      }
    } catch (error) {
      console.error("Error updating documents: ", error);
      setError("An error occurred while updating the documents. Please try again.");
    }
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
      <h1 className="pt-3 mx-auto text-center">Available Users</h1>
      <div className="mt-2 mb-2">
        <div className="card-deck mx-auto text-center d-flex gap-3 justify-content-center mt-3">
          {users.slice(startIndex, startIndex + cardsPerPage).map((user) => (
            <div key={user.id} className="card w-25" style={{ minHeight: "400px" }}>
              <div className="card-header">
                <h5 className="card-title">
                  {user.firstName} {user.lastName}
                </h5>
              </div>
              <div className="card-body">
                Passengers: {user.passengers}<br />
                Pickup: {user.pickup}<br />
                Destination: {user.destination}<br />
                Restrictions: {user.restrictions}<br />
                Phone: {user.phoneNo}
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => handleContactUser(user)}>
                  Contact User
                </button>
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
          {startIndex + cardsPerPage < users.length && (
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

export default AvailUsers;
