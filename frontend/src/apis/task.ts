import { toast } from 'react-toastify';
import { apiInstance } from './index.ts';
import { TaskProps } from '../types.tsx';

export const createTask = async ({
  userId,
  label,
  isCompleted,
  completedDate,
}: TaskProps) => {
  const response = await apiInstance
    .post('/task/createTask', {
      user_id: userId,
      label,
      is_completed: isCompleted,
      completed_date: completedDate,
    })
    .then((response) => {
      console.log('createTask: ', response.data.message);
      toast.success('Successfully login!');
      return response?.data;
    })
    .catch((error) => {
      console.log('createTask error: ', error.response);
      toast.error('Something wrong with your account.');
      return false;
    });
  return response;
};

export const getTasksByUserId = async (id: string) => {
  const response = await apiInstance
    .get(`/task/getTasksByUserId/${id}`)
    .then((response) => {
      console.log('getTasksByUserId: ', response.data.message);
      toast.success('Successfully login!');
      return response?.data;
    })
    .catch((error) => {
      console.log('getTasksByUserId error: ', error.response);
      toast.error('Something wrong with your account.');
      return false;
    });
  return response;
};

export const getTaskById = async (taskId: string) => {
  const response = await apiInstance
    .get(`/task/getTaskById/${taskId}`)
    .then((response) => {
      console.log('getTaskById: ', response.data.message);
      toast.success('Successfully login!');
      return response?.data;
    })
    .catch((error) => {
      console.log('getTaskById error: ', error.response);
      toast.error('Something wrong with your account.');
      return false;
    });
  return response;
};

export const updateTaskLabelById = async ({
  taskId,
  label,
}: {
  taskId: string;
  label: string;
}) => {
  const response = await apiInstance
    .put(`/task/updateTaskLabelById/${taskId}`, { label })
    .then((response) => {
      console.log('updateTaskLabelById: ', response.data.message);
      toast.success('Successfully login!');
      return response?.data;
    })
    .catch((error) => {
      console.log('updateTaskLabelById error: ', error.response);
      toast.error('Something wrong with your account.');
      return false;
    });
  return response;
};

export const completeTaskById = async ({
  taskId,
  isCompleted,
}: {
  taskId: string;
  isCompleted: boolean;
}) => {
  const response = await apiInstance
    .put(`/task/completeTaskById/${taskId}`, { isCompleted })
    .then((response) => {
      console.log('completeTaskById: ', response.data.message);
      toast.success('Successfully login!');
      return response?.data;
    })
    .catch((error) => {
      console.log('completeTaskById error: ', error.response);
      toast.error('Something wrong with your account.');
      return false;
    });
  return response;
};

export const deleteTaskById = async (taskId: string) => {
  const response = await apiInstance
    .delete(`/task/deleteTaskById/${taskId}`)
    .then((response) => {
      console.log('deleteTaskById: ', response.data.message);
      toast.success('Successfully login!');
      return response?.data;
    })
    .catch((error) => {
      console.log('deleteTaskById error: ', error.response);
      toast.error('Something wrong with your account.');
      return false;
    });
  return response;
};
