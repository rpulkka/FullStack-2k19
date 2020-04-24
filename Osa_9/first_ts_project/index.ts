import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});

app.get('/calculateBmi', (req, res) => {
  const value1 = req.query.height;
  const value2 = req.query.weight;
  if (value1 && value2) {
    if (!isNaN(Number(value1)) && !isNaN(Number(value2))) {
      const result = calculateBmi(Number(value1), Number(value2));
      const resultJson = {
        height: value1,
        weight: value2,
        bmi: result
      };
      res.json(resultJson);
    }
  }
  res.status(404).send("Parameters are not strings or they're missing.");
});

app.post('/calculateExercises', (req, res) => {
  console.log(req.body);
  if(!req.body.daily_exercises || !req.body.target || req.body.daily_exercises === undefined || req.body.target === undefined) {
    return res.status(400).send("Parameters missing");
  }
  if(isNaN(Number(req.body.target))) {
    return res.status(400).send("Malformed parameters");
  }
  const exerciseData: Array<number> = req.body.daily_exercises.map((exercise: string) => {
    if(isNaN(Number(exercise))) {
      return res.status(404).send("Malformed parameters");
    }
    return Number(exercise);
  });
  const result = calculateExercises(exerciseData, req.body.target);
  console.log(result);
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});