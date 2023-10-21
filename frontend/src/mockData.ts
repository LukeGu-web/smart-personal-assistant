import { EventType, TaskProps } from './types';

export const mockList: TaskProps[] = [
  {
    userId: 'test',
    id: '0-Buy milk',
    label: 'Buy milk',
    isCompleted: false,
    completedDate: null,
  },
  {
    userId: 'test',
    id: '1-Buy eggs',
    label: 'Buy eggs',
    isCompleted: false,
    completedDate: null,
  },
  {
    userId: 'test',
    id: '2-Walk dog',
    label: 'Walk dog',
    isCompleted: true,
    completedDate: null,
  },
];

export const mockEvents: EventType[] = [
  {
    title: 'event 1',
    start:
      'Wed Nov 08 2023 08:00:00 GMT+1000 (Australian Eastern Standard Time)',
    end: 'Wed Nov 08 2023 08:08:01 GMT+1000 (Australian Eastern Standard Time)',
    description: 'Here is event 1',
  },
  {
    title: 'event 2',
    start:
      'Wed Nov 08 2023 00:00:00 GMT+1000 (Australian Eastern Standard Time)',
    end: 'Fri Nov 10 2023 00:00:00 GMT+1000 (Australian Eastern Standard Time)',
    description: 'Here is event 2',
  },
  {
    title: 'event 3',
    start:
      'Mon Nov 27 2023 00:00:00 GMT+1000 (Australian Eastern Standard Time)',
    end: 'Mon Nov 27 2023 00:00:01 GMT+1000 (Australian Eastern Standard Time)',
    description: 'Here is event 3',
  },
];
