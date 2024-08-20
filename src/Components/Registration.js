import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth';
import { auth,googleProvider ,db} from '../config/firebase-configuration';
import {getDocs,collection,addDoc,doc,updateDoc,setDoc} from 'firebase/firestore';
function Registeration() {
    let navigate=useNavigate();
  const [err, setErr] = useState('');
  const [firstname,setFirstName]=useState("");
  const [lastname,setLastName]=useState("");
  const [gender,setGender]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phoneNo,setPhoneNo]=useState();
  const [age,setAge]=useState();
  const userCollection=collection(db,"User");
  const signIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstname,
        lastName: lastname,
        email: email,
        phoneNo: phoneNo,
        age: age,
        gender: gender,
        carNumber: null,            
        aadharNumber: null,         
        license: null,              
        carModel: null,            
        registrationNumber: null,   
        description: null, 
        reviews:[],
        ratings:[],
        createdAt: new Date() // You can add more fields as needed
      });
      
      console.log("User signed up and additional information saved");
      navigate('/Home');
    } catch (err) {
      console.error(err);
      setErr('Failed to sign up');
    }
  };
  


 

  return (
    <div>
      <Header />
      <div className="card text-center m-auto border-1 w-75 mt-5 mb-3 p-4 card-box-shadow ">
        <div className="flip-container">
          <div className="flipper">
            {/* Front Side */}
            <div className="front">
              <form className="w-100 mx-auto" onSubmit={(e) => e.preventDefault()}>
                <h3 className="mb-3"> SIGN UP </h3>
                <div className="card-body">
                  {err && <p className="text-danger text-center">{err}</p>}

                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        value={firstname}
                        placeholder="First Name"
                        className="form-control mb-3 p-2 rounded-input"
                        onChange={(e)=>setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        value={lastname}
                        placeholder="Last Name"
                        className="form-control mb-3 p-2 rounded-input"
                        onChange={(e)=>setLastName(e.target.value)}
                      />
                      <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        className="form-control mb-3 p-2 rounded-input"
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                      <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        className="form-control mb-3 p-2 rounded-input"
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                      <input
                        type="number"
                        value={age}
                        placeholder="Age"
                        className="form-control mb-3 p-2 rounded-input"
                        onChange={(e)=>setAge(Number(e.target.value))}
                      />
                      <input
                        type="tel"
                        value={phoneNo}
                        placeholder="Phone number"
                        className="form-control mb-3 p-2 rounded-input"
                        onChange={(e)=>setPhoneNo(Number(e.target.value))}
                      />
                      <div className="mb-3 d-flex">
                        <label className="text-dark mr-3 h6">Gender</label>
                        <div className="mb-3 mx-3">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            className="form-check-input"
                        onChange={(e)=>setGender(e.target.value)}
                          />
                          <label htmlFor="male" className="form-check-label">
                            Male
                          </label>
                        </div>
                        <div className="mb-3">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            className="form-check-input"
                        onChange={(e)=>setGender(e.target.value)}
                          />
                          <label htmlFor="female" className="form-check-label">
                            Female
                          </label>
                        </div>
                      </div>
                      
   
                      <button
                      type="submit"
                      className="btn btn-warning button-hover mt-3"
                      onClick={signIn}
                    >
                      Sign Up
                    </button>
                      
                    </div>
                  </div>
                </div>
              </form>
            </div>

           
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Registeration;