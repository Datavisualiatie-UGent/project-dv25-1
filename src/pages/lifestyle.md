```js
import {Gender, Age} from "../components/gender_age_input.js";
import {Importance, Importance_Slider} from "../components/importance.js";
import {BarrierSelect, BarrierBuster, BarrierInsight} from "../components/barrier_buster.js";
import {Moment, Length, Healthy, Healthy_Slider, WorkoutMoment} from "../components/health.js";
import {Diet_radar} from "../components/diet_radar.js";
import {diet_barriers_chart} from "../components/diet_barriers_chart.js";
import {md} from "@observablehq/stdlib";
import * as Inputs from "npm:@observablehq/inputs";
```

```js
const lifestyle_data = FileAttachment("../data/lifestyle.csv").csv();
```
## First things first, let us know who you are!

```js
// Create the input like, this. First create a viewable object with view() and then use the viewable object to create the input.
// This way the other cells react when the value of the input changes.
const gender = view(Gender())
const age = view(Age())
gender
age
```

## How important is exercise?

In this chart, you'll find the average importance people place on exercise, divided by age groups and gender.
Participants rated how vital working out is to their lives on a scale from 0 (not important) to 5 (extremely important).
Each age group — from teens to those 40 and above — shows distinct trends and priorities between males and females.
Now it's your turn: use the slider to share how important exercise is to you personally.
As you move the slider, a dot will appear on the chart, showing exactly where you stand compared to the average in your demographic.
Take a moment to explore — are you more motivated than most? Or is there inspiration waiting for you?

```js
const importance_input = view(Importance_Slider(gender))
importance_input
```


```js
// Like the input, create a viewable object first and then use it to create the chart. That way it reacts to changes from the input
const importance_graph = view(Importance(lifestyle_data, gender, age, importance_input))
importance_graph
```

## How much and often do you need to exercise to be healthy?

**How healthy do you feel compared to others?**  
This graph shows how healthy people consider themselves based on how often and how long they work out.  
You can select your own workout time, duration, and how healthy you feel using the options below.  
Your personal input will be shown as a dot on the heatmap, so you can easily see how you compare to others!


```js
const moment = view(Moment())
const length = view(Length())
const healthy_slider = view(Healthy_Slider())
moment
length
healthy_slider
```

```js
const healthy_graph = view(Healthy(lifestyle_data, moment, length, healthy_slider))
healthy_graph
```

## Fun fact
Nobody works out in the afternoon

```js
const workout_moment = view(WorkoutMoment(lifestyle_data))
workout_moment
```

## Barrier Buster: Find Your Motivation

Everyone faces challenges on their fitness journey. What's holding you back from exercising more regularly?
Select the barrier that resonates most with you, and discover what motivates others who face the same challenge.
This visualization reveals the common motivations that drive people past similar obstacles - helping you find the spark that might work for you too.

```js
const barrier = view(BarrierSelect())
barrier
```

```js
const barrier_graph = view(BarrierBuster(lifestyle_data, barrier))
barrier_graph
```

```js
// const insight = view(BarrierInsight(lifestyle_data, barrier))
```

## Food: your worst enemy

```js
const diet_radar = view(Diet_radar(lifestyle_data))
lifestyle_data
```

```html
<style>
          g[aria-label=area] path {fill-opacity: 0.1; transition: fill-opacity .2s;}
          g[aria-label=area]:hover path:not(:hover) {fill-opacity: 0.05; transition: fill-opacity .2s;}
          g[aria-label=area] path:hover {fill-opacity: 0.3; transition: fill-opacity .2s;}
</style>
```

## Food: your worster enemy

```js
const diet_chart = view(diet_barriers_chart(lifestyle_data))
diet_chart
```