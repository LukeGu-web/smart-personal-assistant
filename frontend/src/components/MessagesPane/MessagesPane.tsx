import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import CloseIcon from '@mui/icons-material/Close';
import AvatarWithStatus from '../AvatarWithStatus/AvatarWithStatus';
import ChatBubble from '../ChatBubble/ChatBubble';
import MessageInput from '../MessageInput/MessageInput';
import { MessageProps } from '../../types';

type MessagesPaneProps = {
  onClose: () => void;
};

type AIMessage = {
  role: string;
  content: string;
};

const api_site = import.meta.env.VITE_API_SITE;

export default function MessagesPane({ onClose }: MessagesPaneProps) {
  const [chatMessages, setChatMessages] = React.useState<MessageProps[]>([]);
  const [chats, setChats] = React.useState<AIMessage[]>([]);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState<boolean>(false);

  const handleChat = async (message: string) => {
    if (!message) return;
    setIsTyping(true);

    const messages: AIMessage[] = chats;
    messages.push({ role: 'user', content: message });
    setChats(messages);

    const newChatMessages: MessageProps[] = chatMessages;
    newChatMessages.push({
      id: chatMessages.length.toString(),
      sender: 'You',
      content: message,
      timestamp: new Date().toLocaleString(),
    });
    setChatMessages(newChatMessages);

    setTextAreaValue('');

    fetch(`${api_site}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        messages.push(data.output);
        newChatMessages.push({
          id: chatMessages.length.toString(),
          sender: 'AI',
          content: data.output.content,
          timestamp: new Date().toLocaleString(),
        });
        setChats(messages);
        setChatMessages(newChatMessages);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Sheet
      sx={{
        height: { xs: '100%', lg: '40rem' },
        width: { xs: '100%', lg: '40rem' },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',
      }}
    >
      <Stack padding={2} direction='column' alignItems='end'>
        <Button variant='plain' size='sm' onClick={onClose}>
          <CloseIcon />
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 2.5,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent='flex-end'>
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction='row'
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {message.sender !== 'You' && <AvatarWithStatus />}
                <ChatBubble
                  variant={isYou ? 'sent' : 'received'}
                  {...message}
                />
              </Stack>
            );
          })}
          {isTyping && <p>AI is preparing the answer...</p>}
        </Stack>
      </Box>

      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          handleChat(textAreaValue);
        }}
      />
    </Sheet>
  );
}
