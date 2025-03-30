import * as Plot from "@observablehq/plot";

export function Timeline(data) {
  return Plot.plot({
    x: {type: "band", label: "Year"},
    y: {label: "Launches"},
    marks: [
      Plot.barY(data, {x: "year", y: "launches"})
    ]
  });
}