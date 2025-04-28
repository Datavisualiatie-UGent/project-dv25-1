import * as Plot from "@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";

export function BarrierSelect() {
    return Inputs.radio([
        "I don't have enough time",
        "I can't stay motivated",
        "I'll become too tired",
        "I have an injury",
        "I exercise regularly with no barriers"
    ], {
        label: "What barriers, if any, prevent you from exercising more regularly?",
        value: "I don't have enough time"
    });
}

export function BarrierBuster(data, selectedBarrier) {
    // Process the data to extract barriers and motivations
    const processedData = [];

    data.forEach(row => {
        // Barriers are stored as semicolon-separated values
        const barriers = row.barriers.split(';');
        // Motivations are stored as semicolon-separated values
        const motivations = row.motivation.split(';');

        // If this person has the selected barrier
        if (barriers.includes(selectedBarrier)) {
            // Add each motivation to our dataset, filtering out "I want to be fit"
            motivations.forEach(motivation => {
                const trimmedMotivation = motivation.trim();
                if (trimmedMotivation && trimmedMotivation !== '' && trimmedMotivation !== 'I want to be fit') {
                    processedData.push({
                        barrier: selectedBarrier,
                        motivation: trimmedMotivation
                    });
                }
            });
        }
    });

    // Count the occurrences of each motivation
    const motivationCounts = {};
    processedData.forEach(item => {
        if (!motivationCounts[item.motivation]) {
            motivationCounts[item.motivation] = 0;
        }
        motivationCounts[item.motivation]++;
    });

    // Convert to array for plotting
    const motivationData = Object.entries(motivationCounts).map(([motivation, count]) => ({
        motivation,
        count
    }));

    // Sort by count descending
    motivationData.sort((a, b) => b.count - a.count);

    // Get top motivations (limit to reasonable number for display)
    const topMotivations = motivationData.slice(0, 8);

    // Prepare data for plot
    return Plot.plot({
        marginLeft: 200,
        marginBottom: 40,
        title: `What Motivates People Who Face: "${selectedBarrier}"`,
        x: {
            grid: true,
            label: "Number of People"
        },
        y: {
            label: null,
            domain: topMotivations.map(d => d.motivation)
        },
        marks: [
            Plot.barX(topMotivations, {
                y: "motivation",
                x: "count",
                fill: "steelblue",
                sort: {y: "-x"}
            }),
            Plot.ruleX([0])
        ]
    });
}

export function BarrierInsight(data, selectedBarrier) {
    // Process the data to extract barriers and motivations
    const processedData = [];

    data.forEach(row => {
        const barriers = row.barriers.split(';');
        const motivations = row.motivation.split(';');

        if (barriers.includes(selectedBarrier)) {
            motivations.forEach(motivation => {
                const trimmedMotivation = motivation.trim();
                if (trimmedMotivation && trimmedMotivation !== '' && trimmedMotivation !== 'I want to be fit') {
                    processedData.push({
                        barrier: selectedBarrier,
                        motivation: trimmedMotivation
                    });
                }
            });
        }
    });

    // Count the occurrences of each motivation
    const motivationCounts = {};
    processedData.forEach(item => {
        if (!motivationCounts[item.motivation]) {
            motivationCounts[item.motivation] = 0;
        }
        motivationCounts[item.motivation]++;
    });

    // Convert to array and sort
    const motivationData = Object.entries(motivationCounts).map(([motivation, count]) => ({
        motivation,
        count
    }));

    motivationData.sort((a, b) => b.count - a.count);

    // Get top motivation
    const topMotivation = motivationData.length > 0 ? motivationData[0].motivation : "";

    // Generate insight text based on barrier and top motivation
    let insightText = "";

    if (selectedBarrier === "I don't have enough time") {
        insightText = `People who struggle with time constraints are primarily motivated by "${topMotivation}". Try incorporating short, high-intensity workouts into your day - even 15-minute sessions can make a difference. Consider morning routines before your day gets busy, or break exercise into smaller chunks throughout the day.`;
    }
    else if (selectedBarrier === "I can't stay motivated") {
        insightText = `Those who struggle with motivation find "${topMotivation}" to be their biggest driver. Consider setting specific, achievable goals and tracking your progress. Finding a workout buddy or joining a class can provide accountability and make exercise more enjoyable.`;
    }
    else if (selectedBarrier === "I'll become too tired") {
        insightText = `People concerned about fatigue are most often motivated by "${topMotivation}". Start with shorter, less intense workouts and gradually increase duration and intensity. Remember that regular exercise actually boosts energy levels over time. Proper nutrition and hydration before and after workouts can also help combat fatigue.`;
    }
    else if (selectedBarrier === "I have an injury") {
        insightText = `Those with injuries still find motivation in "${topMotivation}". Consider consulting with a physical therapist for exercises that work around your injury. Low-impact activities like swimming, walking, or certain yoga practices might be gentler alternatives while you heal.`;
    }
    else if (selectedBarrier === "I exercise regularly with no barriers") {
        insightText = `Congratulations on your consistent exercise routine! Like others who exercise regularly, you're motivated by "${topMotivation}". Consider setting new challenges to keep your routine fresh and engaging. You might also inspire others by sharing your journey and what keeps you going.`;
    }

    return insightText;
}