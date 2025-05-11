import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";


const workouts = ["Cardio", "HIIT", "Strength", "Yoga"]

export function Skew() {
    return Inputs.range([0, 3], {label: "Workout Skew", step: 0.01})
}

export function WaterDensityPlot(data, skew) {
    const processedData = data.map(d => ({
        Workout_Type: d["Workout_Type"],
        Experience_Level: Number(d["Experience_Level"]),
        Water_Intake: Number(d["Water_Intake (liters)"]),
        skew: skew,
    }));

    console.log(skew);


    // return Plot.density(data, {x: "Experience_Level", y: "Water_Intake", stroke: "Workout_Type"}).plot()

    return Plot.plot({
        inset: 10,
        color: {legend: true},
        marks: [
          Plot.density(processedData, {
            weight: (d) => {
                const index = workouts.indexOf(d.Workout_Type);
                console.log(d.Workout_Type);
                console.log(index);
                const difference = index - d.skew;
                console.log(difference);
                const diff = Math.abs(workouts.indexOf(d.Workout_Type) - d.skew);
                console.log(diff);
                return Math.max(0.01, 1 - diff);
              },
            x: "Experience_Level",
            y: "Water_Intake",
            strokeOpacity: 0.5,
            clip: true
          }),
          Plot.dot(processedData, {
            x: "Experience_Level",
            y: "Water_Intake",
            stroke: "Workout_Type",
            strokeOpacity: (d) => Math.max(0, 1 - Math.abs(workouts.indexOf(d.Workout_Type) - d.skew))
          }),
          Plot.frame()
        ]
      });
}