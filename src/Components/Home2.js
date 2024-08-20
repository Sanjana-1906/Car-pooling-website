import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-configuration"; // Ensure auth and db are properly exported
import "./Home.css";

function Home2() {
  let navigate = useNavigate();
  const [data,setData]=useState(null);
  const [userHasRide, setUserHasRide] = useState(false);

  useEffect(() => {
    const checkUserRide = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const rideRef = doc(db, "rides", uid); // Path to the user's ride document
          const rideDoc = await getDoc(rideRef);

          if (rideDoc.exists()) {
             setData(rideDoc.data());
            setUserHasRide(true);
         
          } else {
            setUserHasRide(false);
         // Redirect to postRide if no ride document exists
          }
        } else {
          console.log("User not logged in");
        }
      } catch (error) {
        console.error("Error fetching ride status: ", error);
      }
    };

    checkUserRide();
  }, [navigate]);

  const handlePoolMyCarClick = () => {
    if (userHasRide) {
      navigate('/AvailableUsers',{state:{pickup:data.pickup,destination:data.destination}})
    }
    else{
        navigate('/postRide')
    }
  };

  return (
    <div className="Home">
      <div className="divi" style={{ minHeight: "100vh" }}>
        <h1 className="heading">
          SHARE YOUR
          <br />
          <span>RIDE</span>
        </h1>
        <div className="buttons d-flex gap-4">
          <button className="btn1 p-3" type="button" onClick={() => navigate('/bookRide')}>
            Book a Ride
          </button>
          <button className="btn2 p-3" type="button" onClick={handlePoolMyCarClick}>
            Pool my car
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home2;
