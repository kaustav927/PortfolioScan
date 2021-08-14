//import styles from '../styles/Home.module.css'
import React, { useState } from "react";


export default function Home() {

  const [walletAddress, setWalletAddress] = useState('')


  async function submitWalletAddress() {

		const res = await fetch('http://localhost:3000/api/get-token-holdings-bsc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
            address: walletAddress
			})
		}).then((res) => res.json())
		console.log(res.data)
}


  return (
    <div>
			<div>
      <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="Enter a BSC wallet address"/>
      <button onClick={submitWalletAddress}>Submit</button>
			</div>
	</div>
  )
}
