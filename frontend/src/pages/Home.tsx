import { useState } from 'react';
import {
  Box,
  Link,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListDivider,
  Typography,
  Modal,
} from '@mui/joy';
import TaskIcon from '@mui/icons-material/Task';

import { Link as RouterLink } from 'react-router-dom';

import AIButton from '../components/AIButton/AIButton';
import MessagesPane from '../components/MessagesPane/MessagesPane';
import PageContainer from '../components/PageContainer/PageContainer';
import { getEventsByDay } from '../utils/calendar';
import { mockList, mockEvents } from '../mockData';
import { getTokenDecode } from '../utils/token';
import { DecodedToken } from '../types';
import { HomeEventList } from '../components/HomeEventList/HomeEventList';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const eventsByDay = getEventsByDay(mockEvents);
  const decode = getTokenDecode() as DecodedToken;
  const userFirstname = decode.firstname;
  console.log(eventsByDay, decode.firstname);

  return (
    <PageContainer>
      <Box
        sx={{
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          minHeight: 'calc(100vh - 9.25rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          margin: '0 auto',
          // backdropFilter: 'blur(4px)',
        }}
      >
        <Typography
          component='h1'
          sx={{ fontSize: '2rem', fontWeight: 'bold' }}
        >
          Hi, {userFirstname}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr);',
            gridTemplateRows: '1fr',
            gap: 2,
          }}
        >
          <Stack sx={{}}>
            <Typography>Remaining Tasks</Typography>
            <List
              aria-labelledby='todo-task-list'
              sx={{ border: '1px solid grey', borderRadius: '6px' }}
            >
              {mockList.map((task) => (
                <ListItem key={task.id}>
                  <ListItemButton>{task.label}</ListItemButton>
                </ListItem>
              ))}
              <ListDivider inset='gutter' />
              <ListItem>
                <ListItemDecorator>
                  <TaskIcon />
                </ListItemDecorator>
                <Link
                  component={RouterLink}
                  to='/todo-list'
                  sx={{
                    width: '100%',
                    '&:hover': {
                      textDecorationLine: 'none',
                    },
                  }}
                >
                  <ListItemButton sx={{ width: '100%' }}>
                    Go to Todo List
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Stack>
          <Stack>
            <Typography>Coming Events</Typography>
            <HomeEventList eventsByDay={eventsByDay} />
          </Stack>
        </Box>
        {!showChat && <AIButton onClick={() => setShowChat(true)} />}
        <Modal
          aria-labelledby='modal-title'
          aria-describedby='modal-desc'
          open={showChat}
          onClose={() => setShowChat(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack sx={{ width: '100%', maxWidth: '600px' }}>
            <MessagesPane onClose={() => setShowChat(false)} />
          </Stack>
        </Modal>
      </Box>
    </PageContainer>
  );
}
