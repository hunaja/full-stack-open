import { BaseEntry, Diagnosis, HealthCheckRating, NewEntry, OccupationalHealthcareEntry } from '../types';
import { isNumber, isString, parseDate } from './common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (data: any): NewEntry => {
  const baseEntry = {
    description: parseDescription(data.description),
    date: parseDate(data.date),
    specialist: parseSpecialist(data.specialist),
    diagnosisCodes: parseDiagnosisCodes(data),
  } as BaseEntry;

  switch (data.type) {
  case "HealthCheck":
    return {
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(data.healthCheckRating),
      ...baseEntry,
    };
  case "Hospital": {
    if (!data.discharge) throw new Error('Incorrect or missing discharge: ' + data.discharge);
    
    const parsedDischarge = {
      date: parseDate(data.discharge.date),
      criteria: parseCriteria(data.discharge.criteria),
    };

    return {
      type: "Hospital",
      discharge: parsedDischarge,
      ...baseEntry,
    };
  }
  case "OccupationalHealthcare": {
    const entry = {
      type: "OccupationalHealthcare",
      employerName: parseEmployerName(data.employerName),
      ...baseEntry,
    } as OccupationalHealthcareEntry;

    if (data.sickLeave) {
      entry.sickLeave = {
        startDate: parseDate(data.sickLeave.startDate),
        endDate: parseDate(data.sickLeave.endDate),
      };
    }

    return entry;
  }
  default:
    throw new Error('Incorrect or missing entry type: ' + data.type);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
      throw new Error('Incorrect or missing employer name: ' + employerName);
  }
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (param: unknown): Array<Diagnosis['code']> =>  {
  if (!param || typeof param !== 'object' || !('diagnosisCodes' in param)) {
    return [] as Array<Diagnosis['code']>;
  }

  return param.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}.`);
  }

  return specialist;
};

export default toNewEntry;
