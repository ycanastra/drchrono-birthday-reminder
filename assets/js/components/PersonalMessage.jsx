import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import updatePersonalMessage from './../endpoints/update-personalmessage';

const PersonalMessage = ({ personalMessage, setPersonalMessage, recipient }) => {
  if (recipient === null) {
    return (
      <div>
        Select a patient to write a personal message
      </div>
    );
  }
  const recipientBirthday = recipient.birthday !== null ? recipient.birthday : 'Not Available';
  const ifEmailAvailable = recipient.email !== null;
  return (
    <div>
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>{`Personal Message to ${recipient.firstName}`}</ControlLabel>
        <br />
        <ControlLabel>{`Birthday: ${recipientBirthday}`}</ControlLabel>
        {ifEmailAvailable
          ? <div>{`Message will be sent to ${recipient.email}`}</div>
          : <div>This user&#39;s email is not available, message will NOT be sent</div>}
        <FormControl
          style={{ height: '25em' }}
          value={personalMessage}
          onChange={(e) => {
            const recipientId = recipient.id;
            const updatedPersonalMessage = e.target.value;
            setPersonalMessage(recipientId, updatedPersonalMessage);
          }}
          componentClass="textarea"
          placeholder={`Type in your personal message to ${recipient.firstName} here. Don't forget to include your name!`}
        />
      </FormGroup>
      <FormGroup>
        <Button
          style={{ float: 'right' }}
          bsStyle="primary"
          onClick={() => {
            const recipientId = recipient.id;
            const newPersonalMessage = personalMessage;
            updatePersonalMessage(recipientId, newPersonalMessage).then(() => {
              alert('Saved!');
            });
          }}
        >
          Save
        </Button>
      </FormGroup>
    </div>
  );
};

PersonalMessage.propTypes = {
  personalMessage: React.PropTypes.string,
  setPersonalMessage: React.PropTypes.func,
  recipient: React.PropTypes.shape({
    id: React.PropTypes.number,
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
    birthday: React.PropTypes.string,
    email: React.PropTypes.string,
  }),
};

export default PersonalMessage;
