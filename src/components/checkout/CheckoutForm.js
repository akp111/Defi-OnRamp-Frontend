import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import { useSignTypedData, useSignMessage } from "wagmi";
import "./CheckoutForm.css";
const ethers = require("ethers");
const timestamp = Date.now()
// All properties on a domain are optional
const domain = {
  name: "Fiat Defi",
  chainId: 80001,
  verifyingContract: "0x5e7fE8E7243925B4e239fc0B93617Fe4903cA2f8",
};

// The named list of all type definitions
const types = {
  Data: [
    { name: "wallet", type: "address" },
    { name: "expiry", type: "uint256" },
  ],
};

const Form = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [amount, setAmount] = useState(0);
  const expiry = Math.floor(Date.now / 1000);
  useEffect(() => {
    console.log(location.state.isLogged);
    // Create PaymentIntent as soon as the page loads
    if (!location.state.isLogged) navigate(`/`);
  }, []);

  // const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
  //   message: ethers.utils.sha256(`${location.state.email}+${address}`),
  //   onSettled(data, error) {
  //     console.log(data);
  //   },
  // });

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      types,
      value: {
        wallet: props.address,
        expiry: timestamp,
      },
      onSettled(data, error) {
        console.log("Settled", { data, error });
        callLendToAaveAPI(data)
      },
    });

  const callLendToAaveAPI = async (signature) => {
    console.log("Calling lend-tot-aave")
    axios
      .post("http://ec2-13-232-51-110.ap-south-1.compute.amazonaws.com:4000/stripe/lend-to-aave", {
        amount: amount,
        user: props.address,
        expiry: timestamp,
        signature: signature,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    axios
      .post("http://ec2-13-232-51-110.ap-south-1.compute.amazonaws.com:4000/stripe/payment", {
        amount: amount * 100,
      })
      .then(async (res) => {
        console.log(res);
        setClientSecret(res.data.client_secret);
        console.log(res.data.client_secret);

        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
          const payload = await stripe.confirmCardPayment(
            res.data.client_secret,
            {
              payment_method: {
                card: cardElement,
              },
            }
          );
          if (payload.error) {
            setError(payload.error);
            setProcessing(false);
            console.log(payload);
          } else {
            console.log(payload);
            // signMessage();
            signTypedData();
            setError(null);
            setProcessing(false);
            setSucceeded(true);
          }
        }
      });
  };
  return (
    <div className="checkout-container">
      <h1 className="register-heading register-item ">Let Defi Magic Begin</h1>
      <form onSubmit={handleSubmit} class="checkout-form">
        <div className="checkout-item">
          <input className="checkout-input " type="email" value={location.state.email}></input>
        </div>
        <div className="checkout-item">
          <input
          className="checkout-input "
            type="text"
            placeholder="Enter Amount in USD"
            onChange={(e) => {
              e.preventDefault();
              setAmount(e.target.value);
            }}
          ></input>
        </div>
        <div className="card-div checkout-item">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "white",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className="checkout-button checkout-item"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      {/* {error && <div className="error-div" onClick={()=>{setError(true)}}> <p className="error"> {error} </p></div>} */}
    </div>
  );
};
const stripePromise = loadStripe(
  "pk_test_51LS2PRSAhbg8fq6rAA6QF6HO9qiFDhTu5aSYT2qi1HvsI3XrFecuqTKlrDUyF2wzoPO2qwmuaxYXULgt7IcUCJIR00ZiSQO57X"
);

const Payment = (props) => (
  <Elements stripe={stripePromise}>
    <Form address={props.address} />
  </Elements>
);

export default Payment;
