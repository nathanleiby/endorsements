import * as Plotly from "plotly.js";
import React from "react";
import { useState } from "react";
import { useAsync } from "react-async";
import Plot from "react-plotly.js";
import "./App.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@material-ui/core";

type CSVRow = { [column: string]: string };

const config = {
  displayModeBar: false, // this is the line that hides the bar.
  staticPlot: true,
};

// TODO: put a bad url and see how the errr case works
const ENDORSEMENTS_URL = `${process.env.PUBLIC_URL}/endorsements.csv`;
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

function mungeData(rows: any, checkboxState: any) {
  // Base data
  const data: { [vote: string]: any } = {
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

  // Modify the base data
  const items: any = {};
  for (let i = 0; i < rows.length; i++) {
    if (!checkboxState[rows[i]["Endorser"]]) {
      continue;
    }

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
  // read CSV
  let csvData: CSVRow[];
  let { data, error } = useAsync({ promiseFn: fetchData });
  if (!data) {
    data = [];
  }
  // @ts-ignore
  csvData = data;

  // handle checkboxes
  const baseState: { [endorser: string]: boolean } = {};
  const [checkboxState, setCheckboxState] = useState(baseState);

  const handleChange = (event: any) => {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
  };

  const d = mungeData(csvData, checkboxState);
  console.log({ d });

  return (
    <div className="App">
      <div>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormLabel component="legend">Choose Endorsers</FormLabel>
            <FormGroup>
              {csvData.map((item) => {
                const endorser = item["Endorser"];
                return (
                  <FormControlLabel
                    key={endorser}
                    control={
                      <Checkbox
                        checked={!!checkboxState[endorser]}
                        onChange={handleChange}
                        name={endorser}
                        color="primary"
                      />
                    }
                    label={item["Endorser"]}
                  />
                );
              })}
            </FormGroup>
          </Grid>
          <Grid item xs={9}>
            <Plot
              data={d}
              layout={{
                title: "Endorsements",
                barmode: "stack",
                // TODO: Transition isn't working
                // transition: {
                //   duration: 200,
                //   easing: "cubic-in-out",
                // },
                width: 1024,
                height: 768,
                yaxis: {
                  automargin: true,
                },
              }}
              config={config}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
