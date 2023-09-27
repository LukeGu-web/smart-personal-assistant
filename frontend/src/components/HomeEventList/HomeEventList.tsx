import {
  Chip,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListDivider,
  ListSubheader,
} from '@mui/joy';
import EventIcon from '@mui/icons-material/Event';
import dayjs from 'dayjs';
import { Link as RouterLink } from 'react-router-dom';
import { EventsByDay } from '../../types';

export function HomeEventList({ eventsByDay }: { eventsByDay: EventsByDay }) {
  const currentMonth = dayjs().format('MMMM');
  const dayEvents = [];
  for (const [key, value] of Object.entries(eventsByDay)) {
    const item = (
      <ListItem key={key} nested>
        <ListSubheader>{`${currentMonth} ${key}`}</ListSubheader>
        <List>
          {value.map((event) => (
            <ListItem key={event.title}>
              <ListItemButton>
                {event.title}
                <Chip>{dayjs(event.start).format('LT')}</Chip>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ListItem>
    );
    dayEvents.push(item);
  }
  return (
    <List
      variant='outlined'
      sx={{
        borderRadius: 'sm',
      }}
    >
      {dayEvents.map((item) => item)}
      <ListDivider inset='gutter' />
      <ListItem>
        <ListItemDecorator>
          <EventIcon />
        </ListItemDecorator>
        <Link
          component={RouterLink}
          to='/calendar'
          sx={{
            width: '100%',
            '&:hover': {
              textDecorationLine: 'none',
            },
          }}
        >
          <ListItemButton sx={{ width: '100%' }}>
            Go to Events Calendar
          </ListItemButton>
        </Link>
      </ListItem>
    </List>
  );
}
