import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
import { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { Link as RouterLink } from 'react-router-dom';

import PageContainer from '../components/PageContainer/PageContainer';
// import GoogleIcon from '../assets/GoogleIcon';
import SignBgImg from '../components/SignBgImg/SignBgImg';
import LoginForm from '../components/LoginForm/LoginForm';

export default function Login() {
  return (
    <PageContainer>
      <>
        <Box
          sx={{
            width:
              'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
            minHeight: 'calc(100vh - 9.25rem)',
            transition: 'width var(--Transition-duration)',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            position: 'relative',
            zIndex: 1,
            padding: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width:
                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
              maxWidth: '100%',
              px: 2,
            }}
          >
            <Box
              component='main'
              sx={{
                my: 'auto',
                py: 2,
                pb: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 400,
                maxWidth: '100%',
                mx: 'auto',
                borderRadius: 'sm',
                '& form': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: 'hidden',
                },
              }}
            >
              <div>
                <Typography component='h1' fontSize='xl2' fontWeight='lg'>
                  Sign in to your account
                </Typography>
                <Typography level='body-sm' sx={{ my: 1, mb: 3 }}>
                  Welcome back
                </Typography>
              </div>
              <LoginForm />
              {/* <Button
                variant='outlined'
                color='neutral'
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Sign in with Google
              </Button> */}
              <Link
                component={RouterLink}
                fontSize='sm'
                to='/sign-up'
                fontWeight='lg'
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
        <SignBgImg />
      </>
    </PageContainer>
  );
}
