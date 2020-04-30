import { Patient, PublicPatient, NewPatient, Entry } from '../types';
import patientData from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<PublicPatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender,
    occupation
  }));
};

const addPatient = (paramPatient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    name: paramPatient.name,
    dateOfBirth: paramPatient.dateOfBirth as string,
    ssn: paramPatient.ssn as string,
    gender: paramPatient.gender,
    occupation: paramPatient.occupation,
    entries: []
  };
  patientData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const foundPatient = patientData.find(patient => patient.id === id);
  if(foundPatient === undefined) { return undefined; } 
  return({
    id: foundPatient.id,
    name: foundPatient.name,
    dateOfBirth: foundPatient.dateOfBirth,
    gender: foundPatient.gender,
    ssn: foundPatient.ssn,
    occupation: foundPatient.occupation,
    entries: foundPatient.entries
  });
};

const setEntries = (id: string, entry: Entry): Patient | undefined => {
  const foundPatient = patientData.find(patient => patient.id === id);
  if(foundPatient === undefined) { return undefined; }
  entry.id = uuidv4();
  foundPatient.entries = [...foundPatient.entries, entry];
  return(
    foundPatient
  );
};

export default { getPatients, addPatient, getPatient, setEntries };