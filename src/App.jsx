import { useState } from "react";
import "./App.css";

function App() {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [showFeeStructure, setShowFeeStructure] = useState(false);

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

  const networks = [
    { name: "MTN", logo: "MTN" },
    { name: "Airtel", logo: "airtel" },
    { name: "Zamtel", logo: "Zamtel" },
  ];

  const getFee = () => {
    const numericAmount = Number(amount);

    if (!selectedNetwork || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      return 0;
    }

    const range = feeRanges[selectedNetwork].find(
      (range) => numericAmount <= range.max
    );

    return range ? range.fee : 0;
  };

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
    setShowFeeStructure(false);
    setAmount("");
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;

    if (value === "" || Number(value) >= 0) {
      setAmount(value);
    }
  };

  const fee = getFee();
  const numericAmount = Number(amount);
  const hasValidAmount =
    amount !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount > 0;

  const total = hasValidAmount ? numericAmount + fee : 0;

  return (
    <div className={`app ${selectedNetwork.toLowerCase()}`}>
      <div className="calculator-card">
        <div className="card-content">
          <h1>Welcome to Mobile Money</h1>
          <p className="subtitle">Choose your network to get started</p>

          <div className="network-list">
            {networks.map((network) => (
              <button
                key={network.name}
                className={`network-button ${
                  selectedNetwork === network.name ? "selected" : ""
                }`}
                onClick={() => handleNetworkChange(network.name)}
              >
                <span
                  className={`network-logo ${network.name.toLowerCase()}`}
                >
                  {network.logo}
                </span>

                <span>{network.name}</span>

                {selectedNetwork === network.name && (
                  <span className="check">✓</span>
                )}
              </button>
            ))}
          </div>

          {selectedNetwork && (
            <div className="calculator-section">
              <div className="selected-header">
                <span className="small-logo">
                  {selectedNetwork === "MTN"
                    ? "MTN"
                    : selectedNetwork === "Airtel"
                    ? "airtel"
                    : "Zamtel"}
                </span>

                <span>{selectedNetwork} Mobile Money</span>
              </div>

              <label htmlFor="amount">Enter amount</label>

              <div className="amount-input">
                <span>ZMW</span>

                <input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>

              {amount !== "" && !hasValidAmount && (
                <p className="error-message">
                  Please enter an amount greater than 0.
                </p>
              )}

              {hasValidAmount && (
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

              <button
                className="fee-structure-button"
                onClick={() => setShowFeeStructure(!showFeeStructure)}
              >
                <span>{selectedNetwork} Fee Structure</span>
                <span>{showFeeStructure ? "▲" : "▼"}</span>
              </button>

              {showFeeStructure && (
                <div className="fee-structure">
                  {feeRanges[selectedNetwork].map((range, index) => {
                    const previousMax =
                      index === 0
                        ? 0
                        : feeRanges[selectedNetwork][index - 1].max;

                    const rangeLabel =
                      range.max === Infinity
                        ? `ZMW ${previousMax + 1}+`
                        : `ZMW ${previousMax + 1}–${range.max}`;

                    return (
                      <div className="fee-row" key={index}>
                        <span>{rangeLabel}</span>
                        <strong>ZMW {range.fee.toFixed(2)}</strong>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;