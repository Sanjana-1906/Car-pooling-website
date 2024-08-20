import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { auth, db } from "../config/firebase-configuration"; // Ensure db is imported
import { updateDoc, doc, arrayUnion, addDoc ,collection,setDoc} from "firebase/firestore";

function FeedBack() {
  const [isDriver, setIsDriver] = useState(false);
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState(""); // State for errors
  const [rating, setRating] = useState();
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const submitFeedback = async (data) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setErr("You must be logged in to submit feedback.");
        return;
      }
      const feedback = {
        rating,
        review,
      };
      // Reference to the user's feedback document
      const feedbackRef = doc(collection(db, "users", user.uid, "feedback"));
      // Adding the feedback document to the user's feedback collection
      await setDoc(feedbackRef, feedback);
      // Navigate to the Home page or any other route
      navigate('/Home'); 
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      setErr("An error occurred while submitting feedback. Please try again.");
    }
  };
  
  return (
    <div className="mx-auto">
      <Header />
      <h2 className="pt-4 text-center">Driver Feedback</h2>

      <form className="head w-50 mx-auto mt-5 mb-0" onSubmit={handleSubmit(submitFeedback)}>
        {err && <p className="text-danger text-center">{err}</p>}

        <div>
          <label className="text-dark h6 mb-6">Rate the driver:</label>
          <select id="rating" className="form-select mb-2" onChange={(e) => setRating(Number(e.target.value))}>
            <option value="" disabled>Select rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>

        <div>
          <label className="text-dark h6 mb-6">Feedback:</label>
          <textarea id="feedback" className="form-control mb-2" onChange={(e) => setReview(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="text-dark h6 mr-3">Do you want to book a package with this driver?</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="carpoolYes"
              name="carpool"
              value="yes"
              className="form-check-input"
              {...register('ispackage')}
              onClick={() => setIsDriver(true)}
            />
            <label htmlFor="carpoolYes" className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="carpoolNo"
              name="carpool"
              value="no"
              className="form-check-input"
              {...register('ispackage')}
              onClick={() => setIsDriver(false)}
            />
            <label htmlFor="carpoolNo" className="form-check-label">No</label>
          </div>
        </div>

        {isDriver && (
          <>
            <label className="text-dark h6 mb-3">Pick-up location:</label>
            <input
              type="text"
              placeholder="Pick-up location"
              className="form-control mb-3 p-2 rounded-input"
              {...register('pickup')}
            />
            <label className="text-dark h6 mb-3">Destination:</label>
            <input
              type="text"
              placeholder="Destination"
              className="form-control mb-3 p-2 rounded-input"
              {...register('destination')}
            />
            <label className="text-dark h6 mb-3">Package Duration:</label>
            <input
              type="text"
              placeholder="Duration"
              className="form-control p-2 mb-3 rounded-input"
              {...register('packageduration')}
            />
            <label className="text-dark h6 mb-3">Restrictions:</label>
            <textarea
              name="restrictions"
              className="form-control mb-3 rounded-input"
              {...register('restrictions')}
            ></textarea>
          </>
        )}
        <button type="submit" className="btn btn-warning" onClick={()=>navigate('/Home')}>
          Submit
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default FeedBack;
