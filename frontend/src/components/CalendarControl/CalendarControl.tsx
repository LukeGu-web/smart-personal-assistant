import { IconButton, Stack, Typography } from '@mui/joy';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

type CalendarControlProps = {
  changeMonth: (action: -1 | 1) => void;
  currentMonth: string;
};

export default function CalendarControl({
  changeMonth,
  currentMonth,
}: CalendarControlProps) {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      padding='0.5em 1em'
      borderBottom='1px solid rgba(0, 0, 0, 0.12)'
    >
      <Stack direction='row'>
        <IconButton
          aria-label='previous month'
          onClick={() => changeMonth(-1)}
          size='sm'
          color='primary'
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          aria-label='next month'
          onClick={() => changeMonth(1)}
          size='sm'
          color='primary'
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Typography color='primary' aria-label='current month'>
        {currentMonth}
      </Typography>
    </Stack>
  );
}
