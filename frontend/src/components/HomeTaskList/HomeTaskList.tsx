import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListDivider,
} from '@mui/joy';
import TaskIcon from '@mui/icons-material/Task';
import DoneIcon from '@mui/icons-material/Done';
import { Link as RouterLink } from 'react-router-dom';
import { TaskProps } from '../../types';

export default function HomeTaskList({ tasks }: { tasks: TaskProps[] }) {
  return (
    <List
      aria-labelledby='todo-task-list'
      sx={{ border: '1px solid grey', borderRadius: '6px' }}
    >
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          sx={{
            '#done-icon': {
              display: 'none',
            },
            '&:hover #done-icon': {
              display: 'block',
            },
          }}
          endAction={
            <IconButton
              id='done-icon'
              aria-label='Done'
              size='sm'
              color='success'
            >
              <DoneIcon />
            </IconButton>
          }
        >
          <ListItemButton>{task.label}</ListItemButton>
        </ListItem>
      ))}
      <ListDivider inset='gutter' />
      <ListItem>
        <ListItemDecorator>
          <TaskIcon />
        </ListItemDecorator>
        <Link
          component={RouterLink}
          to='/todo-list'
          sx={{
            width: '100%',
            '&:hover': {
              textDecorationLine: 'none',
            },
          }}
        >
          <ListItemButton sx={{ width: '100%' }}>
            Go to Todo List
          </ListItemButton>
        </Link>
      </ListItem>
    </List>
  );
}
