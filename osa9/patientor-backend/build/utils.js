"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (data) => {
    return {
        name: parseName(data.name),
        dateOfBirth: parseDate(data.dateOfBirth),
        ssn: parseSsn(data.ssn),
        gender: parseGender(data.gender),
        occupation: parseOccupation(data.occupation)
    };
};
exports.toNewPatient = toNewPatient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (data) => {
    const baseEntry = {
        description: parseDescription(data.description),
        date: parseDate(data.date),
        specialist: parseSpecialist(data.specialist),
    };
    if (data.diagnosisCodes) {
        baseEntry.diagnosisCodes = parseDiagnosisCodes(data.diagnosisCodes);
    }
    switch (data.type) {
        case "HealthCheck":
            return Object.assign({ type: "HealthCheck", healthCheckRating: parseHealthCheckRating(data.healthCheckRating) }, baseEntry);
        case "Hospital": {
            if (!data.discharge)
                throw new Error('Incorrect or missing discharge: ' + data.discharge);
            const parsedDischarge = {
                date: parseDate(data.discharge),
                criteria: parseCriteria(data.criteria),
            };
            return Object.assign({ type: "Hospital", discharge: parsedDischarge }, baseEntry);
        }
        case "OccupationalHealthcare": {
            const entry = Object.assign({ type: "OccupationalHealthcare", employerName: parseEmployerName(data.employerName) }, baseEntry);
            if (data.sickLeave) {
                entry.sickLeave = {
                    startDate: parseDate(data.startDate),
                    endDate: parseCriteria(data.endDate),
                };
            }
            return entry;
        }
        default:
            throw new Error('Incorrect or missing entry type: ' + data.type);
    }
};
exports.toNewEntry = toNewEntry;
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing criteria: ' + employerName);
    }
    return employerName;
};
const parseCriteria = (criteria) => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria: ' + criteria);
    }
    return criteria;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseDiagnosisCodes = (param) => {
    if (!param || typeof param !== 'object' || !('diagnosisCodes' in param)) {
        return [];
    }
    return param.diagnosisCodes;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing occupation: ${specialist}.`);
    }
    return specialist;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}.`);
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}.`);
    }
    return ssn;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}.`);
    }
    return name;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}.`);
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const isString = (param) => {
    return typeof param === 'string' || param instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
