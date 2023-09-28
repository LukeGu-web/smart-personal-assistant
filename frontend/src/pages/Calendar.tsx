import { useState } from 'react';
import { Box, Button, Typography } from '@mui/joy';

import PageContainer from '../components/PageContainer/PageContainer';
import EventCalendar from '../components/EventCalendar/EventCalendar';
import EventModal from '../components/EventModal/EventModal';
import { mockEvents } from '../mockData';
import EventList from '../components/EventList/EventList';
import { EventType } from '../types';

export default function Calendar() {
  const today = new Date();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<EventType[] | null>(
    null
  );

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
          minHeight: 'calc(100vh - 9.25rem)',
          minWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          margin: '0 auto',
          padding: { xs: '1rem', md: '0' },
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
          <Button onClick={handleCreateEvent}>New event</Button>
        </Box>
        <EventCalendar
          events={mockEvents}
          currentDate={today}
          selectedDate={selectedDate}
          onSetDate={setSelectedDate}
          onSetEvents={setSelectedEvents}
        />
        <EventModal
          isOpen={openModal}
          onClose={handleCloseModal}
          selectedDate={selectedDate || today}
        />
        <EventList events={selectedEvents} />
      </Box>
    </PageContainer>
  );
}
