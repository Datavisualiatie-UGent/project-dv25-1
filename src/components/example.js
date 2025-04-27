import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";

function convertDateToInterval(date) {
    const dateObj = new Date(date);
    const currentDate = new Date();

    const diffYears = Math.abs(currentDate.getFullYear() - dateObj.getFullYear());
    if (diffYears < 19) {
        return "15 to 18";
    } else if (diffYears < 26) {
        return "19 to 25";
    } else if (diffYears < 31) {
        return "26 to 30";
    } else if (diffYears < 41) {
        return "30 to 40";
    } else {
        return "40 and above";
    }
}

// Use the Inputs module as needed
export function Importance(data, user_gender, user_age, user_importance) {
    let interval = convertDateToInterval(user_age);

    // Processing the data makes it easier to plot it
    let data_processed = data.map(row => ({
        age: row.age,
        gender: row.gender,
        how_important: row.how_important
    }));

    let data_filtered = data_processed.filter(row => row.age === interval && row.gender === user_gender);
    let mean = data_filtered.reduce((acc, row) => acc + Number(row.how_important), 0) / data_filtered.length;

    let title;
    if (isNaN(mean)) {
        title = ""
    } else if (user_importance < mean) {
        if (user_gender === "Male") {
            title = "Seems like exercise is less important to you then other men your age";
        } else {
            title = "Seems like exercise is less important to you then other women your age";
        }
    } else {
        if (user_gender === "Male") {
            title = "Seems like exercise is more important to you then other men your age";
        } else {
            title = "Seems like exercise is more important to you then other women your age";
        }
    }

    let user_data = [{age: interval, gender: user_gender, how_important: user_importance, title: title}];


    return Plot.plot({
        marginBottom: 40,
        fx: {padding: 0, label: 'Age'},
        x: {axis: null, paddingOuter: 0.2, label: 'age'},
        y: {grid: true, domain: [0, 5], label: "Importance to exercise based on a scale of 1-5"},
        color: {
            domain: ["Female", "Male"],
            range: ["pink", "blue"],
            legend: true
        },
        marks: [
            Plot.barY(data_processed,
                Plot.groupX(
                    {y: "mean"},
                    {
                        x: "gender",
                        fx: "age",
                        y: "how_important",
                        fill: "gender",
                    }
                )
            ),
            Plot.dot(user_data, {
                x: "gender",
                fx: "age",
                y: "how_important",
                fill: "red", // or a standout color
                r: 10,          // size of the dot,
                title: "title",
            }),
            Plot.ruleY([0]),
        ]
    })
}

export function Gender() {
    return Inputs.radio(["Male", "Female"], {
        label: "Choose your Character:",
        value: "Male"
    })
}

export function Age() {
    return (Inputs.date({
        label: "When were you born?",
        min: new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0],
        max: new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split("T")[0],
        value: new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split("T")[0],
    }))
}

export function Importance_Slider() {
    return Inputs.range([0, 5], {label: "How important is workout out for you?", step: .1})
}

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
        color: {legend: true, zero: true},
        marks: [
            Plot.cell(
                data_processed,
                Plot.group(
                    {fill: "median"},
                    {x: d => d.moment, y: d => d.length, fill: d => d.healthy, inset: 0.5}
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