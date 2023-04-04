const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' && Number.isInteger(param);
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

export {
  isNumber,
  isString,
  isDate,
  parseDate,
};
