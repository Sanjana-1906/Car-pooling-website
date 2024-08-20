import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserRide.css";
import Header from "./Header";
import Footer from "./Footer";
import { addDoc, collection, Timestamp,doc,getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-configuration";

function UserRide2() {
  const [err, setErr] = useState('');
  const [passengers, setPassengers] = useState(0);
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [restr, setRestr] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const ridesCollection = collection(db, "rides");

  const postRide = async () => {
    const user = auth.currentUser;
    if (!user) {
      setErr("User not logged in.");
      return;
    }
    const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
    
        const data = docSnap.data();
    const rideDate = new Date(date);
    const timestamp = Timestamp.fromDate(rideDate);

    const rideData = {
      passengers,
      pickup,
      destination: dest,
      date: timestamp,
      restrictions: restr,
      uid: user.uid,
      firstName: data.firstName||'',
      lastName: data.lastName||'',
      email: data.email || '',
      phoneNo: data.phoneNo || '',
      gender: data.gender || '', // Ensure these fields exist in your auth profile
      age: data.age || '',       // Ensure these fields exist in your auth profile
      carModel: data.carModel || '', // Add these fields to the user's profile if needed
      carNumber: data.carNumber || '',
      registrationNumber: data.registrationNumber || '',
      aadharNo: data.aadharNumber || '',
      description:data.description||'',
      isDriver:false,
      status:"notConfirmed",
      passengersOfRide:[],
    };

    // Remove any fields that are still undefined
    Object.keys(rideData).forEach(key => {
      if (rideData[key] === '' || rideData[key] === undefined) {
        delete rideData[key];
      }
    });

    try {
      await addDoc(ridesCollection, rideData);
      console.log("Ride Booked Successfully");
      navigate('/AvailableDrivers', { state: { pickup, destination: dest } }); 
    } catch (error) {
      setErr("Failed to book ride: " + error.message);
    }
  };

  return (
    <div className="page">
      <Header />
      <h1 className="pt-3 mx-auto text-center">Book a ride</h1>
      <div className="container mt-2 mb-5">
        <form className="head w-50 mx-auto mb-0" onSubmit={(e) => e.preventDefault()}>
          {err && <p className="text-danger text-center">{err}</p>}
          <div className="mb-2">
            <label><b>Number of passengers:</b></label>
            <input 
              type="number" 
              value={passengers}
              className="form-control" 
              required
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
          </div>
         
          <div className="mb-2">
            <label><b>Pick-up location:</b></label>
            <input 
              type="text" 
              value={pickup}
              className="form-control" 
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label><b>Destination:</b></label>
            <input 
              type="text" 
              value={dest}
              className="form-control" 
              onChange={(e) => setDest(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label><b>Date of Ride:</b></label>
            <input 
              type="date" 
              className="form-control" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
         
          <div className="mb-2">
            <label><b>Restrictions:</b></label>
            <textarea 
              className="form-control" 
              value={restr}
              onChange={(e) => setRestr(e.target.value)}
            />
          </div>
         
          <button type="submit" onClick={postRide} className="btn btn-warning w-100">Book Ride</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserRide2;

