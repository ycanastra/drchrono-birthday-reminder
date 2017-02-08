import Axios from 'axios';
import Cookies from 'js-cookie';

export default function updatePersonalMessage(recipientId, personalMessage) {
  const url = `/birthdays/api/personalmessage/${recipientId}`;
  const data = { message: personalMessage };

  const csrftoken = Cookies.get('csrftoken');
  const config = {
    headers: { 'X-CSRFToken': csrftoken.toString() },
  };

  return Axios.put(url, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
