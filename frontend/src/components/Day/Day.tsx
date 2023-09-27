import { ReactElement } from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);
import { Badge, Button, Box, Grid, Typography } from '@mui/joy';

import Event from '../Event/Event';
import { EventType } from '../../types';

export type Event = {
  id?: string;
  title: string;
  popupContent: ReactElement;
  date: Date;
  color?: string;
};

type DayProps = {
  date: Date | null;
  events: EventType[] | undefined;
  selectedDate: Date | null;
  onSelectDate: (date: Date, events: EventType[] | undefined) => void;
};

export default function Day({
  date,
  events,
  selectedDate,
  onSelectDate,
}: DayProps) {
  const isToday = dayjs(date).isToday();
  const isSelected = dayjs(date).isSame(selectedDate, 'day');
  const handleSelect = () => {
    if (date) {
      onSelectDate(date, events);
    }
  };
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
          onClick={handleSelect}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <Badge
              badgeContent={events?.length}
              color='danger'
              invisible={!events}
            >
              <Typography
                level='body-lg'
                sx={{
                  padding: '.5rem',
                  color: `${isToday ? '#FFBB5C' : 'default'}`,
                }}
              >
                {dayjs(date).date()}
              </Typography>
            </Badge>
          </Box>
        </Button>
      )}
    </Grid>
  );
}
