import {
  AccordionGroup,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/joy';
import { EventType } from '../../types';

export type EventListProps = {
  events: EventType[] | undefined | null;
};
export default function EventList({ events }: EventListProps) {
  return (
    <Box sx={{ border: '1px solid grey' }}>
      {events ? (
        <AccordionGroup>
          {events &&
            (events as EventType[]).map((event) => (
              <Accordion>
                <AccordionSummary>{event.title}</AccordionSummary>
                <AccordionDetails>{event.description}</AccordionDetails>
              </Accordion>
            ))}
        </AccordionGroup>
      ) : (
        <Typography sx={{ padding: 1 }}>
          You don't have any event on the day.
        </Typography>
      )}
    </Box>
  );
}
