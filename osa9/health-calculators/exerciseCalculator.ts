export {};

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ParseResult {
  exercises: Array<number>,
  target: number
}

export const calculateExercises = (
  exercises: Array<number>, 
  target: number
): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((hs) => hs > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / exercises.length;
  let success = false;
  let rating = 3;

  const quotient = average / target;

  if (quotient < 0.5) {
    rating = 1;
  } else if (quotient < 1) {
    rating = 2;
  } else {
    success = true;
  }

  const ratingDescription = [
    'bad',
    'not too bad but could be better',
    'great'
  ][rating - 1];
  
  return {
    periodLength,
    trainingDays,
    success,
    target,
    average,
    rating,
    ratingDescription
  };
};

const parseArguments = (args: Array<string>): ParseResult => {
  if (args.length < 4) {
    throw new Error(
      'Please provide the target value and data of at least one exercise day.'
    );
  }

  const target = Number(args[2]);

  if (isNaN(target)) {
    throw new Error('Provided target value was not a number.');
  }

  const exercises: Array<number> = [];

  for (let i = 3; i < args.length; ++i) {
    const hours = Number(args[i]);

    if (isNaN(hours)) {
      throw new Error('Provided exercise hours were not numbers.');
    }

    exercises.push(hours);
  }

  return {
    exercises,
    target,
  };
};

if (require.main == module) {
  try {
    const { exercises, target } = parseArguments(process.argv);
    console.log(calculateExercises(exercises, target));
  } catch (e) {
    let message = 'Unexpected error.';

    if (e instanceof Error) {
      message = `Error: ${e.message}`;
    }

    console.log(message);
  }
}
