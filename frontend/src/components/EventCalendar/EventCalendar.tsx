import { useState, useEffect } from 'react';
import { Sheet, Grid, Typography } from '@mui/joy';
import CalendarControl from '../CalendarControl/CalendarControl';
import Day from '../Day/Day';
import { weekDays } from '../../data';
import { monthString, getMonthDaysGrid } from '../../utils/calendar';

type EventCalendarProps = {
  selectedDate: Date | null;
  onSetDate: (date: Date) => void;
};

export default function EventCalendar({
  selectedDate,
  onSetDate,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(monthString(new Date()));
  const [daysGrid, setDaysGrid] = useState<Array<Date | null>>([]);

  const makeMonthDaysGrid = (date: Date) => {
    const newDaysGrid = getMonthDaysGrid(date);
    setDaysGrid(newDaysGrid);
  };

  useEffect(() => {
    makeMonthDaysGrid(currentDate);
  });

  const handleChangeMonth = (action: -1 | 1) => {
    const tmpDate = currentDate;
    tmpDate.setMonth(tmpDate.getMonth() + action);
    makeMonthDaysGrid(tmpDate);
    setCurrentDate(tmpDate);
    setCurrentMonth(monthString(tmpDate));
  };

  const handleSelectDate = (date: Date) => {
    console.log(date);
    onSetDate(date);
  };

  // const handleCreateEvent = () => {
  //   // console.log(date);
  //   setOpenModal(true);
  // };

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
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        ))}
      </Grid>
    </Sheet>
  );
}
