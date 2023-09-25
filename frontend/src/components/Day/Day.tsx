import { ReactElement } from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);
import { Button, Grid, Typography } from '@mui/joy';

import Event from '../Event/Event';

export type Event = {
  id?: string;
  title: string;
  popupContent: ReactElement;
  date: Date;
  color?: string;
};

type DayProps = {
  date: Date | null;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

export default function Day({ date, selectedDate, onSelectDate }: DayProps) {
  const isToday = dayjs(date).isToday();
  const isSelected = dayjs(date).isSame(selectedDate, 'day');
  return (
    <Grid
      xs={2}
      sx={{
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey',
      }}
    >
      {date && (
        <Button
          variant={isToday || isSelected ? 'solid' : 'plain'}
          sx={{
            width: '100%',
            borderRadius: 0,
          }}
          color={isSelected ? 'success' : 'primary'}
          onClick={() => onSelectDate(date)}
        >
          <Typography
            level='body-lg'
            sx={{
              paddingTop: '2rem',
              color: `${isToday ? '#FFBB5C' : 'default'}`,
            }}
          >
            {dayjs(date).date()}
          </Typography>
        </Button>
      )}
    </Grid>
  );
}
