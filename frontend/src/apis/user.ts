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

export const signUp = async ({
  firstname,
  lastname,
  email,
  password,
}: SignUp) => {
  const response = await apiInstance
    .post('/user/signup', { firstname, lastname, email, password })
    .then((response) => {
      console.log('signup: ', response.data.message);
      toast.success(
        'Successfully registered! Will redirect you to the login page.'
      );
      return true;
    })
    .catch((error) => {
      toast.error(error.data.message);
      return false;
    });
  return response;
};

export const login = async ({ email, password }: Login) => {
  const response = await apiInstance
    .post('/user/login', { email, password })
    .then((response) => {
      console.log('login: ', response.data.message);
      toast.success('Successfully login!');
      setToken(response.data.token);
      return response?.data.success;
    })
    .catch((error) => {
      console.log('login error: ', error.response);
      toast.error('Something wrong with your account.');
      return false;
    });
  return response;
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
