import React from "react";
import ReactDOM from "react-dom/client";
// import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import '@rainbow-me/rainbowkit/dist/index.css';
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai],
  [
    // alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ThirdwebProvider desiredChainId={ChainId.Mumbai}> */}
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
    {/* </ThirdwebProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
