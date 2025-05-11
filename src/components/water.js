import * as Plot from "@observablehq/plot";
import * as d3 from "d3";


export function Water(data) {
    // Ensure numeric fields are treated as numbers
    const processedData2 = data.map(d => {
        // Convert fat percentage to a number
        const fatPercentage = Number(d["Fat_Percentage"]);
        if (fatPercentage < 10) {
            return {
                water: Number(d["Water_Intake (liters)"]),
                type: "0<10 (%)"
            };
        } else if (fatPercentage < 15) {
            return {
                water: Number(d["Water_Intake (liters)"]),
                type: "10<15 (%)"
            };
        } else if (fatPercentage < 20) {
            return {
                water: Number(d["Water_Intake (liters)"]),
                type: "15<20 (%)"
            };
        } else if (fatPercentage < 25) {
            return {
                water: Number(d["Water_Intake (liters)"]),
                type: "20<25 (%)"
            };
        } else if (fatPercentage < 30) {
            return {
                water: Number(d["Water_Intake (liters)"]),
                type: "25<30 (%)"
            };
        } else {
            return {
                water: Number(d["Water_Intake (liters)"]),
                type: "30<35 (%)"
            };
        }
    });

    const meanWaterByType = d3.rollups(
        processedData2,
        v => d3.median(v, d => d.water),
        d => d.type
    );


    return Plot.plot({
        marks: [
            Plot.barY(meanWaterByType.map(([type, water]) => ({ type, water })), {
                x: "type",
                y: "water",
                fill: "type"
            })
        ],
        x: {
            label: "Fat percentage",
            grid: true
        },
        y: {
            label: "Water drunk (L) (per day)",
            grid: true
        },
        color: {
            legend: true,
            title: "Workout Type"
        },
        style: {
            padding: "20px"
        },
        height: 500 // You can adjust height as needed
    });
}