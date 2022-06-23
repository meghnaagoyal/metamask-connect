import React, { useEffect, useState } from "react";

function Child() {

    const [data, setdata] = useState({
        address: "",
        Balance: null,
      });

    const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({
          address: account,
        });
        console.log(data.address);
        var message = data.address;
        window.parent.postMessage(account, "http://localhost:3000");
        // Setting a balance
       // getbalance(account);
      };

  const sendMessage = () => {
    if (window.ethereum) {
  
        // res[0] for fetching a first wallet
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
      } else {
        alert("install metamask extension!!");
      }
    console.log(data.address)
  };

  return (
    <div>
      <h2>Child iFrame</h2>
      <button type ="button" onClick={() => {
          sendMessage();
        }}>connectToWallet</button> 
    </div>
  );
}

export default Child;