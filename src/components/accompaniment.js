import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";

const skip = "I don't really exercise";
const accompaniment_order = [skip, "Alone", "With a friend", "With a group", "Within a class environment"];
const length_order = [skip, "30 minutes", "1 hour", "2 hours", "3 hours and above"];


export function Accompaniment() {
    return Inputs.radio(accompaniment_order, {
        label: "What does your exercise accompaniment look like?",
        value: accompaniment_order[1]
    })
}


export function Accompaniment_length_health(data, accompaniment, length) {
    let data_processed = data.map(row => ({
        accompaniment: row.with_who,
        length: row.exercise_length,
    }));

    const userInput = {
        accompaniment: accompaniment,
        length: length,
    }

    const y_bars = [];
    for (let i = 0; i < accompaniment_order.length; i++) {
        const accompaniment = accompaniment_order[i];
        y_bars.push(Plot.barY(
            data_processed.filter(x => x.accompaniment == accompaniment).toSorted((x, y) => length_order.indexOf(x.length) - length_order.indexOf(y.length)),
            Plot.groupX({y: "proportion"}, {x: "accompaniment", fill: "length"})
        ));
    }
    
    return Plot.plot({
        marginLeft: 120,
        padding: 0,
        x: {domain: accompaniment_order},
        y: {grid: true},
        color: {legend: true, domain: length_order},
        marks: y_bars
    });
}