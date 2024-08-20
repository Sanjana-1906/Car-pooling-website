import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase-configuration";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(false);
  const [newCarModel, setNewCarModel] = useState("");
  const [newCarNumber, setNewCarNumber] = useState("");
  const [newRegistrationNumber, setNewRegistrationNumber] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setNewCarModel(data.carModel || "");
          setNewCarNumber(data.carNumber || "");
          setNewRegistrationNumber(data.registrationNumber || "");
          setNewDescription(data.description || "");
        } else {
          setErr("No user data found");
        }
      } catch (error) {
        console.error(error);
        setErr("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        carModel: newCarModel,
        carNumber: newCarNumber,
        registrationNumber: newRegistrationNumber,
        description: newDescription,
      });

      console.log("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      console.error(err);
      setErr("Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err) {
    return <div>{err}</div>;
  }

  return (
    <div>
      <div className="profile-container">
        {userData ? (
          <div className="container1 py-6">
            <div className="row justify-content-center">
              <div className="col-md-8 mt-3 mb-3">
                <div className="bg-white shadow rounded overflow-hidden profile-card">
                  <div className="cover">
                    <div className="profile-head d-flex align-items-center">
                      <div className="profile">
                     
                      </div>
                      <div className="ml-4 text-white">
                        <h4 className="mt-0 mb-0">
                          {userData.firstName || 'First Name'} {userData.lastName || 'Last Name'}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 profile-info-container d-flex justify-content-around">
                    <div className="section">
                      <h5 className="mb-0">About</h5>
                      <div className="p-4 rounded shadow-sm bg-light text-dark">
                        <p><b>Phone No:</b> {userData.phoneNo || 'Phone No'}</p>
                        <p><b>Gender:</b> {userData.gender || 'Gender'}</p>
                        <p><b>Email:</b> {userData.email || 'Email'}</p>
                        <p><b>Reviews:</b> <ul>
                          {userData.ratings && userData.ratings.length > 0 ? (
                            userData.ratings.map((rating, index) => (
                              <li key={index}>{rating}</li>
                            ))
                          ) : (
                            <p>No reviews yet</p>
                          )}
                        </ul></p>
                      </div>
                    </div>
                    <div className="section">
                      <h5 className="mb-0">Car Information</h5>
                      <div className="p-4 rounded shadow-sm bg-light">
                        <div className="form-group">
                          <label htmlFor="carName">Car Name</label>
                          <div className="d-flex gap-2">
                            <input
                              type="text"
                              id="carName"
                              className="form-control"
                              value={newCarModel}
                              placeholder={userData.carModel || "Enter car name"}
                              onChange={(e) => setNewCarModel(e.target.value)}
                              disabled={!editing}
                            />
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="carNo">Car Number</label>
                          <div className="d-flex gap-2">
                            <input
                              type="text"
                              id="carNo"
                              className="form-control"
                              value={newCarNumber}
                              placeholder={userData.carNumber || "Enter car number"}
                              onChange={(e) => setNewCarNumber(e.target.value)}
                              disabled={!editing}
                            />
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="registrationNo">Registration Number</label>
                          <div className="d-flex gap-2">
                            <input
                              type="text"
                              id="registrationNo"
                              className="form-control"
                              value={newRegistrationNumber}
                              placeholder={userData.registrationNumber || "Enter registration number"}
                              onChange={(e) => setNewRegistrationNumber(e.target.value)}
                              disabled={!editing}
                            />
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <label className="text-dark h6 mb-1">Car Photo</label>
                          <input
                            type="file"
                            name="carphoto"
                            className="form-control p-2 rounded-input"
                            disabled={!editing}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label className="text-dark h6 mb-1">License</label>
                          <input
                            type="file"
                            name="license"
                            className="form-control p-2 rounded-input"
                            disabled={!editing}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label className="text-dark h6 mb-1">Aadhar Card</label>
                          <input
                            type="file"
                            name="aadharcard"
                            className="form-control p-2 rounded-input"
                            disabled={!editing}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label className="text-dark h6 mb-1">Description</label>
                          <textarea
                            name="description"
                            className="form-control p-2 rounded-input"
                            placeholder={userData.description || "Enter description"}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            disabled={!editing}
                          ></textarea>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          {!editing ? (
                            <button className="btn p-2" onClick={handleEdit}>
                              <img src="https://clipground.com/images/edit-icon-png-white-7.jpg" style={{ width: "20px" }} alt="Edit" />
                            </button>
                          ) : (
                            <button className="btn btn-secondary p-2" onClick={handleSave}>Save</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
