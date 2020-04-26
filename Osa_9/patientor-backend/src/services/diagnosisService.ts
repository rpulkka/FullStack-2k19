import { Diagnosis } from '../types';
import diagnosisData from '../data/diagnosis.json';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosisData;
};

export default { getDiagnoses };