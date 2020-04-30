import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';
import AddOccupationalEntryForm, { OccupationalEntryFormValues } from './AddOccupationalEntryForm';
import AddCheckEntryForm, { CheckEntryFormValues } from './AddCheckEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues | OccupationalEntryFormValues | CheckEntryFormValues) => void;
  error?: string;
  type: "Hospital" | "Occupational" | "Check";
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, type }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {type === "Hospital" ? 
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      :null}
      {type === "Occupational" ? 
        <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      :null}
      {type === "Check" ? 
        <AddCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      :null}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
