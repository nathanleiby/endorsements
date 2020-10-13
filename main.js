const data = {
  yes: {
    x: [],
    y: [],
    name: "yes",
    orientation: "h",
    marker: {
      color: "rgba(55,255,55,0.6)",
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
      color: "rgba(100,100,100,0.6)",
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
      color: "rgba(255,55,55,0.6)",
      width: 1,
    },
  },
};

const config = {
  displayModeBar: false, // this is the line that hides the bar.
  staticPlot: true,
};

var layout = {
  title: "Endorsements",
  barmode: "stack",
  //   autosize: true,
  width: 1024,
  height: 768,
  yaxis: {
    automargin: true,
  },
};

function run() {
  // Fetch data
  Plotly.d3.csv(
    "https://raw.githubusercontent.com/nathanleiby/endorsements/main/endorsements.csv",
    // "endorsements.csv",
    (err, rows) => {
      console.log({ rows });

      //   Munge data
      const items = {};
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
        .forEach((name) => {
          const results = items[name];
          Object.keys(results).forEach((resultType) => {
            const value = results[resultType];
            data[resultType]["x"].push(value);
            data[resultType]["y"].push(name);
          });
        });

      const d = [data["no"], data["-"], data["yes"]];

      // Display the plot
      Plotly.newPlot("plot", d, layout, config);
    }
  );
}
