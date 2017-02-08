import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-bootstrap';

import fetchPatients from './endpoints/fetch-patients';
import fetchPersonalMessage from './endpoints/fetch-personalmessage';

import PatientList from './components/PatientList';
import PersonalMessage from './components/PersonalMessage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      personalMessages: {}, // recipientId -> personalMessage
      selectedPatientId: null,
    };
  }
  componentWillMount() {
    fetchPatients()
      .then((patients) => {
        this.setState({ patients });
        return patients;
      })
      .then((patients) => {
        patients.forEach((patient) => {
          fetchPersonalMessage(patient.id).then((response) => {
            const personalMessages = this.state.personalMessages;
            personalMessages[patient.id] = response.message;
            this.setState({ personalMessages });
          });
        });
      });
  }
  setPersonalMessage(recipientId, personalMessage) {
    const personalMessages = this.state.personalMessages;
    personalMessages[recipientId] = personalMessage;
    this.setState({ personalMessages });
  }
  getSelectedPatient() {
    if (this.state.selectedPatientId === null) {
      return null;
    }
    return this.state.patients.find((patient) => {
      return patient.id === this.state.selectedPatientId;
    });
  }
  selectPatient(patientId) {
    this.setState({ selectedPatientId: patientId });
  }
  render() {
    return (
      <div style={{ marginBottom: '2em' }} className="container">
        <h1 style={{ textAlign: 'center' }}>
          Birthay Reminders
        </h1>
        <Row>
          <Col md={6}>
            <h4>
              Upcoming birthdays
            </h4>
            <PatientList
              selectPatient={(patientId) => {
                this.selectPatient(patientId);
              }}
              personalMessages={this.state.personalMessages}
              selectedPatientId={this.state.selectedPatientId}
              patients={this.state.patients}
            />
          </Col>
          <Col md={6}>
            <h4>
              Set personal message
            </h4>
            <PersonalMessage
              recipient={this.getSelectedPatient()}
              personalMessage={this.state.personalMessages[this.state.selectedPatientId]}
              setPersonalMessage={(recipientId, personalMessage) => {
                this.setPersonalMessage(recipientId, personalMessage);
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
