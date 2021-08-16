//import styles from '../styles/Home.module.css'
//import styles from '../styles/Home.module.css'
import React from "react";
//import { AddressInput } from '../components/addressInput'


export default function Home() {
  const [walletAddress, setWalletAddress] = React.useState('')
  const [responseData, setResponseData]=React.useState('')
  
 
 
 
  async function submitWalletAddress() {
		const res = await fetch('http://localhost:3000/api/get-token-holdings-bsc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
            address: walletAddress
			})
		}).then((res) => res.json()).then((res)=>{
			setResponseData(res.data)
			console.log(responseData)
			
		}).catch((error)=>{
			console.log(error)
		})
	}






return (
	<div>
		<div>
      		<input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="0x8cE8338516Ce6De5cFBea213e4C92513f2c0Dbde"/>
     		<button onClick={submitWalletAddress}>Submit</button>
		</div>

		<div>
	
		{JSON.stringify(responseData[3].TokenName)}
		</div>

	</div>
  )
}


//0x8cE8338516Ce6De5cFBea213e4C92513f2c0Dbde