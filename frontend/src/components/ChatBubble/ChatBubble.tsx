import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { MessageProps } from '../../types';

type ChatBubbleProps = MessageProps & {
  variant: 'sent' | 'received';
};

export default function ChatBubble({
  content,
  variant,
  timestamp,
  attachment = undefined,
  sender,
}: ChatBubbleProps) {
  const isSent = variant === 'sent';
  return (
    <Box maxWidth='80%' minWidth={attachment ? '80%' : 'auto'}>
      <Stack
        direction='row'
        justifyContent='space-between'
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level='body-xs'>{sender}</Typography>
        <Typography level='body-xs'>{timestamp}</Typography>
      </Stack>
      {attachment ? (
        <Sheet
          variant='outlined'
          sx={{
            px: 1.75,
            py: 1.25,
            borderRadius: 'lg',
            borderTopRightRadius: isSent ? 0 : 'lg',
            borderTopLeftRadius: isSent ? 'lg' : 0,
          }}
        >
          <Stack direction='row' spacing={1.5} alignItems='center'>
            <div>
              <Typography fontSize='sm'>{attachment.fileName}</Typography>
              <Typography level='body-sm'>{attachment.size}</Typography>
            </div>
          </Stack>
        </Sheet>
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Sheet
            color={isSent ? 'primary' : 'neutral'}
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              px: 1.25,
              py: 1.25,
              textAlign: 'start',
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
            }}
          >
            {content}
          </Sheet>
        </Box>
      )}
    </Box>
  );
}
