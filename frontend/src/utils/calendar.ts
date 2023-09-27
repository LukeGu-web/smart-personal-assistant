import dayjs from 'dayjs';
import { months } from '../data';
import { EventType, EventsByDay } from '../types';

export const monthString = (date: Date) =>
  `${months[date.getMonth()]} ${date.getFullYear()}`;

export const getMonthDaysGrid = (date: Date) => {
  const newDaysGrid = [];
  const days = dayjs(date).daysInMonth();
  const curYear = dayjs(date).year();
  const curMonth = dayjs(date).month() + 1;
  const firstDayOfWeek = dayjs(`${curYear}-${curMonth}-01`).day();
  const lastDayOfWeek = dayjs(`${curYear}-${curMonth}-${days}`).day();
  for (let n = 0; n < firstDayOfWeek; n++) {
    newDaysGrid.push(null);
  }
  for (let i = 1; i <= days; i++) {
    newDaysGrid.push(dayjs(`${curYear}-${curMonth}-${i}`).toDate());
  }
  if (lastDayOfWeek < 6) {
    for (let j = 6 - lastDayOfWeek; j > 0; j--) {
      newDaysGrid.push(null);
    }
  }
  return newDaysGrid;
};

export const getEventsByDay = (events: EventType[]) => {
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
  return eventsByDay;
};
