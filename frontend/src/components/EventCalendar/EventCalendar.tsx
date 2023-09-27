import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Sheet, Grid, Typography } from '@mui/joy';
import CalendarControl from '../CalendarControl/CalendarControl';
import Day from '../Day/Day';
import { weekDays } from '../../data';
import { getMonthDaysGrid } from '../../utils/calendar';
import { EventType } from '../../types';

type EventCalendarProps = {
  events: EventType[];
  currentDate: Date;
  selectedDate: Date | null;
  onSetDate: (date: Date) => void;
  onSetEvents: (events: EventType[] | null) => void;
};

type EventsByDay = {
  [key: number]: EventType[];
};

export default function EventCalendar({
  events,
  currentDate,
  selectedDate,
  onSetDate,
  onSetEvents,
}: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs(currentDate).month());
  const [daysGrid, setDaysGrid] = useState<Array<Date | null>>([]);
  const [eventsByDay, setEventsByDay] = useState<EventsByDay>({});

  const makeMonthDaysGrid = (date: Date) => {
    const newDaysGrid = getMonthDaysGrid(date);
    setDaysGrid(newDaysGrid);
  };

  const sortEventsByDay = (events: EventType[]) => {
    let eventsByDay: EventsByDay = {};
    events.map((item) => {
      const day = dayjs(item.start).get('date');
      if (!eventsByDay[day]) {
        eventsByDay = {
          ...eventsByDay,
          [day]: [item],
        };
      } else {
        eventsByDay = {
          ...eventsByDay,
          [day]: [...eventsByDay[day], item],
        };
      }
    });
    setEventsByDay(eventsByDay);
  };

  useEffect(() => {
    makeMonthDaysGrid(currentDate);
    sortEventsByDay(events);
  }, [events]);

  const handleChangeMonth = (action: -1 | 1) => {
    const newMonth = currentMonth + action;
    makeMonthDaysGrid(dayjs(dayjs().month(newMonth)).toDate());
    setCurrentMonth(newMonth);
  };

  const handleSelectDate = (date: Date) => {
    onSetDate(date);
  };

  const handleSelectEvents = (events: EventType[] | null) => {
    onSetEvents(events);
  };

  return (
    <Sheet>
      <CalendarControl
        currentMonth={dayjs(dayjs().month(currentMonth)).format('MMMM YYYY')}
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
          <Day
            key={index}
            date={day}
            events={eventsByDay[dayjs(day).get('date')]}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onSelectEvents={handleSelectEvents}
          />
        ))}
      </Grid>
    </Sheet>
  );
}
