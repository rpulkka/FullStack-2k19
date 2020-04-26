import express from 'express';
import { Diagnosis } from '../types';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Array<Diagnosis> = diagnosisService.getDiagnoses();
  res.send(diagnoses);
});

export default router;