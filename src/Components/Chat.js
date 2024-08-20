import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase-configuration';
import { collection, addDoc,where, query,getDocs, orderBy, onSnapshot, doc, updateDoc, deleteDoc,getDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import './Chat.css';

function Chat() {
  let navigate = useNavigate();
  const { state } = useLocation(); // Contains the contacted user's email
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser || !state?.email) return;

    const chatId = [currentUser.email, state.email].sort().join('_');
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [currentUser, state?.email]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const chatId = [currentUser.email, state.email].sort().join('_');
    const messagesRef = collection(db, 'chats', chatId, 'messages');

    await addDoc(messagesRef, {
      text: newMessage,
      sender: currentUser.email,
      timestamp: new Date(),
    });

    setNewMessage('');
  };

  

  const handlePayNow = async () => {
    try {
      // Query the rides collection for a document where the uid matches currentUser.uid
      const ridesCollection = collection(db, 'rides');
      const rideQuery = query(ridesCollection, where("uid", "==", currentUser.uid));
      const rideQuerySnapshot = await getDocs(rideQuery);
  
      if (!rideQuerySnapshot.empty) {
        // Assuming there is only one matching document
        const rideDoc = rideQuerySnapshot.docs[0];
        const rideData = rideDoc.data();
        
        console.log(rideData);
        
        // Mark the ride as 'done' and save it to the history
        await updateDoc(rideDoc.ref, { status: 'done' });
  
        const historyRef = collection(db, 'history');
        await addDoc(historyRef, { ...rideData, status: 'done', timestamp: new Date() });
        await deleteDoc(rideDoc.ref);
        navigate('/Payment');
      } else {
        console.log("No Doc");
      }
    } catch (error) {
      console.error('Error fetching or updating ride:', error);
    }
  };
  

  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === currentUser.email ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {state?.isDriver ? (
          <button className='btn btn-primary p-2 m-1' onClick={()=>{handlePayNow();navigate('/')}}>Finish Ride</button>
        ) : (
          <button className='btn btn-primary p-2 m-1' onClick={()=>{handlePayNow();navigate('/Payment')}}>Pay Now</button>
        )}
      </div>
    </div>
  );
}

export default Chat;
