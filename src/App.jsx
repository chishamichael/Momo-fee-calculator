import { useState } from "react";
import "./App.css";

function App() {
  const [selectedNetwork, setSelectedNetwork] = useState("");

  const networks = ["MTN", "Airtel", "Zamtel"];

  return (
    <div className="app">
      <div className="calculator-card">
        <h1>Welcome to Mobile Money</h1>

        <h2>Choose your network</h2>

        <div className="network-list">
          {networks.map((network) => (
            <button
              key={network}
              className={`network-button ${
                selectedNetwork === network ? "selected" : ""
              }`}
              onClick={() => setSelectedNetwork(network)}
            >
              {network}
            </button>
          ))}
        </div>

        {selectedNetwork && (
          <p className="selected-message">
            {selectedNetwork} selected ✓
          </p>
        )}
      </div>
    </div>
  );
}

export default App;