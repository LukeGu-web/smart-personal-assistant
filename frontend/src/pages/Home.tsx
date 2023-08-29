import { useState } from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import { Link as RouterLink } from 'react-router-dom';

import AIButton from '../components/AIButton/AIButton';
import MessagesPane from '../components/MessagesPane/MessagesPane';
import PageContainer from '../components/PageContainer/PageContainer';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  return (
    <PageContainer>
      <Box
        sx={{
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          height: 'calc(100vh - 9.25rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          margin: '0 auto',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Link component={RouterLink} to='/login'>
            Login
          </Link>
          <Link component={RouterLink} to='/sign-up'>
            Sign Up
          </Link>
          <Link component={RouterLink} to='/todo-list'>
            Todo List
          </Link>
        </Box>

        {showChat ? (
          <MessagesPane onClose={() => setShowChat(false)} />
        ) : (
          <AIButton onClick={() => setShowChat(true)} />
        )}
      </Box>
    </PageContainer>
  );
}
