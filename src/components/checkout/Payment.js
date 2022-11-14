import React from "react";

import CheckoutForm from "./CheckoutForm";

export default function StripeDialogue(props) {
  return (
    <div>
      <CheckoutForm  address={props.address}/>
    </div>
  );
}
