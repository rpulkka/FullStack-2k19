import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { useStateValue } from "../state";
import CSS from 'csstype';
import { Icon } from 'semantic-ui-react';

const OccupationEntry: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnosis },] = useStateValue();

  const h1Styles: CSS.Properties = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '0.5rem',
    fontFamily: 'sans-serif',
    fontSize: '1.5rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
  };

  return (
    <div style={h1Styles}>
      <h3>Occupational Healthcare Entry</h3>
      <Icon name='suitcase' /><br/>
      DATE: {entry.date}<br/>
      DESCRIPTION: {entry.description}<br />
      SPECIALIST: {entry.specialist}<br/>
      EMPLOYER NAME: {entry.employerName}<br/>
      {entry.sickLeave ?
        <div>SICK LEAVE: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}<br/></div>
        : null
      }
      {entry.diagnosisCodes ?
        <ul>
          CODES:
            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnosis[code].name}</li>)}
        </ul>
        : null
      }
    </div>
  );
};

export default OccupationEntry;