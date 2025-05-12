# Gym habits

```js
import {md} from "@observablehq/stdlib";
import { Generators } from "@observablehq/runtime"
import * as Inputs from "npm:@observablehq/inputs";
import {createHeartRateBoxPlots} from "../components/heart_rate_boxplot.js";
import {BurnScatterPlot, WorkoutTypeInput} from "../components/burn_scatter_plot.js";
import {FrequencyBmi, Legend, HeightCategory, weightCategory, frequencyCategory} from "../components/frequency_bmi.js";
import { WorkoutSkew, WaterDensityPlot } from "../components/water-density.js";
import {Water} from "../components/water.js";
```

```js
const gym_data = FileAttachment("../data/gym_data.csv").csv();
```

## Understanding Your Heart 🫀: The Foundation of Effective Workouts

Before diving into specific workout strategies, let's look at some fundamental indicators of cardiovascular response to exercise: heart rates. 
This boxplot visualization displays the distribution of Resting, Average (during exercise), and Maximum heart rates across our dataset.

```js
const heart_rate_box_plots = view(createHeartRateBoxPlots(gym_data));
heart_rate_box_plots
```

## Maximizing Your Burn 🔥: Which Workouts Deliver and For How Long?

A common goal for many is maximizing calorie expenditure. But how do different workout types stack up, and how does duration play a role?

```js
const workout_type_input = view(WorkoutTypeInput(["Cardio", "Strength", "HIIT", "Yoga"]));
workout_type_input
```

```js
const burn_scatter_plot = view(BurnScatterPlot(gym_data, workout_type_input));
burn_scatter_plot
```

Here's some encouraging news: the duration of your workout is a powerful lever for increasing calorie burn! 
Since this relationship holds true across different exercise types, you don't have to push through a workout you simply think burns more; 
instead, choose an activity you genuinely enjoy, as dedicating more time to it will effectively boost your calorie expenditure and help you stay consistent.

## Hydration To The Max 💧: How much water intake is needed, depending on workout?

Water is important, no matter what exercise you perform. But what are the differences in water intake per workout. Let's see!

```js
const workout_skew = view(WorkoutSkew())
workout_skew
```

```js
const water_density = view(WaterDensityPlot(gym_data, workout_skew))
water_density
```

Hydration is crucial for optimal performance and recovery. As well as for your overall health.

```js
const water = view(Water(gym_data));
water
```

## Does the frequency in which we workout matter when considering our BMI?

The relationship between workout frequency and BMI is complex. Don't forget that BMI doesn't show everything about your health.
It doesn't account for muscle mass, fat distribution, or other health markers.

```js
const height_category = view(HeightCategory());
const weight_category = view(weightCategory());
const frequency_category = view(frequencyCategory());
height_category
weight_category
frequency_category
```

```js
const legend = view(Legend());
const frequency_bmi_heatmap = view(FrequencyBmi(gym_data, height_category, weight_category, frequency_category));
frequency_bmi_heatmap
```