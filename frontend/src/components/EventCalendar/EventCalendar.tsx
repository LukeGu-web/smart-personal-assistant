import { useState, useEffect } from 'react';
import {
  Sheet,
  Grid,
  Typography,
  Modal,
  ModalDialog,
  Button,
  Stack,
  FormControl,
  Input,
  FormLabel,
  ModalClose,
  Textarea,
} from '@mui/joy';
import CalendarControl from '../CalendarControl/CalendarControl';
import Day from '../Day/Day';
import { weekDays } from '../../data';
import { monthString, getMonthDaysGrid } from '../../utils/calendar';

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(monthString(new Date()));
  const [daysGrid, setDaysGrid] = useState<Array<Date | null>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  //   const [title, setTitle] = useState('');
  //   const [content, setContent] = useState('');

  const makeMonthDaysGrid = (date: Date) => {
    const newDaysGrid = getMonthDaysGrid(date);
    setDaysGrid(newDaysGrid);
  };

  useEffect(() => {
    makeMonthDaysGrid(currentDate);
  }, []);

  const handleChangeMonth = (action: -1 | 1) => {
    const tmpDate = currentDate;
    tmpDate.setMonth(tmpDate.getMonth() + action);
    makeMonthDaysGrid(tmpDate);
    setCurrentDate(tmpDate);
    setCurrentMonth(monthString(tmpDate));
  };

  const handleCreateEvent = (date: Date) => {
    console.log(date);
    setOpenModal(true);
  };

  return (
    <Sheet>
      <CalendarControl
        currentMonth={currentMonth}
        changeMonth={handleChangeMonth}
      />
      <Grid
        container
        columns={14}
        sx={{
          flexGrow: 1,
          borderTop: '1px solid grey',
          borderLeft: '1px solid grey',
        }}
      >
        {weekDays.map((weekday, index) => (
          <Grid
            xs={2}
            key={index}
            sx={{
              borderRight: '1px solid grey',
              borderBottom: '1px solid grey',
            }}
          >
            <Typography
              level='title-lg'
              sx={{ paddingTop: '2rem', marginLeft: 1 }}
            >
              {weekday}
            </Typography>
          </Grid>
        ))}
        {daysGrid.map((day, index) => (
          <Day key={index} date={day} onCreateEvent={handleCreateEvent} />
        ))}
      </Grid>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog
          aria-labelledby='basic-modal-dialog-title'
          aria-describedby='basic-modal-dialog-description'
          sx={{ maxWidth: 600, width: '100%' }}
        >
          <ModalClose />
          <Typography id='basic-modal-dialog-title' level='h2'>
            Create new event
          </Typography>
          <Typography id='basic-modal-dialog-description'>
            Fill in the information of the event.
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpenModal(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title *</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea minRows={4} placeholder='Type anything…' />
              </FormControl>
              <Button type='submit'>Create</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}
