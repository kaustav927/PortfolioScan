const Coin = ({tokenAddress,tokenName,tokenSymbol,tokenQuantity})=>{
 
    async function getTokenPrice (){
        const res= await fetch(
            `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`
        )
    }
      return(
        <tr>
          <td>{tokenAddress}</td>
          <td>{tokenName}</td>
          <td>{tokenSymbol}</td>
          <td>{tokenQuantity}</td>
          <td>{tokenPrice}</td>
        </tr>  
      )
};
export default Coin