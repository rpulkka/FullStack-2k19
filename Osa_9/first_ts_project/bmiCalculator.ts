
interface ParamValues {
  value1: number;
  value2: number;
}

export const calculateBmi = (height: number, weight: number): string  => {
  const bmi: number = weight / ((height/100) * (height/100)) ;
  if(bmi <= 15) {
    return "Very Severely Underweight";
  } else if(15 < bmi && bmi <= 16) {
    return "Severely Underweight";
  } else if(16 < bmi && bmi <= 18.5) {
    return "Underweight";
  } else if(18.5 < bmi && bmi <= 25) {
    return "Healthy / Normal";
  } else if(25 < bmi && bmi <= 30) {
    return "Overweight";
  } else if(30 < bmi && bmi <= 35) {
    return "Moderately Obese";
  } else if(35 < bmi && bmi <= 40) {
    return "Severely Obese";
  } else if(40 < bmi) {
    return "Very Severely Obese";
  } else {
    return "Not a valid BMI, check the input.";
  }
};

const parseArguments = (args: Array<string>): ParamValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

// FOR THE LOCAL CONSOLE VERSION
// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(calculateBmi(value1, value2));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }