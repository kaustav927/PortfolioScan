import styles from '../styles/Home.module.css'
import React, { useState } from "react";


export default function Home() {

  const [walletAddress, setWalletAddress] = useState('')


  async function submitWalletAddress() {

		const res = await fetch('/api/get-token-holdings-bsc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
            address: walletAddress
			})
		}).then((res) => res.json(),console.log(res.body.data))
		
}

  

  return (
    <div className={styles.container}>
			<div className={styles.inputArea}>
      <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="Enter a BSC wallet address"/>
      <button onClick={submitWalletAddress}>Submit</button>
			</div>
	</div>
  )
}
