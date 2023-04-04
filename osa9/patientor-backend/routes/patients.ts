import { Router } from 'express';

import patientsService from '../services/patientsService';
import toNewPatient from '../parsers/toNewPatient';
import toNewEntry from '../parsers/toNewEntry';

const router = Router();

router.get('/', (_req, res) => {
  return res.json(patientsService.getAllPatientsWithoutSsns());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (!patient) return res.status(404);

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(patient, newEntry);
    return res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
