var yes = {
  x: [3, 0, 9],
  y: ["Prop 19", "Prop 20", "Prop 21"],
  name: "yes",
  orientation: "h",
  marker: {
    color: "rgba(55,255,55,0.6)",
    width: 1,
  },
  type: "bar",
};

var unknown = {
  x: [4, 0, 1],
  y: ["Prop 19", "Prop 20", "Prop 21"],
  name: "unknown",
  orientation: "h",
  type: "bar",
  marker: {
    color: "rgba(100,100,100,0.6)",
    width: 1,
  },
};

var no = {
  x: [4, 11, 1],
  y: ["Prop 19", "Prop 20", "Prop 21"],
  name: "no",
  orientation: "h",
  type: "bar",
  marker: {
    color: "rgba(255,55,55,0.6)",
    width: 1,
  },
};

const config = {
  displayModeBar: false, // this is the line that hides the bar.
};

var data = [no, unknown, yes];

var layout = {
  title: "Endorsements",
  barmode: "stack",
};

function run() {
  Plotly.newPlot("myDiv", data, layout, config);
}
