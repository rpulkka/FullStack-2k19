import { PublicPatient, NewPatient, Gender } from '../types';
import patientData from '../data/patients.json';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<PublicPatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation
  }));
};

const addPatient = (paramPatient: NewPatient): PublicPatient => {
  const newPatient = {
    id: uuidv4(),
    name: paramPatient.name,
    dateOfBirth: paramPatient.dateOfBirth as string,
    ssn: paramPatient.ssn as string,
    gender: paramPatient.gender,
    occupation: paramPatient.occupation
  };
  patientData.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };