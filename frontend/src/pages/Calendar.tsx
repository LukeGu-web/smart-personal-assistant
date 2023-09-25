import { useState } from 'react';
import { Box, Button, Typography } from '@mui/joy';

import PageContainer from '../components/PageContainer/PageContainer';
import EventCalendar from '../components/EventCalendar/EventCalendar';
import EventModal from '../components/EventModal/EventModal';

export default function Calendar() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleCreateEvent = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
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
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography component='h1' fontSize='xl2' fontWeight='lg'>
            Event Calendar
          </Typography>
          <Button onClick={handleCreateEvent}>Create new event</Button>
        </Box>
        <EventCalendar
          selectedDate={selectedDate}
          onSetDate={setSelectedDate}
        />
        <EventModal isOpen={openModal} onClose={handleCloseModal} />
      </Box>
    </PageContainer>
  );
}
