import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Typography,
  Modal,
  ModalDialog,
  Button,
  Stack,
  FormControl,
  Input,
  ModalClose,
  Textarea,
} from '@mui/joy';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EventType } from '../../types';

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
}
interface EventFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type EventModalProps = {
  isOpen: boolean;
  selectedDate: Date;
  onClose: () => void;
  onCreate: (newEvent: EventType) => void;
};

export default function EventModal({
  isOpen,
  selectedDate,
  onClose,
  onCreate,
}: EventModalProps) {
  const [start, setStart] = useState<Dayjs | null>(dayjs(selectedDate));
  const [end, setEnd] = useState<Dayjs | null>(
    dayjs(selectedDate).add(30, 'minute')
  );
  useEffect(() => {
    setStart(dayjs(selectedDate));
    setEnd(dayjs(selectedDate).add(30, 'minute'));
  }, [selectedDate]);
  return (
    <Modal open={isOpen} onClose={onClose}>
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
          onSubmit={(event: React.FormEvent<EventFormElement>) => {
            event.preventDefault();
            const formElements = event.currentTarget.elements;
            const data = {
              title: formElements.title.value,
              start: (start as Dayjs).toDate(),
              end: (end as Dayjs).toDate(),
              description: formElements.description.value,
            };
            onCreate(data);
            console.log('data: ', data);
            onClose();
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <Input
                type='text'
                name='title'
                placeholder='Add a title'
                autoFocus
                required
              />
            </FormControl>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={1}>
                  <DateTimePicker
                    label='Start from'
                    views={['month', 'day', 'hours', 'minutes']}
                    value={start}
                    onChange={(date) => setStart(date)}
                  />
                  <DateTimePicker
                    label='End at'
                    views={['month', 'day', 'hours', 'minutes']}
                    value={end}
                    onChange={(date) => setEnd(date)}
                  />
                </Stack>
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <Textarea
                name='description'
                minRows={4}
                placeholder='Add a description'
              />
            </FormControl>
            <Button type='submit'>Create</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
