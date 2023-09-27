import { toast } from 'react-toastify';
import { apiInstance } from './index.ts';
import { setToken } from '../utils/token.ts';
import { BasicUserProps } from '../types.tsx';

interface Login {
  email: string;
  password: string;
}

interface SignUp extends Login {
  firstname: string;
  lastname: string;
}

export interface Update extends BasicUserProps {
  id: string;
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
      // toast.success('Successfully login!');
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

export const getUserById = async (id: string) => {
  const response = await apiInstance
    .get(`/user/getUserById/${id}`)
    .then((response) => {
      console.log('getUserById: ', response.data);
      toast.success('Success!');
      const { firstname, lastname, email, id } = response.data.user;
      return { firstname, lastname, email, id };
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return null;
    });
  return response;
};

export const deleteUserById = async (id: string) => {
  const response = await apiInstance
    .delete(`/user/deleteUserById/${id}`)
    .then((response) => {
      console.log('deleteUserById: ', response.data.message);
      toast.success('Successfully delete your account!');
      return true;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return false;
    });
  return response;
};

export const updateUserById = async ({
  firstname,
  lastname,
  email,
  id,
}: Update) => {
  const response = await apiInstance
    .put(`/user/updateUserById/${id}`, { firstname, lastname, email })
    .then((response) => {
      console.log('updateUserById: ', response.data.message);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      return error.response.data;
    });
  return response;
};

export const resetPasswordByemail = async ({ email }: { email: string }) => {
  const response = await apiInstance
    .post(`/user/resetPasswordByemail`, { email })
    .then((response) => {
      console.log('resetPasswordByemail: ', response.data.message);
      toast.success(
        'We have sent you an email for reseting your password. Please check your email.'
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
      return error.response.data;
    });
  return response;
};

export const updatePasswordByEmail = async ({ email, password }: Login) => {
  const response = await apiInstance
    .post(`/user/updatePasswordByEmail`, { email, password })
    .then((response) => {
      console.log('updatePasswordByEmail: ', response.data.message);
      toast.success('Your password has been updated successfully');
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
      return error.response.data;
    });
  return response;
};
