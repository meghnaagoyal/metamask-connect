import Child from './components/child';
import Frame from 'react-frame-component';
import React ,{useRef, useEffect, useState} from 'react';

function App() {
  const iframeRef = useRef(null);
  const [recievedMessage, setRecievedMessage] = useState("");
  const[address, setAddress] = useState("");
    
    function accountChangeHandler(account){
      setAddress(account);
      if (!iframeRef.current) return;
      iframeRef.current.contentWindow.postMessage(
        account,
        "http://localhost:3001"
      );
    }
    function connectWallet(){
      if(window.ethereum){
      window.ethereum
      .request({method : "eth_requestAccounts"})
      .then((res)=>accountChangeHandler(res[0]))
      }else {
        alert("install metamask extension");
      }
    }
    useEffect(() => {
      window.addEventListener("message", function (e) {
        if (e.origin !== "http://localhost:3001") return;
        console.log(e.data);
        setRecievedMessage("Got this message from child: " + e.data);
             
      });
    }, []);

  return (
    <div>
      <Frame><Child/></Frame>
       <p>Parent Frame</p>
       <button type="button" onClick={()=>{connectWallet()}}>ConnectWallet</button>
       <p>{recievedMessage}</p>
    </div>
   
  );
}

export default App;