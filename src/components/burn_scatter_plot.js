import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";

export function WorkoutTypeInput(options) {
    return Inputs.select(options, {
        label: "Choose your workout type:",
        multiple: true,
        value: options
    })
}

export function BurnScatterPlot(data, workout_options) {
    // Ensure numeric fields are treated as numbers
    data = data.filter(d => workout_options.includes(d["Workout_Type"]));
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