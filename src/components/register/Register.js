import React, { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import { useSignTypedData, useSignMessage } from "wagmi";
import { useNavigate } from "react-router";
export default function Register({ address }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: JSON.stringify({ email: email, address: address }),
    onSettled(data, error) {
      handleLogin(email, address, data);
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://ec2-13-232-51-110.ap-south-1.compute.amazonaws.com:4000/user/register", {
        address,
        email,
      })
      .then((res) => {
        console.log(res);
        setError("error while registering");
      });
  };

  const handleLogin = (email, address, signature) => {
    axios
      .post("http://ec2-13-232-51-110.ap-south-1.compute.amazonaws.com:4000/user/login", {
        address,
        email,
        signature,
      })
      .then((res) => {
        console.log(res);
        navigate("/payment", { state: { isLogged: true, email } });
      })
      .catch((error) => {
        console.log(error);
        setError("Error while logging in !!");
      });
  };
  return (
    <div className="register-container">
      <h1 className="register-item register-heading">Identify Yourself</h1>
      <input
        className="register-item register-input "
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
      ></input>
      <div className="register-button-div register-item ">
        <button
          className="register-button "
          type="submit"
          onClick={handleRegister}
        >
          Register
        </button>
        {/* <h2 className="register-item" style={{ textAlign: "center" }}>
          OR
        </h2> */}
        <button
          className="register-button "
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            // signTypedData();
            signMessage();
          }}
        >
          Login
        </button>
      </div>
      {error &&  <p className=" error-div error" onClick={()=>{setError(false)}}> {error} </p>}
    </div>
  );
}
