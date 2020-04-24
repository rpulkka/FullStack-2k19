
export interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (stats: Array<number>, target: number): Exercise => {
  const average: number = stats.reduce((result, number) => result + number)/stats.length;
  let success: boolean;
  let rating: number;
  let ratingDescription: string;
  if(average >= target) {
    success = true;
    rating = 2;
    ratingDescription = "Well done";
  } else {
    success = false;
    rating = 1;
    ratingDescription = "You are lazy";
  }
  if(average >= target + 1) {
    rating = 3;
    ratingDescription = "Superb";
  }
  return( {
    periodLength: stats.length,
    trainingDays: stats.filter(value => value > 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  });
};

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 1) throw new Error('Not enough numbers');
  if (args.length > 100) throw new Error('Too many arguments');

  const response: Array<number> = args.slice(2).map((argument: string) => {
    if(isNaN(Number(argument))) {
      throw new Error('Provided values were not numbers!');
    }
    return Number(argument);
  });
  return response;
};

// FOR THE LOCAL CONSOLE VERSION
// try {
//   const values: Array<number> = parseArguments(process.argv);
//   console.log(calculateExercises(values, 1));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }