import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Patient } from '../types';
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { setPatientAction, addEntryAction } from '../state/reducer';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal/index';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';
import { OccupationalEntryFormValues } from '../AddEntryModal/AddOccupationalEntryForm';
import { CheckEntryFormValues } from '../AddEntryModal/AddCheckEntryForm';

const PatientComponent: React.FC = () => {
  const [{ patients, }, dispatch] = useStateValue();

  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [paramType, setParamType] = React.useState<"Hospital"|"Occupational"|"Check">("Hospital");

  const openModal = (param: "Hospital"|"Occupational"|"Check"): void => {
    setParamType(param);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  const fetchPatient = async () => {
    return await axios.get<Patient | undefined>(
      `${apiBaseUrl}/patients/${id}`
    );
  };

  useEffect((): void => {
    if (patients[id] && !patients[id].ssn) {
      const callAxios = async () => {
        const { data: patientFromApi } = await fetchPatient();
        dispatch(setPatientAction(patientFromApi as Patient, id));
        setPatient(patientFromApi as Patient);
      };
      callAxios();
    } else {
      setPatient(patients[id]);
    }
  }, [patients]);

  if (!patient) {
    return <div>Loading</div>;
  }

  const submitNewEntry = async (values: HospitalEntryFormValues | OccupationalEntryFormValues | CheckEntryFormValues) => {
    try {
      const { data: modifiedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );

      if(!modifiedPatient.entries) {
        throw "No entries found.";
      }

      dispatch(addEntryAction(modifiedPatient.entries[modifiedPatient.entries.length - 1], patient.id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ID: {patient.id}</p>
      <p>NAME: {patient.name}</p>
      <p>OCCUPATION: {patient.occupation}</p>
      <p>GENDER: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>DATE OF BIRTH: {patient.dateOfBirth}</p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        type={paramType}
      />
      <button onClick={() => openModal("Hospital")}>Add New Hospital Entry</button>
      <button onClick={() => openModal("Occupational")}>Add New Occupational Entry</button>
      <button onClick={() => openModal("Check")}>Add New Health Check Entry</button>
      <h3>ENTRIES</h3>
      {patient.entries ?
        patient.entries.map(entryobject =>
          <div key={entryobject.description}>
            <EntryDetails entry={entryobject} /><br/><br/>
          </div>
        )
        : null}
    </div>
  );
};

export default PatientComponent;