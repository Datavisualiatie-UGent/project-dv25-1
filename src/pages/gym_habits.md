# Gym habits

```js
import { createHeartRateBoxPlots } from "../components/heart_rate_boxplot.js";
```

```js
const gym_data = FileAttachment("../data/gym_data.csv").csv();
```

```js
const heart_rate_box_plots = view(createHeartRateBoxPlots(gym_data));
heart_rate_box_plots
```