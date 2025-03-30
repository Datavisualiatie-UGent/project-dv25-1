import * as Plot from "../../_node/@observablehq/plot@0.6.17/index.28168f6d.js";

export function Timeline(data) {
  return Plot.plot({
    x: {type: "band", label: "Year"},
    y: {label: "Launches"},
    marks: [
      Plot.barY(data, {x: "year", y: "launches"})
    ]
  });
}