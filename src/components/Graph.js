import normalImg from "./assets/normal.svg";
import lossImg from "./assets/loss.svg";
import profitImg from "./assets/profit.svg";

import "./Graph.css";

export default function Graph(props) {
  const profit = props.check.profit;
  const loss = props.check.loss;
  const percentage = props.check.percentage;
  const total = props.check.total;

  function getImage() {
    if (!profit && !loss) return normalImg;
    if (profit) return profitImg;
    if (loss) return lossImg;
  }

  return (
    <div>
      <div className="graph">
        <img src={getImage()} alt="normal" />
        <div
          className="profit__div"
          style={{
            display: profit || loss ? "flex" : "none",
          }}
        >
          <div className="profit-box">
            <h4 id="title_percentage">{profit ? "Profit" : "Loss"}</h4>
            <h4 id="percentage">{percentage} %</h4>
          </div>
          <div className="profit-box">
            <h4 id="title_total">Total {profit ? "Profit" : "Loss"}</h4>
            <h4 id="Total">₹ {total}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
