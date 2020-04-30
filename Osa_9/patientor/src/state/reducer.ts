import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: {
        patient: Patient;
        id: string;
      };
  }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      entry: Entry;
      id: string;
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload.patient
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients
        }
      };
      case "ADD_ENTRY":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: {...state.patients[action.payload.id], entries: [...state.patients[action.payload.id].entries, action.payload.entry]}
          }
        };
    default:
      return state;
  }
};

export const setPatientListAction = (patientListFromApi: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST", 
    payload: patientListFromApi
  } as Action;
};

export const addPatientAction = (newPatient: Patient) => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  } as Action;
};

export const setPatientAction = (patientFromApi: Patient, id: string) => {
  return {
    type: "SET_PATIENT", 
    payload: {
      patient: patientFromApi,
      id: id
    }
  } as Action;
};

export const setDiagnosisListAction = (diagnosisListFromApi: Diagnosis[]) => {
  return {
    type: "SET_DIAGNOSIS_LIST", 
    payload: diagnosisListFromApi
  } as Action;
};

export const addEntryAction = (newEntry: Entry, patientId: string) => {
  return {
    type: "ADD_ENTRY",
    payload: {
      entry: newEntry,
      id: patientId
    }
  } as Action;
};
