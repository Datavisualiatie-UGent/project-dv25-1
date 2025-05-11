import * as Plot from "@observablehq/plot";

export function Motivations(data, user_gender) {
    const motivation_counts = [];
    const motivation_totals = new Map();

    data.forEach(d => {
        const gender = d.gender;
        const motivations = d.motivation.split(";").map(s => s.trim());
        motivations.forEach(m => {
            motivation_counts.push({ gender, motivation: m });

            // Count total across all genders
            motivation_totals.set(m, (motivation_totals.get(m) || 0) + 1);
        });
    });

    const filtered_counts = motivation_counts.filter(d => motivation_totals.get(d.motivation) >= 10);

    return Plot.plot({
        marginLeft: 250, // for long motivation labels
        x: { label: "Frequency", grid: true },
        y: { label: "Motivation" },
        color: { legend: true, label: "Motivation" },
        marks: [
            Plot.barX(
                filtered_counts,
                Plot.groupY(
                    { x: "count" },
                    {
                        y: "motivation",
                        fx: 'gender',
                        x: "gender",         // gender groups side-by-side within motivation
                        fill: "gender",  // color by motivation
                        inset: 0.5
                    }
                )
            ),
            Plot.barX(
                filtered_counts.filter(d => d.gender === user_gender),
                Plot.groupY(
                    { x: "count" },
                    {
                        y: "motivation",
                        x: "gender",
                        stroke: "black",
                        strokeWidth: 2,
                        fillOpacity: 0,
                        inset: 0.5
                    }
                )
            )
        ]
    });


}