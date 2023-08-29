import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

type TaskCreatorProps = {
  onCreate: (label: string) => void;
};

export default function TaskCreator({ onCreate }: TaskCreatorProps) {
  const [label, setLabel] = useState<string>('');
  const handleChange = (event: { target: { value: string } }) => {
    setLabel(event.target.value);
  };
  const handleSubmit = () => {
    onCreate(label);
    setLabel('');
  };
  return (
    <Input
      sx={{
        position: 'relative',
        borderRadius: 'sm',
        width: '100%',
      }}
      placeholder='New Task'
      startDecorator={<FormatListBulletedIcon />}
      endDecorator={
        <Button onClick={handleSubmit}>
          <AddIcon />
        </Button>
      }
      value={label}
      onChange={handleChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') handleSubmit();
      }}
    />
  );
}
