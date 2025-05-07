import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";
import * as d3 from "d3";


// Display a grouped bar chart of the importance of working out
export function Importance(data, user_gender, user_age, user_importance) {

    // Pre-process the data
    const data_processed = data.map(d => ({
        gender: d.gender,
        how_important: +d.how_important
    }));

    // Set up user data
    const user_data = {
        gender: user_gender,
        how_important: +user_importance
    };

    // Create a mapping of how important to the number of responses
    const grouped = d3.rollups(
        data_processed,
        v => v.length,
        d => d.gender,
        d => d.how_important
    );

    // Flatten the data for plotting with an added value for where the user is
    const bar_data = grouped.flatMap(([gender, entries]) =>
        entries.map(([how_important, count]) => ({
            gender,
            how_important,
            count,
            fill: gender === user_data.gender && how_important === user_data.how_important
                ? "user"
                : how_important
        }))
    );

    // Render the plot
    return Plot.plot({
        marginBottom: 100,
        fx: {padding: 0, label: null, tickRotate: 0, tickSize: 6},
        x: {axis: null, paddingOuter: 0.2, type: "band"},
        y: {grid: true},
        color: {
            legend: true,
            type: "ordinal",
            domain: ["user", 1, 2, 3, 4, 5],
            range: ["red", "#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"],
            label: "Importance Level"
        },
        marks: [
            Plot.barY(bar_data, {
                x: "how_important",
                fx: "gender",
                y: "count",
                fill: "fill",
                inset: 1,
                title: d => `${d.gender}, importance ${d.how_important}: ${d.count} responses`
            }),
            Plot.ruleY([0])
        ]
    });
}




export function Importance_Slider() {
    return Inputs.range([1, 5], {label: "How important is workout out for you?", step: 1})
}