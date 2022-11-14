import Navbar from "../navbar/navbar";
import Hero from "../../hero-new.png";
import "./landing.css";

function Landing() {
  return (
    <>
      <Navbar />
      <hr></hr>
      <div>
        <div className="landing-content">
          <h1 className="hero-moto">
            Defi Using Your <br />
            <span>Fiat</span>
          </h1>
          <div className="landing">
            <div
              style={{
                width: "50rem",
                height: "40rem",
                overflow: "hidden",
                marginTop: "5%",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={Hero}
                alt="hero"
              />
            </div>
          </div>
        </div>
        <div className="section2">
          <h1 className="section2-title">3 Steps to get you started</h1>
          <div className="section2-steps">
            <div className="step-1">
              <h3 style={{fontSize:"2rem"}}>Regsiter</h3>
              <p style={{fontSize:"1.2rem", fontWeight:"500"}}>Register with your wallet and email</p>
            </div>
            <div className="step-2">
              <h3 style={{fontSize:"2rem"}}>Login</h3>
              <p style={{fontSize:"1.2rem", fontWeight:"500"}}>After Registration, </p> <p style={{fontSize:"1.2rem", fontWeight:"500"}}>login with your wallet and email</p>
            </div>
            <div className="step-3">
              <h3 style={{fontSize:"2rem"}}>Enter USD amount</h3>
              <p style={{fontSize:"1.2rem", fontWeight:"500"}}>Enter the USD amount and enter card details</p>
              <p style={{fontSize:"1.2rem", fontWeight:"500"}}>It will lend the equivalent Matic tokens to Aave</p>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="section3">
              Made with 💜 by Ashis
        </div>
      </div>
    </>
  );
}

export default Landing;
