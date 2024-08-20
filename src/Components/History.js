import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { auth, db } from '../config/firebase-configuration';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './History.css';

function History() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const historyRef = collection(db, 'history');
          const q = query(historyRef, where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const ridesData = querySnapshot.docs.map(doc => ({
            id: doc.id, // assuming you want to include the document ID as rideId
            ...doc.data(),
          }));
          setRides(ridesData);
        }
      } catch (error) {
        console.error("Error fetching ride history: ", error);
      }
    };

    fetchRides();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 mb-3 mb-lg-5">
            <div className="position-relative card table-nowrap table-card mt-5" style={{ minHeight: "75vh" }}>
              <div className="card-header align-items-center">
                <h5 className="mb-0">Ride History</h5>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="small text-uppercase bg-body text-muted">
                    <tr>
                      <th>Ride ID</th>
                      <th>Date</th>
                      <th>Pick Up</th>
                      <th>Destination</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rides.length > 0 ? (
                      rides.map(ride => (
                        <tr key={ride.id}>
                          <td>{ride.id}</td>
                          <td>{new Date(ride.timestamp?.seconds * 1000).toLocaleString()}</td>
                          <td>{ride.pickup}</td>
                          <td>{ride.destination}</td>
                          <td>{ride.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No ride history available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="card-footer text-end">
                <a href="#!" className="btn btn-gray">View All Transactions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default History;
