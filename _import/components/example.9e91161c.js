import * as Plot from "../../_node/@observablehq/plot@0.6.17/index.28168f6d.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.6ba3de0b.js";

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
export function Importance(data, genderInput, ageInput) {
    let interval = convertDateToInterval(ageInput.value);
    // console.log(data.length);
    // data = data.filter(row => row.gender === gender && row.age === interval);
    // console.log(data.length);
    let data_processed = data.map(row => ({
        age: row.age,
        gender: row.gender,
        how_important: row.how_important
    }));

    let user_data = [{age: interval, gender: genderInput.value, how_important: 3, title: "You are here"}];

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

export function setGender() {
    return Inputs.radio(["Male", "Female"], {
        label: "Choose your Character:",
        value: "Male"
    })
}

export function setAge() {
    return Inputs.date({
        label: "When were you born?",
        min: new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0],
        max: new Date().toISOString().split("T")[0],
        value: new Date().toISOString().split("T")[0]
    })
}

// export function