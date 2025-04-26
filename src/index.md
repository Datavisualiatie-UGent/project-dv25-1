# Reps, Sets, and Fun Stats
## See Where You Stand. Get Inspired.
This page brings together workout and lifestyle data from people just like you — visualized to reveal patterns, habits, and healthy trends.
Curious how often others hit the gym? How much they sleep? Where you shine or where there’s room to grow?
These charts are here to give you perspective, spark motivation, and help you set your next big goal. Let’s turn insight into action!

```js
import {Timeline, Gender, Age, Importance, Importance_Slider} from "./components/example.js";
import * as Inputs from "npm:@observablehq/inputs";
```

```js
const lifestyle_data = FileAttachment("./data/lifestyle.csv").csv();
```
## First things first, let us know who you are!

```js
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
const importance_graph = view(Importance(lifestyle_data, gender, age, importance_input))
importance_graph
```