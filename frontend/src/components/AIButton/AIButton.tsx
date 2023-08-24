import Button from '@mui/joy/Button';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

type AIButtonProps = {
  onClick: () => void;
};

export default function AIButton({ onClick }: AIButtonProps) {
  return (
    <Button
      variant='outlined'
      color='success'
      onClick={onClick}
      sx={{
        borderRadius: '50%',
        py: 2,
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
      }}
    >
      <SupportAgentIcon fontSize='large' />
    </Button>
  );
}
