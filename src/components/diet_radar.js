import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

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

function setup_percentage_map(data_15_18, filtered_map, map_15_18, map_15_18_percentage, age_string) {
    data_15_18.forEach(d => {
        const barriers = d.diet_barriers.split(";");
        for (let j = 0; j < barriers.length; j++) {
            if (!filtered_map.has(barriers[j].trim())) {
                continue;
            }
            map_15_18.set(barriers[j].trim(), map_15_18.get(barriers[j].trim()) + 1);
        }
    });

    map_15_18.forEach((value, key) => {
        map_15_18_percentage.set(key, value / filtered_map.get(key));
    });
    map_15_18_percentage.set("name", age_string);
}

export function Diet_radar(data) {
    let map = setup_map_with_all_barriers_as_key(data);

    const filtered_map  = new Map();
    let map_15_18 = new Map();
    let map_19_25 = new Map();
    let map_26_30 = new Map();
    let map_30_40 = new Map();
    let map_40 = new Map();

    map.forEach((value, key) => {
        if (value > 1 && key !== "I have a balanced diet") {
            filtered_map.set(key, value);
            map_15_18.set(key, 0);
            map_19_25.set(key, 0);
            map_26_30.set(key, 0);
            map_30_40.set(key, 0);
            map_40.set(key, 0);
        }
    })


    let data_15_18 = data.filter(d => d.age === "15 to 18");
    let data_19_25 = data.filter(d => d.age === "19 to 25");
    let data_26_30 = data.filter(d => d.age === "26 to 30");
    let data_30_40 = data.filter(d => d.age === "30 to 40");
    let data_40 = data.filter(d => d.age === "40 and above");

    let map_15_18_percentage = new Map();
    let map_19_25_percentage = new Map();
    let map_26_30_percentage = new Map();
    let map_30_40_percentage = new Map();
    let map_40_percentage = new Map();

    setup_percentage_map(data_15_18, filtered_map, map_15_18, map_15_18_percentage, "15 to 18");
    setup_percentage_map(data_19_25, filtered_map, map_19_25, map_19_25_percentage, "19 to 25");
    setup_percentage_map(data_26_30, filtered_map, map_26_30, map_26_30_percentage, "26 to 30");
    setup_percentage_map(data_30_40, filtered_map, map_30_40, map_30_40_percentage, "30 to 40");
    setup_percentage_map(data_40, filtered_map, map_40, map_40_percentage, "40 and above");

    const obj_15_18 = Object.fromEntries(map_15_18_percentage);
    const obj_19_25 = Object.fromEntries(map_19_25_percentage);
    const obj_26_30 = Object.fromEntries(map_26_30_percentage);
    const obj_30_40 = Object.fromEntries(map_30_40_percentage);
    const obj_40 = Object.fromEntries(map_40_percentage);

    const all_barriers = Array.from(filtered_map.keys());
    const age_groups = ["15 to 18", "19 to 25", "26 to 30", "30 to 40", "40 and above"];

    console.log()

    // All age group maps
    const age_maps = {
        "15 to 18": obj_15_18,
        "19 to 25": obj_19_25,
        "26 to 30": obj_26_30,
        "30 to 40": obj_30_40,
        "40 and above": obj_40
    };

    // Final reversed structure
    const phones = all_barriers.map(barrier => {
        const entry = { name: barrier };
        for (const age of age_groups) {
            entry[age] = age_maps[age][barrier] ?? 0;
        }
        return entry;
    });


    // let phones = [
    //     obj_15_18, obj_19_25, obj_26_30, obj_30_40, obj_40
    // ];

    console.log(phones);

    let points = phones.flatMap(({ name, ...values }) =>
        Object.entries(values).map(([key, value]) => ({ name, key, value }))
    )

    let longitude = d3.scalePoint(new Set(Plot.valueof(points, "key")), [180, -180]).padding(0.5).align(1)

    return Plot.plot({
        width: 600,
        margin: 20,
        projection: {
            type: "azimuthal-equidistant",
            rotate: [0, -90],
            // Note: 0.625° corresponds to max. length (here, 0.5), plus enough room for the labels
            domain: d3.geoCircle().center([0, 90]).radius(0.625)()
        },
        color: { legend: true },
        marks: [
            // grey discs
            Plot.geo([0.6, 0.5, 0.4, 0.3, 0.2, 0.1], {
                geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
                stroke: "black",
                fill: "black",
                strokeOpacity: 0.3,
                fillOpacity: 0.03,
                strokeWidth: 0.5
            }),

            // white axes
            Plot.link(longitude.domain(), {
                x1: longitude,
                y1: 90 - 0.6,
                x2: 0,
                y2: 90,
                strokeOpacity: 0.5,
                strokeWidth: 2.5
            }),

            // tick labels
            Plot.text([0.3, 0.4, 0.5, 0.6], {
                x: 180,
                y: (d) => 90 - d,
                dx: 2,
                textAnchor: "start",
                text: (d) => `${100 * d}%`,
                fill: "currentColor",
                fontSize: 8
            }),

            // axes labels
            Plot.text(longitude.domain(), {
                x: longitude,
                y: 90 - 0.65,
                text: Plot.identity,
                lineWidth: 5
            }),

            // areas
            Plot.area(points, {
                x1: ({ key }) => longitude(key),
                y1: ({ value }) => 90 - value,
                x2: 0,
                y2: 90,
                fill: "name",
                stroke: "name",
                curve: "cardinal-closed"
            }),

            // points
            Plot.dot(points, {
                x: ({ key }) => longitude(key),
                y: ({ value }) => 90 - value,
                fill: "name",
                stroke: "white"
            }),

            // interactive labels
            Plot.text(
                points,
                Plot.pointer({
                    x: ({ key }) => longitude(key),
                    y: ({ value }) => 90 - value,
                    text: (d) => `${(100 * d.value).toFixed(0)}%`,
                    textAnchor: "start",
                    dx: 4,
                    fill: "currentColor",
                    maxRadius: 10
                })
            ),
        ]
    })
}