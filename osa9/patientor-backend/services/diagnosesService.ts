import { Diagnosis } from '../types';
import diagnosesData from '../data/diagnoses.json';

const diagnoses = diagnosesData as Array<Diagnosis>;

const getAll = () => diagnoses;

export default {
  getAll
};
