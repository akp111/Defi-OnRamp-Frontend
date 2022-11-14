import { useEffect,useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { chain, useAccount, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  withRouter
} from "react-router-dom";
// import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Payment from "./components/checkout/Payment";
import Register from "./components/register/Register";
import Landing from "./components/landing/landing";
import Logo from "./defi-fiat.png";

// export const ConnectMetamaskButtonComponent = () => {
//   // get a function to connect to a particular wallet
//   // options: useMetamask() - useCoinbase() - useWalletConnect()
//   const connectWithMetamask = useMetamask();
//   // once connected, you can get the connected wallet information from anywhere (address, signer)
//   const address = useAddress();
//   return (
//     <div>
//       {address ? (
//         <h4>Connected as {address}</h4>
//       ) : (
//         <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
//       )}
//     </div>
//   );
// };

function App() {
  const { address, isConnected } = useAccount();
  console.log(address);
  const [result,setResult] = useState(' ');
  useEffect(() => {
    console.log("in here")
    setResult(/[^/]*$/.exec(window.location.href)[0]);

  }, [result]);
  console.log('here',result);
  return (
    <div className="App">
      {/* <ConnectMetamaskButtonComponent /> */}
      {/* <Register address={address}/> */}
      <Router>

            <div style={{marginTop:"2%", marginLeft:"2%"}}>
            <ConnectButton className="connect" style={{zIndex:"-1",}} />
            </div>
            {/* <div
              style={{
                width: "18rem",
                height: "18rem",
                overflow: "hidden",
                position: "absolute",
                top: "-5%",
                left: "35%",
                zIndex:'0',
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={Logo}
                alt="logo"
              />
            </div>  */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Register address={address} />} />
          <Route path="/payment" element={<Payment address={address} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
