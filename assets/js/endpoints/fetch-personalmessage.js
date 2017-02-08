import Axios from 'axios';

export default function fetchPersonalMessage(recipientId) {
  return Axios.get(`/birthdays/api/personalmessage/${recipientId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
