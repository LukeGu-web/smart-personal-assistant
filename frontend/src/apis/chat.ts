import { toast } from 'react-toastify';
import { apiInstance } from './index.ts';
import { AIMessage } from '../types.tsx';

export const chatWithAI = async (chats: AIMessage[]) => {
  const response = await apiInstance
    .post('/chat/ai', { chats })
    .then((response) => {
      console.log('chatWithAI: ', response.data.message);
      toast.success('Successfully.');
      return true;
    })
    .catch((error) => {
      toast.error(error.data.message);
      return false;
    });
  return response;
};

export const saveUserChat = async ({
  user_id,
  messages,
}: {
  user_id: string;
  messages: string;
}) => {
  const response = await apiInstance
    .post('/chat/saveUserChat', { user_id, messages })
    .then((response) => {
      console.log('saveUserChat: ', response.data.message);
      toast.success('Successfully.');
      return true;
    })
    .catch((error) => {
      toast.error(error.data.message);
      return false;
    });
  return response;
};

export const getChatByUserId = async (id: string) => {
  const response = await apiInstance
    .get(`/chat/getChatByUserId/${id}`, {})
    .then((response) => {
      console.log('getChatByUserId: ', response.data.message);
      toast.success('Successfully.');
      return true;
    })
    .catch((error) => {
      toast.error(error.data.message);
      return false;
    });
  return response;
};

export const deleteChatByUserId = async (id: string) => {
  const response = await apiInstance
    .delete(`/chat/deleteChatByUserId/${id}`, {})
    .then((response) => {
      console.log('deleteChatByUserId: ', response.data.message);
      toast.success('Successfully.');
      return true;
    })
    .catch((error) => {
      toast.error(error.data.message);
      return false;
    });
  return response;
};
