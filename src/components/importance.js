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

function extract_importance_absolute_frequency(data_processed) {
    let total_count_female = 0;
    let total_count_male = 0;

    const array_male = new Array(5).fill(0); // Male
    const array_female = new Array(5).fill(0); // Female


    for (let i = 1; i <= 5; i++) {
        let count_male = 0;
        let count_female = 0;

        data_processed.forEach(row => {
            if (row.how_important === String(i) && row.gender === "Female") {
                count_female++;
            }
            if (row.how_important === String(i) && row.gender === "Male") {
                count_male++;
            }
        })

        array_female[i - 1] = count_female;
        array_male[i - 1] = count_male;

        total_count_female += count_female;
        total_count_male += count_male;
    }

    return [array_female.map((x) => x / total_count_female * 100), array_male.map((x) => x / total_count_male * 100)];
}

// Use the Inputs module as needed
export function Importance(data, user_gender, user_age, user_importance) {
    let interval = convertDateToInterval(user_age);
    let user_data = [{age: interval, gender: user_gender, how_important: user_importance}];

    // Processing the data makes it easier to plot it
    let data_processed = data.map(row => ({
        gender: row.gender,
        how_important: row.how_important
    }));

    // Calculate importance for female
    let [array_female, array_male] = extract_importance_absolute_frequency(data_processed);

    return Plot.plot({
        marginBottom: 100,
        fx: {padding: 0, label: null, tickRotate: 90, tickSize: 6},
        x: {axis: null, paddingOuter: 0.2, type: "band"},
        y: {grid: true},
        color: {legend: true, type: "ordinal", scheme: "viridis"},
        marks: [
            Plot.barY(
                data_processed,
                Plot.groupX(
                    {y2: "count"},
                    {x: "how_important", fx: "gender", fill: "how_important"}
                )
            ),
        ]
    });

    let data_filtered = data_processed.filter(row.gender === user_gender);
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



    return Plot.plot({
        marginBottom: 40,
        fx: {padding: 0, label: 'Age'},
        x: {axis: null, paddingOuter: 0.2, label: 'age'},
        y: {grid: true, domain: [0, 5], label: "Importance to exercise based on a scale of 1-5"},
        color: {
            domain: ["Female", "Male"],
            range: ["#fcc2d7", "#5c7cfa"],
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
                        inset: 1,
                    },
                )
            ),
        ]
    })

    // Plot.dot(user_data, {
    //     x: "gender",
    //     fx: "age",
    //     y: "how_important",
    //     fill: "red", // or a standout color
    //     r: 10,          // size of the dot,
    //     title: "title",
    // }),
    //     Plot.ruleY([0]),
}

export function Importance_Slider() {
    return Inputs.range([0, 5], {label: "How important is workout out for you?", step: 1})
}