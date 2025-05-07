import * as Inputs from "npm:@observablehq/inputs";

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