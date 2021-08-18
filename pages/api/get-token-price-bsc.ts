import { NextApiRequest, NextApiResponse } from "next";


export default function getTokenPrice({contractAddress,networkName}) => {


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
    
    
    
    
};

