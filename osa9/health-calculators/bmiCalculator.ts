export {};

interface ParseResult {
  height: number
  weight: number
}

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  // Descriptions for different BMIs are taken from the Wikipedia page

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

const parseArguments = (args: Array<string>): ParseResult => {
  if (args.length < 4 || args.length > 4) {
    throw new Error(
      'Please provide exactly two values: the height and the weight.'
    );
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers.');
  }

  return {
    height,
    weight
  };
};

if (require.main == module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {

    let message = 'Unexpected error.';

    if (e instanceof Error) {
      message = `Error: ${e.message}`;
    }

    console.log(message);
  }
}