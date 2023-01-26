import React, { useState } from "react";
import "./App.css"

const App = () => {
  const [status, setStatus] = useState("Disconnected");

  const connectToVPN = async () => {
    console.log('Connection Started')
    try {
      // Code to initiate a VPN connection using the WebRTC API
      const pc = new RTCPeerConnection();
      const dc = pc.createDataChannel("vpn");
      dc.onopen = () => {
        setStatus("Connected");
        console.log("VPN connection established");
      };
      dc.onclose = () => {
        setStatus("Disconnected");
        console.log("VPN connection closed");
      };
      await pc.setLocalDescription(await pc.createOffer());
      // Code to send the local description to the VPN server
    } catch (error) {
      setStatus("Disconnected");
      console.error("Error establishing VPN connection:", error);
    }
  };

  const disconnectFromVPN = () => {
    // Code to terminate the VPN connection
    setStatus("Disconnected");
  };

  return (
    <div className="container">
      <h1>VPN Client</h1>
      <p>Status: {status}</p>
      {status === "Disconnected" && (
        <button className="connect-button" onClick={connectToVPN}>
          Connect to VPN
        </button>
      )}
      {status === "Connected" && (
        <button className="disconnect-button" onClick={disconnectFromVPN}>
          Disconnect from VPN
        </button>
      )}
    </div>
  );
};

export default App;
