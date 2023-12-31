import { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import PageContainer from '../components/PageContainer/PageContainer';
import TaskCreator from '../components/TaskCreator/TaskCreator';
import TaskList from '../components/TaskList/TaskList';

import { getTokenDecode } from '../utils/token';
import { TaskProps, DecodedToken } from '../types';
import { mockList } from '../mockData';

export default function TodoList() {
  const [taskList, setTaskList] = useState<TaskProps[]>(mockList);
  const decode = getTokenDecode() as DecodedToken;
  const handleTaskCreate = (label: string) => {
    const newList = taskList;
    newList.push({
      userId: decode.id,
      id: `${newList.length}-${label}`,
      label: label,
      isCompleted: false,
      completedDate: null,
    });
    setTaskList([...newList]);
  };
  const handleComplete = (id: string) => {
    const newList = taskList.map((item) =>
      item.id === id
        ? { ...item, isCompleted: true, completedDate: new Date() }
        : item
    );
    setTaskList([...newList]);
  };
  const handleDelete = (id: string) => {
    const newList = taskList.filter((item) => item.id !== id);
    setTaskList([...newList]);
  };
  const handleEdit = (id: string, label: string) => {
    const newList = taskList.map((item) =>
      item.id === id ? { ...item, label } : item
    );
    setTaskList([...newList]);
  };
  const handleRestore = (id: string) => {
    const newList = taskList.map((item) =>
      item.id === id
        ? { ...item, isCompleted: false, completedDate: new Date() }
        : item
    );
    setTaskList([...newList]);
  };
  return (
    <PageContainer>
      <Box
        sx={{
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          minHeight: 'calc(100vh - 9.25rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          margin: '0 auto',
          padding: 1,
          backdropFilter: 'blur(4px)',
          overflow: 'auto',
        }}
      >
        <Typography component='h1' fontSize='xl2' fontWeight='lg'>
          To-do List
        </Typography>
        <TaskCreator onCreate={handleTaskCreate} />
        <TaskList
          taskList={taskList}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onRestore={handleRestore}
        />
      </Box>
    </PageContainer>
  );
}
