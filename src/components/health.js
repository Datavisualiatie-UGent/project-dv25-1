import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";

export function Moment() {
    return Inputs.radio(["Early morning", "Afternoon", "Evening"], {
        label: "When do you workout?",
        value: "Afternoon"
    })
}

export function Length() {
    return Inputs.radio(["I don't really exercise", "30 minutes", "1 hour", "2 hours", "3 hours and above"], {
        label: "How long do you workout?",
        value: "30 minutes"
    })
}

export function Healthy_Slider() {
    return Inputs.range([0, 5], {label: "How healthy do you feel?", step: 1})
}


export function Healthy(data, moment, length, healthy_slider) {
    let skip = "I don't really exercise";

    let data_processed = data.map(row => ({
        moment: row.exercise_time,
        length: row.exercise_length,
        healthy: row.how_healthy
    }));

    const userInput = {
        moment: moment,
        length: length,
        healthy: healthy_slider
    }

    const moment_order = ["Early morning", "Afternoon", "Evening"];
    const length_order = [skip, "30 minutes", "1 hour", "2 hours", "3 hours and above"];

    return Plot.plot({
        marginLeft: 120,
        padding: 0,
        x: {domain: moment_order},
        y: {domain: length_order},
        color: {
            legend: true,
            zero: true,
            type: "linear",
            scheme: "viridis",
            domain: [0, 5],
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