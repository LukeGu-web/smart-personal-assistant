import { toast } from 'react-toastify';
import { apiInstance } from './index.ts';
import { setToken } from '../utils/token.ts';

interface Login {
  email: string;
  password: string;
}

interface SignUp extends Login {
  firstname: string;
  lastname: string;
}

export const signUp = ({ firstname, lastname, email, password }: SignUp) => {
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

export const login = ({ email, password }: Login) => {
  apiInstance
    .post('/user/login', { email, password })
    .then((response) => {
      console.log('login: ', response.data.message);
      toast.success('Successfully login!');
      setToken(response.data.token);
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
