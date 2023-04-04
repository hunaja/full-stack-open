import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({  
      error: 'malformatted parameters'
    });

    return;
  }

  res.json({
    bmi: calculateBmi(height, weight),
    weight,
    height
  });
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const body: Record<string, any> = req.body;

  if (!("daily_exercises" in body) || !("target" in body)) {
    res.status(400).json({
      error: 'parameters missing'
    });

    return;
  }

  const target = Number(body.target);

  if (isNaN(target)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });

    return;
  }

  if (!Array.isArray(body['daily_exercises'])) {
    res.status(400).json({
      error: 'malformatted parameters'
    });

    return;
  }

  const exercises: Array<number> = [];

  for (const hoursStr of body['daily_exercises']) {
    const hours = Number(hoursStr);

    if (isNaN(hours)) {
      res.status(400).json({
        error: 'malformatted parameters'
      });

      return;
    }

    exercises.push(hours);
  }

  res.json(calculateExercises(exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => console.log(`server running on :${PORT}`));
