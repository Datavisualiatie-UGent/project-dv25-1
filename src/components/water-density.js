import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";


const workouts = ["Cardio", "HIIT", "Strength", "Yoga"]
  
export function WorkoutSkew() {
    return Inputs.range([0, 3], {label: "Workout Skew", step: 0.01})
}

export function WaterDensityPlot(data, skew) {
    const processedData = data.map(d => ({
        Workout_Type: d["Workout_Type"],
        Session_Duration_Hours: Number(d["Session_Duration (hours)"]),
        Water_Intake: Number(d["Water_Intake (liters)"]),
    }));

    return Plot.plot({
        inset: 10,
        color: {legend: true, domain: workouts},
        marks: [
          Plot.density(processedData, {
            weight: (d) => {
                return Math.max(0, 1 - Math.abs(workouts.indexOf(d.Workout_Type) - skew));
              },
            x: "Session_Duration_Hours",
            y: "Water_Intake",
            strokeOpacity: 0.5,
            clip: true
          }),
          Plot.dot(processedData, {
            x: "Session_Duration_Hours",
            y: "Water_Intake",
            stroke: "Workout_Type",
            strokeOpacity: (d) => Math.max(0, 1 - Math.abs(workouts.indexOf(d.Workout_Type) - skew))
          }),
          Plot.frame()
        ],
        x: {
          label: "Session duration (hours)",
          grid: true
        },
        y: {
          label: "Water intake (liters)",
          grid: true
        }
      });
}