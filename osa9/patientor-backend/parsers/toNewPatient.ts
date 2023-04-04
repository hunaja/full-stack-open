import { Gender, NewPatient } from "../types";
import { isString, parseDate } from "./common";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (data: any): NewPatient => {
  return {
    name: parseName(data.name),
    dateOfBirth: parseDate(data.dateOfBirth),
    ssn: parseSsn(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseOccupation(data.occupation)
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}.`);
  }

  return name;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}.`);
  }

  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}.`);
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}.`);
  }

  return occupation;
};

export default toNewPatient;
