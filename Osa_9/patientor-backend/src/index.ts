import express from 'express';
const app = express();
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRoute';
import patientsRouter from './routes/patientsRoute';

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);

app.use('/api/patients', patientsRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});