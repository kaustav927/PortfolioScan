//import styles from '../styles/Home.module.css'
//import styles from '../styles/Home.module.css'
//import { AddressInput } from '../components/addressInput'
import React from "react";
//import {BrowserRouter,Route} from "react-router-dom";
import { useRouter } from "next/dist/client/router";
import CoinDetailPage from "./CoinDetailPage";
import CoinSummaryPage from "./CoinSummaryPage";
import Header from "./components/Header";
import CoinTable from "./components/CoinTable";


export default function Home() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = React.useState("");
  const [walletData, setwalletData] = React.useState("");
  const [walletDataUrl, setWalletDataUrl] = React.useState("");







  async function submitWalletAddress() {
    const res = await fetch(
      "http://localhost:3000/api/get-token-holdings-bsc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: walletAddress,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setwalletData(res.data);
        setWalletDataUrl(res.url);
        console.log(JSON.stringify(walletData));
        console.log(walletDataUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }









  return (
    <div>
    <Header />
    <div>
      <input
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter Web3.0 Wallet address Here"
      />
      <button onClick={submitWalletAddress}>Connect Wallet</button>

      <CoinTable walletData={walletData} title={walletAddress}/>

    
    </div>

    <button type="button" onClick={() => router.push("/CoinDetailPage")}>
      Click me
    </button>
   
    </div>
  );
}

//0x8cE8338516Ce6De5cFBea213e4C92513f2c0Dbde
//  <h4>{JSON.stringify(walletData)}</h4>

