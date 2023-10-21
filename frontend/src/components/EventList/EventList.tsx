import dayjs from 'dayjs';
import {
  AccordionGroup,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from '@mui/joy';
import { EventType } from '../../types';

export type EventListProps = {
  events: EventType[] | undefined | null;
  selectedDate: Date;
};
export default function EventList({ events, selectedDate }: EventListProps) {
  return (
    <Box sx={{ border: '1px solid grey' }}>
      {events ? (
        <AccordionGroup>
          <Typography sx={{ padding: 1 }}>
            {dayjs(selectedDate).format('MMMM DD')}
          </Typography>
          {events &&
            (events as EventType[]).map((event) => (
              <Accordion key={event.title}>
                <AccordionSummary>
                  {event.title}
                  <Chip>{dayjs(event.start).format('LT')}</Chip>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingY: 0.5 }}>
                  <Box sx={{ display: 'flex', paddingBottom: 1 }}>
                    <Chip>{dayjs(event.start).format('LT')}</Chip>
                    <Typography sx={{ paddingX: 1 }}>-</Typography>
                    <Chip>{dayjs(event.end).format('LT')}</Chip>
                  </Box>
                  {event.description}
                </AccordionDetails>
              </Accordion>
            ))}
        </AccordionGroup>
      ) : (
        <Typography sx={{ padding: 1 }}>
          You don't have any event on {dayjs(selectedDate).format('MMMM DD')}.
        </Typography>
      )}
    </Box>
  );
}
