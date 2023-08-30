import { ReactElement, useState } from 'react';
import { Close } from '@mui/icons-material';
import {
  Modal,
  ModalDialog,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/joy';

type EventProps = {
  color?: string;
  i: number;
  content: ReactElement;
  title?: string;
};

export default function Event({ color, i, content, title }: EventProps) {
  const [showDialog, setShowDialog] = useState(false);
  console.log(color);
  return (
    <Grid
    // item xs={12} sm={6} md={4} lg={3}
    >
      <Tooltip title={title}>
        <Typography
          //   variant='caption'
          component='div'
          //   onClick={() =>
          //     context?.showEventPopup ? setShowDialog((prev) => !prev) : null
          //   }
          sx={{
            marginY: '0.1rem',
            // backgroundColor: color ?? theme.palette.primary.main,
            // color: theme.palette.getContrastText(
            //   color ?? theme.palette.primary.main
            // ),
            // cursor: context?.showEventPopup ? 'pointer' : 'transparent',
            borderRadius: '5px',
          }}
        >
          {i + 1}
        </Typography>
      </Tooltip>
      <Modal open={showDialog} onClose={() => setShowDialog((prev) => !prev)}>
        <ModalDialog>
          <IconButton
            //   edge='start'
            //   onClick={() => setShowDialog((prev) => !prev)}
            aria-label='close'
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} component='h6'>
            {title}
          </Typography>

          <Divider />
          {content}
        </ModalDialog>
      </Modal>
    </Grid>
  );
}
