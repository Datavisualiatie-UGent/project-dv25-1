import * as d3 from "d3";

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

function setup_map_with_all_barriers_as_key(data) {
    // Pre-process the data
    let map = new Map();
    let options = new Set();
    data.forEach(d => {
        const barriers = d.diet_barriers.split(";");
        for (let j = 0; j < barriers.length; j++) {
            options.add(barriers[j].trim());
        }
    })
    options.forEach(option => {
        map.set(option, 0);
    });

    data.forEach(d => {
        const barriers = d.diet_barriers.split(";");
        for (let j = 0; j < barriers.length; j++) {
            map.set(barriers[j].trim(), map.get(barriers[j].trim()) + 1);
        }
    })
    return map;
}

export function diet_barriers_chart(data, age, user_age) {

    let general_map = setup_map_with_all_barriers_as_key(data);
    let options = Array.from(general_map.keys());
    const user_age_group = convertDateToInterval(user_age);

    let data_15_18 = data.filter(d => d.age === age);

    let map = setup_map_with_all_barriers_as_key(data_15_18);
    let filtered_map = new Map();
    map.forEach((value, key, map) => {
        if (value > 10 && key !== "I have a balanced diet") {
            filtered_map.set(key, value);
        }
    });

    data = Array.from(filtered_map, ([name, value]) => ({ name, value }))

    // Specify the chart’s dimensions.
    const width = 400;
    const height = Math.min(width, 500);

    const radius = Math.min(width, height) / 2;
    const colorScale = d3.scaleOrdinal()
        .domain(options.map(d => d.name))  // assuming your string value is `name`
        .range(d3.schemeTableau10);     // or your preferred color palette

    const colorMap = new Map(options.map(option => [option, colorScale(option)]));

    data.forEach(d => {
        d.color = colorMap.get(d.name);  // save the color to the object
    });

    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 10);

    const labelArc = d3.arc()
        .innerRadius(radius * 0.45) // ⬅️ closer to center
        .outerRadius(radius * 0.45);

    const arcs = pie(data);

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;"); // ⬅️ smaller text

    if (user_age_group === age) {
        const highlightArc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius); // Slightly bigger than main pie

        svg.append("g")
            .lower() // ⬅️ Send to back layer
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => d3.color(d.data.color).brighter(10).copy({opacity: 0.9}))
            .attr("d", highlightArc);
    }


    // Drop shadow
    const defs = svg.append("defs");
    defs.append("filter")
        .attr("id", "drop-shadow")
        .append("feDropShadow")
        .attr("dx", 0)
        .attr("dy", 1)
        .attr("stdDeviation", 2)
        .attr("flood-color", "#000")
        .attr("flood-opacity", 0.2);

    // Pie segments
    svg.append("g")
        // .attr('transform', `translate(50, 50)`)
        .attr("filter", "url(#drop-shadow)")
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", d => d.data.color)
        .attr("d", arc)
        .on("mouseover", function () { d3.select(this).attr("opacity", 0.8); })
        .on("mouseout", function () { d3.select(this).attr("opacity", 1); })
        .append("title")
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

    // Labels
    svg.append("g")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-0.35em")
            .text(d => d.data.name))
        .call(text => text.append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => `${d.data.value}`));

    // Title
    svg.append("text")
        .attr("x", 0)
        .attr("y", -150) // move up above chart
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(`What barriers to people in the age`);

    // Title
    svg.append("text")
        .attr("x", 0)
        .attr("y", -135) // move up above chart
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(`group ${age} face when dieting?`);

    return svg.node();
}