import { useState } from "react";
import "./App.css";

function App() {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState("");

  const feeRanges = {
    MTN: [
      { max: 100, fee: 2 },
      { max: 500, fee: 5 },
      { max: 1000, fee: 10 },
      { max: 5000, fee: 15 },
      { max: Infinity, fee: 20 },
    ],

    Airtel: [
      { max: 100, fee: 3 },
      { max: 500, fee: 6 },
      { max: 1000, fee: 11 },
      { max: 5000, fee: 16 },
      { max: Infinity, fee: 22 },
    ],

    Zamtel: [
      { max: 100, fee: 2 },
      { max: 500, fee: 4 },
      { max: 1000, fee: 8 },
      { max: 5000, fee: 13 },
      { max: Infinity, fee: 18 },
    ],
  };

  const networks = ["MTN", "Airtel", "Zamtel"];

  const getFee = () => {
    const numericAmount = Number(amount);

    if (!selectedNetwork || numericAmount <= 0) {
      return 0;
    }

    const range = feeRanges[selectedNetwork].find(
      (range) => numericAmount <= range.max
    );

    return range ? range.fee : 0;
  };

  const fee = getFee();
  const total = Number(amount) + fee;

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
          <div className="calculator-section">
            <p className="selected-message">
              {selectedNetwork} selected ✓
            </p>

            <label htmlFor="amount">Enter amount</label>

            <input
              id="amount"
              type="number"
              min="0"
              placeholder="Enter amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            {amount && Number(amount) > 0 && (
              <div className="results">
                <div className="result-row">
                  <span>Transaction Fee</span>
                  <strong>ZMW {fee.toFixed(2)}</strong>
                </div>

                <div className="result-row total-row">
                  <span>Total</span>
                  <strong>ZMW {total.toFixed(2)}</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;