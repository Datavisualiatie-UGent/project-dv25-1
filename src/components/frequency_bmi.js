import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";

// Input for the height category
export function HeightCategory() {
    return Inputs.text({
        label: "Height",
    })
}

export function weightCategory() {
    return Inputs.text({
        label: "Weight",
    })
}

export function frequencyCategory() {
    return Inputs.radio([2, 3, 4, 5], {
        label: "Workout Frequency (days/week)",
        value: 3,
        title: d => `${d} days/week`
    })
}

function setColor(bmi_num) {
    if (bmi_num < 18.5) {
        return "blue";
    } else if (bmi_num < 25) {
        return "green";
    } else if (bmi_num < 30) {
        return "yellow";
    } else {
        return "red";
    }
}

export function Legend() {
    return Plot.legend({
        color: {
            type: "ordinal",
            domain: ["Underweight", "Normal weight", "Overweight", "Obese"],
            range: ["blue", "green", "yellow", "red"],
            label: "BMI Category"
        }
    })
}

export function FrequencyBmi(data, height, weight, frequency) {
    // Process data for easier plotting
    let data_processed= []
    data.forEach((item) => {
        const bmi = +item["BMI"];
        const frequency = +item["Workout_Frequency (days/week)"];

        data_processed.push(
            {bmi: bmi, frequency: frequency}
        )
    })

    let user_data = {};

    if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
        user_data = {
            bmi: +weight / ((+height / 100) ** 2),
            frequency: +frequency
        };
    }

    return Plot.plot({
        marginLeft: 60,
        marginBottom: 50,
        x: { label: "Workout Frequency (days/week)", domain: [1.5, 5.5], grid: true },
        y: { label: "BMI", domain: [0, 50], grid: true },
        marks: [
            // Horizontal rules for BMI categories
            Plot.ruleY([18.5], { stroke: "gray", strokeDasharray: "4", strokeWidth: 1, title: "Underweight ↔ Normal" }),
            Plot.ruleY([25],   { stroke: "gray", strokeDasharray: "4", strokeWidth: 1, title: "Normal ↔ Overweight" }),
            Plot.ruleY([30],   { stroke: "gray", strokeDasharray: "4", strokeWidth: 1, title: "Overweight ↔ Obesity" }),

            // Dots with jitter for visibility
            Plot.dot(data_processed, {
                x: d => d.frequency + (Math.random() - 0.5) * 0.4, // jitter x-axis slightly
                y: "bmi",
                r: 2,
                fill: d => setColor(d.bmi),
                opacity: 0.6
            }),

            Plot.dot([user_data], {
                x: "frequency",
                y: "bmi",
                r: 7,
                fill: "white"
            }),
        ]
    });
}