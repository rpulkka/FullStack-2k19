import express from 'express';
import { Patient, PublicPatient } from '../types';
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
    const newPatientWithEntries = { ...newPatient, entries: [] };
    const addedPatient: Patient = patientsService.addPatient(newPatientWithEntries);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', (req, res) => {
  try {
    const searchedPatient: Patient | undefined = patientsService.getPatient(req.params.id);
    res.send(searchedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    if(req.body.type && req.body.description && req.body.date && req.body.specialist) {
      if(req.body.type === "Hospital" && !req.body.discharge) {
        throw "Missing discharge field.";
      }
      if(req.body.type === "OccupationalHealthcare" && !req.body.employerName) {
        throw "Missing employed name field.";
      }
      if(req.body.type === "HealthCheck" && !req.body.healthCheckRating) {
        throw "Missing health check rating field.";
      }
      if(req.body.type !== "Hospital" && req.body.type !== "OccupationalHealthcare" && req.body.type !== "HealthCheck") {
        throw "Invalid entry type.";
      }
    } else {
      throw "Missing fields in base entry.";
    }
    const searchedPatient: Patient | undefined = patientsService.setEntries(req.params.id, req.body);
    res.json(searchedPatient);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

export default router;