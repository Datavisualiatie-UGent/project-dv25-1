# Reps, Sets, and Fun Stats
## See Where You Stand. Get Inspired.
This page brings together workout and lifestyle data from people just like you — visualized to reveal patterns, habits, and healthy trends.
Curious how often others hit the gym? How much they sleep? Where you shine or where there’s room to grow?
These charts are here to give you perspective, spark motivation, and help you set your next big goal. Let’s turn insight into action!

```js
import {Timeline, Gender, Age, Importance, Importance_Slider, Healthy, Moment, Length, Healthy_Slider} from "./components/example.js";
import * as Inputs from "npm:@observablehq/inputs";
```

```js
const lifestyle_data = FileAttachment("./data/lifestyle.csv").csv();
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