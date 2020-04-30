import React from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { setPatientListAction, setDiagnosisListAction } from "./state/reducer";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientComponent from "./components/PatientComponent";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientListAction(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisListAction(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
          </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id">
            <PatientComponent />
          </Route>
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
