# Reps, Sets, and Fun Stats
## See Where You Stand. Get Inspired.
This page brings together workout and lifestyle data from people just like you — visualized to reveal patterns, habits, and healthy trends.
Curious how often others hit the gym? How much they sleep? Where you shine or where there’s room to grow?
These charts are here to give you perspective, spark motivation, and help you set your next big goal. Let’s turn insight into action!

```js
import {Timeline, setGender, setAge, Importance} from "./components/example.js";
import * as Inputs from "npm:@observablehq/inputs";

```

```js
const lifestyle_data = FileAttachment("./data/lifestyle.csv").csv();
```
## First things first, let us know who you are!

```js
const gender = setGender()
const age = setAge()
view(gender)
view(age)
```

## How important is exercise?

Surveyists where asked to rate the importance of exercise on a scale of 1-5. The mean value is presented below.

```js
view((Importance(lifestyle_data, gender, age)))
```