import React from 'react';
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
}

function sortByUpcomingBirthday(date1, date2) {
  const todayDOY = getDayOfYear(new Date());
  const bdayDOY1 = getDayOfYear(date1);
  const bdayDOY2 = getDayOfYear(date2);

  const cmp1 = (todayDOY - bdayDOY1) % 357;
  const cmp2 = (todayDOY - bdayDOY2) % 357;

  return (cmp1 < cmp2) ? 1 : -1;
}

const PatientList = ({ selectPatient, selectedPatientId, patients, personalMessages }) => {
  const sortedPatients = patients.sort((pre, cur) => {
    return sortByUpcomingBirthday(new Date(pre.birthday), new Date(cur.birthday));
  });
  return (
    <ListGroup>
      {sortedPatients.map((patient) => {
        const hasPersonalMessage = personalMessages[patient.id] !== '' &&
                                   personalMessages[patient.id] !== undefined;
        const patientBirthday = (patient.birthday !== null) ? patient.birthday : '';
        return (
          <ListGroupItem
            key={patient.id}
            bsStyle={(hasPersonalMessage) ? 'success' : undefined}
            href="#"
            active={selectedPatientId === patient.id}
            onClick={(e) => {
              e.preventDefault();
              selectPatient(patient.id);
            }}
          >
            {hasPersonalMessage && <Glyphicon style={{ float: 'right' }} glyph="ok" />}
            {`${patient.firstName} ${patient.lastName} ${patientBirthday}`}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

PatientList.propTypes = {
  selectPatient: React.PropTypes.func,
  selectedPatientId: React.PropTypes.number,
  personalMessages: React.PropTypes.objectOf(React.PropTypes.string),
  patients: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      firstName: React.PropTypes.string,
      lastName: React.PropTypes.string,
      birthday: React.PropTypes.string,
    })
  ),
};

export default PatientList;
