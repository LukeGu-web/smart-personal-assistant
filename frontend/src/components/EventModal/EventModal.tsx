import {
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

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EventModal({ isOpen, onClose }: EventModalProps) {
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
              <FormLabel>Title *</FormLabel>
              <Input autoFocus required />
            </FormControl>
            <FormControl>
              <FormLabel>Date *</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
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
  );
}
