import { toast } from 'react-toastify';
import { apiInstance } from './index.ts';

type SignUp = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export const signUp = ({ firstname, lastname, email, password }: SignUp) => {
  console.log(firstname, lastname, email, password);
  apiInstance
    .post('/user/signup', { firstname, lastname, email, password })
    .then((response) => {
      console.log('signup: ', response.data.message);
      toast.success('Successfully registered!');
    })
    .catch((error) => {
      toast.error(error.data.message);
    });
};

export const getUserById = (id: string) => {
  apiInstance
    .get(`/user/getUserById/${id}`)
    .then((response) => {
      console.log('getUserById: ', response.data.message);
      toast.success('Success!');
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
