import * as Plot from "@observablehq/plot";

export function BurnScatterPlot(data) {
    // Ensure numeric fields are treated as numbers
    const processedData = data.map(d => ({
        ...d,
        Session_Duration_hours: Number(d["Session_Duration (hours)"]),
        Calories_Burned: Number(d.Calories_Burned)
    }));

    return Plot.plot({
        marks: [
            Plot.dot(processedData, {
                x: "Session_Duration_hours",
                y: "Calories_Burned",
                stroke: "Workout_Type", // Using stroke for color to differentiate points
                fill: "Workout_Type",   // Also filling the dots with the same color
                title: d => `${d.Workout_Type}\nDuration: ${d.Session_Duration_hours} hrs\nCalories: ${d.Calories_Burned}` // Tooltip
            })
        ],
        x: {
            label: "Session Duration (hours)",
            grid: true
        },
        y: {
            label: "Calories Burned",
            grid: true
        },
        color: {
            legend: true,
            title: "Workout Type"
        },
        style: {
            padding: "20px"
        },
        height: 500 // You can adjust height as needed
    });
}