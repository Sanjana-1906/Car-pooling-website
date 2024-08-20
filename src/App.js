import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Home2 from './Components/Home2';
import Registeration from './Components/Registration';
import Login from './Components/Login';
import Profile  from './Components/Profile';
import { auth } from './config/firebase-configuration';
import UserRide1 from './Components/UserRide1';
import UserRide2 from './Components/UserRide2';
import AvailDrivers from './Components/AvailDrivers';
import AvailUsers from './Components/AvailUsers';
import Chat from './Components/Chat';
import Payment from './Components/Payment';
import FeedBack from './Components/Feedback';
import History from './Components/History';
import Contact from './Components/Contact';
import Joinpage from './Components/Joinpage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState ,useEffect} from 'react';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(auth.currentUser);
    });

    return () => unsubscribe();
  }, []);
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      ),
    },{
      path:'/signUp',
      element:<Registeration />
    },
    {
      path: '/Home',
      element: (
        <>
          <Header />
          <Home2 />
          <Footer />
        </>
      ),
    },{
      path:'/Login',
      element:<Login />
    },{
      path:'/Profile',
      element:
      <>
      <Header />
      <Profile />
      <Footer />
      </>
    },{
      path:'/postRide',
      element:<UserRide1 />
    },{
      path:'/bookRide',
      element:<UserRide2 />
    },{
      path:'/AvailableDrivers',
      element:<AvailDrivers />
    },{
      path:'/AvailableUsers',
      element:<AvailUsers />
    },{
      path:'/Chat',
      element:<Chat />
    },{
      path:'/Payment',
      element:<Payment />
    },{
      path:'/Feedback',
      element:<FeedBack />
    },
    {
      path:'/History',
      element:<History />
    },
    {
      path:'/Contact',
      element:<Contact />
    },
    {
      path:'/JoinPage',
      element:<Joinpage />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

