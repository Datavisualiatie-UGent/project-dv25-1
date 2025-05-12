import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";


// Input for the moment of the day
export function Moment() {
    return Inputs.radio(["Early morning", "Afternoon", "Evening"], {
        label: "When do you workout?",
        value: "Afternoon"
    })
}

// Input for the length of the workout
export function Length(options) {
    return Inputs.radio(options, {
        label: "How long do you workout?",
        value: "30 minutes"
    })
}

// Input for the healthiness of the workout
export function Healthy_Slider() {
    return Inputs.range([1, 5], {label: "How healthy do you feel?", step: 1})
}


// Plot for the healthiness of the workout
export function Healthy(data, moment, length, healthy_slider) {

    // Process data for easier plotting
    let data_processed = data.map(row => ({
        moment: row.exercise_time,
        length: row.exercise_length,
        healthy: row.how_healthy
    }));

    // Set up user input
    const userInput = {
        moment: moment,
        length: length,
        healthy: healthy_slider
    }

    const moment_order = ["Early morning", "Afternoon", "Evening"];
    const length_order = ["I don't really exercise", "30 minutes", "1 hour", "2 hours", "3 hours and above"];

    // Plot a heatmap to show how healthy people feel when they workout and for how long
    return Plot.plot({
        marginLeft: 120,
        padding: 0,
        x: {domain: moment_order},
        y: {domain: length_order},
        color: {
            legend: true,
            type: "linear",
            scheme: "viridis",
            domain: [1, 5],
            clamp: true,
        },
        marks: [
            Plot.cell(
                data_processed,
                Plot.group(
                    {fill: "median"},
                    {x: d => d.moment, y: d => d.length, fill: d => d.healthy, inset: 1.5}
                )
            ),
            Plot.dot(
                [userInput],
                {
                    x: d => d.moment,
                    y: d => d.length,
                    stroke: "black",  // Outline the dot to make it pop
                    fill: d => d.healthy, // Same color scale
                    r: 8 // radius of the dot
                }
            )
        ]
    });
}


export function WorkoutMoment(data) {
    const moment_order = ["Early morning", "Afternoon", "Evening"];

    let moment_counts = Array(3).fill(0);
    data.forEach(row => {
        const moment = row.exercise_time;
        if (moment_order.includes(moment)) {
            moment_counts[moment_order.indexOf(moment)]++;
        }
    })
    moment_counts = moment_counts.map(row => row / (moment_counts[0] + moment_counts[1] + moment_counts[2]) * 100);

    let processed_data = moment_counts.map((row, i) => {
        return {
            moment: moment_order[i],
            value: row
        }
    })

    return Plot.plot({
        y: {label: "Percentage"},
        x: {label: "Moment of Day"},
        marks: [
            Plot.barY(processed_data, {
                x: "moment",
                y: "value",
                fill: "moment",
                title: d => `${d.moment}: ${d.value.toFixed(1)}%`
            }),
        ]
    })
}