import dayjs from 'dayjs';
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

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
};

export default function EventModal({
  isOpen,
  onClose,
  selectedDate,
}: EventModalProps) {
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
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onClose();
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <Input placeholder='Add a title' autoFocus required />
            </FormControl>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={1}>
                  <DateTimePicker
                    label='Start from'
                    defaultValue={dayjs(selectedDate)}
                    views={['month', 'day', 'hours', 'minutes']}
                  />
                  <DateTimePicker
                    label='End at'
                    defaultValue={dayjs(selectedDate).add(30, 'minute')}
                    views={['month', 'day', 'hours', 'minutes']}
                  />
                </Stack>
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <Textarea minRows={4} placeholder='Add a description' />
            </FormControl>
            <Button type='submit'>Create</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
