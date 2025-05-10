import * as Plot from "@observablehq/plot";

export function createHeartRateBoxPlots(data) {
    // 1. Parse the heart rate values to numbers:
    const longData = data.flatMap(d => [
        { type: "Resting", value: Number(d.Resting_BPM) },
        { type: "Average", value: Number(d.Avg_BPM) },
        { type: "Max", value: Number(d.Max_BPM) },
    ]);

    return Plot.plot({
        y: {
            grid: true,
            label: "Heart Rate (bpm)",
            reverse: true,
            domain: [40, 210],
        },
        x: {
            label: "Metric",
            domain: ["Resting", "Average", "Max"],
        },
        color: {
            domain: ["Resting", "Average", "Max"],
            range: ["steelblue", "orange", "firebrick"],
            legend: true,
        },
        marks: [
            Plot.boxY(longData, {
                x: "type",
                y: "value",
                fill: "type",
                sortX: ["Resting", "Average", "Max"]
            })
        ],
    });
}
