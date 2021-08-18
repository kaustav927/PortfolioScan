import React, { useEffect , useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Coin from './Coin'
const CoinTable = ({title, walletData}) => {


const renderTable = (array)=>{
    var CoinTableData =[]
    for (let i = 1; i < array.length-1; i++) {

       let tokenAddress = array[i].TokenAddress;
       let tokenName = array[i].TokenName;
       let tokenSymbol = array[i].TokenSymbol;
       let tokenQuantity = array[i].TokenQuantity;

      CoinTableData.push(
        <Coin tokenAddress={tokenAddress} tokenName={tokenName} tokenQuantity={tokenQuantity} tokenSymbol={tokenSymbol} />
       )
    }
    return CoinTableData;
};


   return(
    <div className="table-container">
        <div className="table-container__table">
            <h2>{title}</h2>
        </div>
            <tr>
                <th>Token Address</th>
                <th>Token Name</th>
                <th>Token Symbol</th>
                <th>Token Quantity</th>
            </tr>
            {renderTable(walletData)}
    </div>
   );
}


CoinTable.propTypes ={
    ///tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    breakOn: PropTypes.oneOf(['medium', 'small', 'large']),
    title: PropTypes.string.isRequired,
}


export default CoinTable

// <h6>{walletData}</h6>