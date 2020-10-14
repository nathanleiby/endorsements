import * as Plotly from "plotly.js";
import React from "react";
import { useAsync } from "react-async";
import Plot from "react-plotly.js";
import "./App.css";
import logo from "./logo.svg";

const data: any = {
  yes: {
    x: [],
    y: [],
    name: "yes",
    orientation: "h",
    marker: {
      color: "#0000FF",
      width: 1,
    },
    type: "bar",
  },
  "-": {
    x: [],
    y: [],
    name: "unknown",
    orientation: "h",
    type: "bar",
    marker: {
      color: "#F4F4F4",
      width: 1,
    },
  },
  no: {
    x: [], // values
    y: [], // names
    name: "no",
    orientation: "h",
    type: "bar",
    marker: {
      color: "#FFB03B",
      width: 1,
    },
  },
};

const config = {
  displayModeBar: false, // this is the line that hides the bar.
  staticPlot: true,
};

const barmode = 'stack';
var layout = {
  title: "Endorsements",
  barmode,
  width: 1024,
  height: 768,
  yaxis: {
    automargin: true,
  },
};

const ENDORSEMENTS_URL =
  "https://raw.githubusercontent.com/nathanleiby/endorsements/main/endorsements.csv";
async function fetchData() {
  return new Promise(function (resolve, reject) {
    Plotly.d3.csv(ENDORSEMENTS_URL, function (err: any, rows: any[]) {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
}

function mungeData(rows: any) {
  const items: any = {};
  for (let i = 0; i < rows.length; i++) {
    Object.keys(rows[i]).forEach((key) => {
      if (key === "Endorser") {
        // ignore
        return;
      }

      if (!items[key]) {
        // initialize
        items[key] = {};
        items[key]["yes"] = 0;
        items[key]["-"] = 0;
        items[key]["no"] = 0;
      }

      const vote = rows[i][key];
      items[key][vote]++;
    });
  }
  console.log({ items });

  Object.keys(items)
    .sort()
    .reverse()
    .forEach((name) => {
      const results = items[name];
      Object.keys(results).forEach((resultType) => {
        const value = results[resultType];
        data[resultType]["x"].push(value);
        data[resultType]["y"].push(name);
      });
    });

  const d = [data["no"], data["-"], data["yes"]];
  return d;
}

function App() {
  let { data, error } = useAsync({ promiseFn: fetchData });
  if (!data) {
    data = [];
  }
  const d = mungeData(data)
  console.log({d});
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

{/*
 // @ts-ignore */}
        <Plot data={d} layout={layout} config={config} />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
