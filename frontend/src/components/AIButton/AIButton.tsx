import Button from '@mui/joy/Button';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

type AIButtonProps = {
  onClick: () => void;
};

export default function AIButton({ onClick }: AIButtonProps) {
  return (
    <Button
      size='sm'
      variant='soft'
      color='success'
      onClick={onClick}
      sx={{
        py: 1.5,
        borderRadius: '50%',
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
      }}
    >
      <SupportAgentIcon sx={{ fontSize: 50 }} />
    </Button>
  );
}
