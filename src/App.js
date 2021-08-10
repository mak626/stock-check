import "./App.css";
import { useState } from "react";
import Graph from "./components/Graph";

function App() {
  const [check, setCheck] = useState({
    profit: false,
    loss: false,
    percentage: "",
    total: "",
  });

  const [showError, setshowError] = useState(false);
  const [currentPrice, setcurrentPrice] = useState("");
  const [purchasePrice, setpurchasePrice] = useState("");
  const [stockQty, setstockQty] = useState("");

  const purchasePriceHandler = (event) => setpurchasePrice(event.target.value);
  const currentPriceHandler = (event) => setcurrentPrice(event.target.value);
  const stockQtyHandler = (event) => setstockQty(event.target.value);

  const submitHandler = () => {
    setshowError(false);
    setCheck({ profit: false, loss: false });
    console.log({ currentPrice, purchasePrice, stockQty });

    if (
      isNaN(currentPrice) ||
      isNaN(purchasePrice) ||
      isNaN(stockQty) ||
      currentPrice === "" ||
      purchasePrice === "" ||
      stockQty === ""
    )
      setshowError(true);
    else {
      let c_price = parseInt(currentPrice);
      let p_price = parseInt(purchasePrice);
      let stock_qty = parseInt(stockQty);

      const diff = c_price * stock_qty - p_price * stock_qty;
      const percentage = (Math.abs(diff) / (p_price + c_price)).toFixed(2);

      if (diff < 0) {
        setCheck((prev) => {
          return {
            ...prev,
            loss: true,
            percentage,
            total: Math.abs(diff),
          };
        });
      } else {
        setCheck((prev) => {
          return {
            ...prev,
            profit: true,
            percentage,
            total: Math.abs(diff),
          };
        });
      }
    }

    if (isNaN(currentPrice)) setcurrentPrice("");
    if (isNaN(purchasePrice)) setpurchasePrice("");
    if (isNaN(stockQty)) setstockQty("");
  };

  return (
    <div
      className={
        "main " +
        (check.profit ? "theme-profit " : "") +
        (check.loss ? "theme-loss " : "")
      }
    >
      <h1>Check Profit/Loss on your Stock</h1>
      <Graph check={check} />
      <input
        type="text"
        id="purchase_price"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={purchasePriceHandler}
      />
      <input
        type="text"
        id="current_price"
        placeholder="Current Price"
        value={currentPrice}
        onChange={currentPriceHandler}
      />
      <input
        type="text"
        id="stock_qty"
        placeholder="Stock Quantity"
        value={stockQty}
        onChange={stockQtyHandler}
      />
      <button type="submit" id="submit" onClick={submitHandler}>
        CHECK
      </button>
      <div
        className="invalid-input"
        style={{ display: showError ? "flex" : "none" }}
        id="invalid-input"
      >
        <h4 id="message">Invalid Input</h4>
      </div>
    </div>
  );
}

export default App;
