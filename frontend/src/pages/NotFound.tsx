import { Box, Grid, Link, Typography } from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';

import PageContainer from '../components/PageContainer/PageContainer';
import errorImage from '../assets/404.jpg';
import errorDarkImage from '../assets/404dark.jpg';

export default function NotFound() {
  return (
    <PageContainer>
      <Box
        sx={(theme) => ({
          height: 'calc(100vh - 9.25rem)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${errorImage})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: `url(${errorDarkImage})`,
          },
        })}
      >
        <Grid xs={6} paddingBottom={30} width={{ xs: '20rem', md: '25rem' }}>
          <Typography level='h1' fontSize='5rem' color='danger'>
            404
          </Typography>
          <Typography level='h4' sx={{ backdropFilter: 'blur(4px)' }}>
            The page you are looking for doesn’t exist.
          </Typography>
          <Link
            component={RouterLink}
            to='/'
            fontWeight='lg'
            sx={{ backdropFilter: 'blur(4px)' }}
            startDecorator={<ArrowBackIcon />}
          >
            Back Home
          </Link>
        </Grid>
      </Box>
    </PageContainer>
  );
}
