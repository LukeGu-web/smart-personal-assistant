import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Sheet, Grid, Typography } from '@mui/joy';
import CalendarControl from '../CalendarControl/CalendarControl';
import Day from '../Day/Day';
import { weekDays } from '../../data';
import { monthString, getMonthDaysGrid } from '../../utils/calendar';
import { EventType } from '../../types';

type EventCalendarProps = {
  events: EventType[];
  currentDate: Date;
  selectedDate: Date | null;
  onSetDate: (date: Date, events: EventType[] | undefined) => void;
};

type EventsByDay = {
  [key: number]: EventType[];
};

export default function EventCalendar({
  events,
  currentDate,
  selectedDate,
  onSetDate,
}: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(monthString(new Date()));
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
  }, [currentDate, events]);

  const handleChangeMonth = (action: -1 | 1) => {
    const tmpDate = currentDate;
    tmpDate.setMonth(tmpDate.getMonth() + action);
    makeMonthDaysGrid(tmpDate);
    setCurrentMonth(monthString(tmpDate));
  };

  const handleSelectDate = (date: Date, events: EventType[] | undefined) => {
    onSetDate(date, events);
  };

  return (
    <Sheet>
      <CalendarControl
        currentMonth={currentMonth}
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
          />
        ))}
      </Grid>
    </Sheet>
  );
}
