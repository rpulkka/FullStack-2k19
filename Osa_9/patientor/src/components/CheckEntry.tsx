import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { useStateValue } from "../state";
import CSS from 'csstype';
import { Icon } from 'semantic-ui-react';

const CheckEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
      <h3>Health Check Entry</h3>
      <Icon name='heart outline' /><br/>
      DATE: {entry.date}<br/>
      DESCRIPTION: {entry.description}<br />
      SPECIALIST: {entry.specialist}<br/>
      {entry.healthCheckRating ?
        <div>HEALTH RATING: {HealthCheckRating[entry.healthCheckRating]}<br/></div>
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

export default CheckEntry;