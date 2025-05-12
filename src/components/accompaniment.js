import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";
import * as d3 from "d3";

const skip = "I don't really exercise";
const accompaniment_order = ["Alone", "With a friend", "With a group", "Within a class environment"];
const length_order = ["30 minutes", "1 hour", "2 hours", "3 hours and above"];


export function Accompaniment() {
    return Inputs.radio(accompaniment_order, {
        label: "What does your exercise accompaniment look like?",
        value: accompaniment_order[1]
    })
}


export function Accompaniment_length_health(data, accompaniment, length) {
    let data_processed = data.filter(row => row.exercise_length !== skip).map(row => ({
        accompaniment: row.with_who,
        length: row.exercise_length,
    }));

    const userInput = {
        accompaniment: accompaniment,
        length: length,
    }
    
    // Total counts per accompaniment
    const totalByAccompaniment = Object.fromEntries(
        d3.rollups(data_processed, v => v.length, d => d.accompaniment)
    );
    
    // Build an array of {accompaniment, length, proportion, y1, y2} blocks for stacking
    let stacked_data = [];
    for (let acc of accompaniment_order) {
        const total = totalByAccompaniment[acc] || 1;
        let offset = 0;
        for (let len of length_order) {
        const count = data_processed.filter(
            d => d.accompaniment === acc && d.length === len
        ).length;
        const proportion = count / total;
        const block = {
            accompaniment: acc,
            length: len,
            y1: offset,
            y2: offset + proportion,
        };
        offset += proportion;
        if (proportion > 0) stacked_data.push(block);
        }
    }
    
    // Plot main bars using your original method
    const y_bars = accompaniment_order.map((accompaniment) =>
        Plot.barY(
        data_processed
            .filter(x => x.accompaniment === accompaniment)
            .toSorted(
            (x, y) =>
                length_order.indexOf(x.length) - length_order.indexOf(y.length)
            ),
        Plot.groupX(
            { y: "proportion" },
            { x: "accompaniment", fill: "length" }
        )
        )
    );
    
    // Find the specific block to highlight
    const highlight_block = stacked_data.find(
        d =>
        d.accompaniment === userInput.accompaniment &&
        d.length === userInput.length
    );
    
    let user_highlight;
    if (highlight_block === undefined) {
    // Draw a transparent rectangle over just that block
        user_highlight = Plot.rectY(
            [],
            {}
        )
    } else {
        user_highlight = Plot.rectY(
            [highlight_block],
            {
            x: "accompaniment",
            y1: "y1",
            y2: "y2",
            stroke: "red",
            strokeWidth: 2,
            fill: "none",
            }
        );
    }

    // Final plot
    return Plot.plot({
        marginLeft: 120,
        padding: 0,
        x: { domain: accompaniment_order, label: length === skip ? "We do not have a user indicator if you indicated you don't exercise for exercise length" : "" },
        y: { grid: true, label: "Percentage"},
        color: { legend: true, domain: length_order },
        marks: [...y_bars, user_highlight],
    });
}