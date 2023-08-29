import { useState } from 'react';
import { Sheet } from '@mui/joy';
import CalendarControl from '../CalendarControl/CalendarControl';
import { months } from '../../data';

// type EventCalendarProps = {
//   readonly?: boolean;
//   pallet?: Pallet;
//   elevation?: number;
//   width?: number | string;
//   dataSource: EventsData;
//   onDataChange?: (events: EventsData) => void;
//   showEventPopup?: boolean;
//   defaultDate?: Date | Moment;
// };

const monthString = (date: Date) =>
  `${months[date.getMonth()]} ${date.getFullYear()}`;

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(monthString(new Date()));
  const handleChangeMonth = (action: -1 | 1) => {
    const tmpDate = currentDate;
    tmpDate.setMonth(tmpDate.getMonth() + action);
    console.log(tmpDate);
    setCurrentDate(tmpDate);
    setCurrentMonth(monthString(tmpDate));
  };
  console.log(currentDate);
  return (
    <Sheet>
      <CalendarControl
        currentMonth={currentMonth}
        changeMonth={handleChangeMonth}
      />
      {/* <Grid container>
            {daysGrid?.map((item, i) =>
              item?.no ? (
                <Day
                  daysGridLength={daysGrid.length}
                  i={i}
                  item={item}
                  key={i}
                  events={data?.filter((d) => item.date.isSame(d?.date, 'day'))}
                />
              ) : (
                <ExtraDays daysGridLength={daysGrid.length} i={i} key={i} />
              )
            )}
          </Grid> */}
    </Sheet>
  );
}
