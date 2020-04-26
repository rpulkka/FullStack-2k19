import { Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing comment: ' + text);
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing weather: ' + gender);
  } 
  return gender;
};

export const toNewPatient = (object: any) => {
  return {
    name: parseText(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseText(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation)
  };
};