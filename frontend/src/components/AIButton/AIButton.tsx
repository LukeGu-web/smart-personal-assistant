import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

type AIButtonProps = {
  onClick: () => void;
};

export default function AIButton({ onClick }: AIButtonProps) {
  return (
    <Tooltip title='AI Assistant'>
      <Button
        size='sm'
        variant='soft'
        color='success'
        onClick={onClick}
        sx={{
          py: 1.5,
          borderRadius: '50%',
          position: 'fixed',
          bottom: '0',
          right: '0',
        }}
      >
        <SupportAgentIcon sx={{ fontSize: 50 }} />
      </Button>
    </Tooltip>
  );
}
