import { useState, Fragment } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

import { TaskProps } from '../../types';

type CompletedButtonGroupProps = {
  editMode: boolean;
  onRestore: () => void;
};

function CompletedButtonGroup({
  editMode,
  onRestore,
}: CompletedButtonGroupProps) {
  if (editMode)
    return (
      <Button color='danger' onClick={onRestore}>
        Restore
      </Button>
    );
}
type TodoButtonGroupProps = {
  editMode: boolean;
  isEditing: boolean;
  isDisableOthers: boolean;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
};

function TodoButtonGroup({
  editMode,
  isEditing,
  isDisableOthers,
  onComplete,
  onEdit,
  onDelete,
  onSave,
}: TodoButtonGroupProps) {
  const editStyle = {
    marginRight: '0.5rem',
    backgroundColor: isDisableOthers && isEditing ? '#1F7A1F' : '#f0eb00',
    color: isDisableOthers && isEditing ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: isDisableOthers && isEditing ? '#136C13' : '#e1dc0d',
    },
  };
  if (!editMode)
    return (
      <Button color='success' onClick={onComplete}>
        Done
      </Button>
    );
  return (
    <Box>
      <Button
        sx={editStyle}
        disabled={isDisableOthers && !isEditing}
        onClick={isDisableOthers && isEditing ? onSave : onEdit}
      >
        {isDisableOthers && isEditing ? 'save' : '✎'}
      </Button>
      <Button color='danger' onClick={onDelete} disabled={isDisableOthers}>
        ✘
      </Button>
    </Box>
  );
}

type TaskListProps = {
  taskList: TaskProps[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, label: string) => void;
  onRestore: (id: string) => void;
};

export default function TaskList({
  taskList,
  onComplete,
  onDelete,
  onEdit,
  onRestore,
}: TaskListProps) {
  const [editMode, setEditMode] = useState(false);
  const [completedList, setCompletedList] = useState(false);
  const [editItemId, setEditItemId] = useState<null | string>(null);
  const [changeItemLabel, setChangeItemLabel] = useState<string>('');
  let itemsinCompletedList = 0;

  const handleClickEditItem = (id: string, label: string) => {
    setEditItemId(id);
    setChangeItemLabel(label);
  };

  const handleSaveEditItem = () => {
    onEdit(editItemId as string, changeItemLabel);
    setEditItemId(null);
    setChangeItemLabel('');
  };

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' paddingBottom={2}>
        <ButtonGroup aria-label='neutral button group' disabled={editMode}>
          <Button
            variant={!completedList ? 'solid' : 'soft'}
            onClick={() => setCompletedList(false)}
          >
            To do
          </Button>
          <Button
            variant={completedList ? 'solid' : 'soft'}
            onClick={() => setCompletedList(true)}
          >
            Completed
          </Button>
        </ButtonGroup>
        <Button
          disabled={editItemId !== null}
          color={editMode ? 'success' : 'primary'}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode
            ? 'Save'
            : `Edit ${completedList ? 'completed' : 'to-do'} list`}
        </Button>
      </Stack>
      <List
        aria-label='task-list'
        variant='outlined'
        sx={{
          minWidth: 240,
          borderRadius: 'sm',
        }}
      >
        {taskList.map((item) => {
          if (item.isCompleted) itemsinCompletedList++;
          const isEditing = editItemId === item.id;
          return (
            item.isCompleted === completedList && (
              <Fragment key={item.id}>
                <ListItem
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {isEditing ? (
                    <Input
                      value={changeItemLabel}
                      onChange={(event) =>
                        setChangeItemLabel(event.target.value)
                      }
                    />
                  ) : (
                    <p className='py-2'>{item.label}</p>
                  )}
                  {completedList ? (
                    <CompletedButtonGroup
                      editMode={editMode}
                      onRestore={() => onRestore(item.id)}
                    />
                  ) : (
                    <TodoButtonGroup
                      editMode={editMode}
                      isDisableOthers={editItemId !== null}
                      isEditing={isEditing}
                      onComplete={() => onComplete(item.id)}
                      onDelete={() => onDelete(item.id)}
                      onEdit={() => handleClickEditItem(item.id, item.label)}
                      onSave={() => handleSaveEditItem()}
                    />
                  )}
                </ListItem>
                <ListDivider inset='gutter' className='list-divider' />
              </Fragment>
            )
          );
        })}
        {completedList
          ? itemsinCompletedList === 0 && (
              <p className='text-center'>You haven't completed any task.</p>
            )
          : (taskList.length === 0 ||
              taskList.length === itemsinCompletedList) && (
              <p className='text-center'>You haven't any task need to do.</p>
            )}
      </List>
    </Box>
  );
}
