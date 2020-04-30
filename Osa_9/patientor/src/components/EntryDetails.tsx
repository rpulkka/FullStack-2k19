import React from 'react';
import { Entry } from '../types';
import HospitalEntryComp from './HopsitalEntryComp';
import OccupationEntry from './OccupationEntry';
import CheckEntry from './CheckEntry';

const PatientComponent: React.FC<{ entry: Entry }> = ({entry}) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch(entry.type) {
    case "Hospital":
      return <HospitalEntryComp entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationEntry entry={entry} />;
    case "HealthCheck":
      return <CheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default PatientComponent;