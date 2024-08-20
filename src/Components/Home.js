import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
    let navigate=useNavigate();
  return (
    <div className="Home">
     
      <div className="divi" style={{ minHeight: "100vh" }}>
        <h1 className="heading">
          SHARE YOUR
          <br />
          <span>RIDE</span>
        </h1>
        <div className="buttons d-flex gap-4">
          <button className="btn1 p-3" type="button" onClick={()=>navigate('/Login')}>
            Login
          </button>
          <button className="btn2 p-3" type="button" onClick={()=>navigate('/SignUp')} >
            SignUp
          </button>
        </div>
      </div>
  
    </div>
  );
}

export default Home;