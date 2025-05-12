```js
import {Gender, Age} from "../components/gender_age_input.js";
import {Importance, Importance_Slider} from "../components/importance.js";
import {Accompaniment, Accompaniment_length_health} from "../components/accompaniment.js";
import {BarrierSelect, BarrierBuster, BarrierInsight} from "../components/barrier_buster.js";
import {Moment, Length, Healthy, Healthy_Slider, WorkoutMoment} from "../components/health.js";
import {Diet_radar} from "../components/diet_radar.js";
import {diet_barriers_chart} from "../components/diet_barriers_chart.js";
import {Motivations} from "../components/motivations_per_gender.js";
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

In this chart, you'll find the average importance people place on exercise, divided by gender.
Participants rated how vital working out is to their lives on a scale from 0 (not important) to 5 (extremely important).
Now it's your turn: use the slider to share how important exercise is to you personally.
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
const length = view(Length(["I don't really exercise", "30 minutes", "1 hour", "2 hours", "3 hours and above"]))
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

## A company a day keeps the laziness away

**With whom do you exercise?**

Are you a social bird when it comes to exercise, or do you prefer to go at it alone?
This graph shows how much this could influence your exercise time per day.
You can select the values that correspond to you, and we will show you your standings compared to other people.

```js
const length_social = view(Length(["30 minutes", "1 hour", "2 hours", "3 hours and above"]))
length_social
const accompaniment = view(Accompaniment())
accompaniment
```

```js
const accompaniment_graph = view(Accompaniment_length_health(lifestyle_data, accompaniment, length_social))
accompaniment_graph
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

## Dieting and its barriers

Dieting is never easy, and each age groups has different challenges.
The five pie charts highlight the most common dieting struggles faced by people at the different stages of life.
Each chart represents a distinct age group, capturing how challenges evolve with age.

```js
const diet_chart_15_18 = view(diet_barriers_chart(lifestyle_data, "15 to 18", age))
diet_chart_15_18

const diet_chart_19_25 = view(diet_barriers_chart(lifestyle_data, "19 to 25", age))
diet_chart_19_25

const diet_chart_26_30 = view(diet_barriers_chart(lifestyle_data, "26 to 30", age))
diet_chart_26_30

const diet_chart_30_40 = view(diet_barriers_chart(lifestyle_data, "30 to 40", age))
diet_chart_30_40

const diet_chart_40 = view(diet_barriers_chart(lifestyle_data, "40 and above", age))
diet_chart_40
```

## What motivates you?

Everyone has different motivations for working out. Can the genders agree on what motivates them?

```js
const motivation = view(Motivations(lifestyle_data, gender))
motivation
```