import Axios from 'axios';

export default function fetchPatients() {
  return Axios.get('/birthdays/api/patients')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
