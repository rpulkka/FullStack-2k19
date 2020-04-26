import express from 'express';
import { PublicPatient } from '../types';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Array<PublicPatient> = patientsService.getPatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);      
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;