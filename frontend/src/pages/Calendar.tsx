import Box from '@mui/joy/Box';

import PageContainer from '../components/PageContainer/PageContainer';
import EventCalendar from '../components/EventCalendar/EventCalendar';

export default function Calendar() {
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
        <p>Calendar</p>
        <EventCalendar />
      </Box>
    </PageContainer>
  );
}
