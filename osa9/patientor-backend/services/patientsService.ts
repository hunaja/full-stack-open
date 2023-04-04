import { v1 as uuid } from 'uuid';

import { NewEntry, NewPatient, Patient, PatientWithoutSsn } from '../types';
import patientsData from '../data/patients';

const patients = patientsData;

const getAllPatientsWithoutSsns = (): Array<PatientWithoutSsn> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    entries: [],
    id: uuid(),
  };

  patients.push(newPatient);

  return newPatient;
};

const getPatient = (id: string): Patient | null => {
  return patients.find((({ id: i }) => i == id)) ?? null;
};

const addEntry = (patient: Patient, entry: NewEntry) => {
  const newEntry = {
    ...entry,
    id: uuid(),
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAllPatientsWithoutSsns,
  addPatient,
  getPatient,
  addEntry,
};
