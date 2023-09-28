import { useState } from 'react';
import { Box, Stack, Typography, Modal } from '@mui/joy';

import AIButton from '../components/AIButton/AIButton';
import MessagesPane from '../components/MessagesPane/MessagesPane';
import PageContainer from '../components/PageContainer/PageContainer';
import HomeEventList from '../components/HomeEventList/HomeEventList';
import { getEventsByDay } from '../utils/calendar';
import { getTokenDecode } from '../utils/token';
import { DecodedToken } from '../types';

import { mockList, mockEvents } from '../mockData';
import HomeTaskList from '../components/HomeTaskList/HomeTaskList';

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
          padding: { xs: '1rem', md: '0' },
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
            gridTemplateColumns: {
              xs: 'repeat(1, minmax(0, 1fr))',
              sm: 'repeat(2, 1fr)',
            },
            gridTemplateRows: '1fr',
            gap: 2,
          }}
        >
          <Stack>
            <Typography
              component='h2'
              sx={{ marginBottom: '.5rem', fontSize: '1.2rem' }}
            >
              Remaining Tasks
            </Typography>
            <HomeTaskList tasks={mockList} />
          </Stack>
          <Stack>
            <Typography
              component='h2'
              sx={{ marginBottom: '.5rem', fontSize: '1.2rem' }}
            >
              Coming Events
            </Typography>
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
