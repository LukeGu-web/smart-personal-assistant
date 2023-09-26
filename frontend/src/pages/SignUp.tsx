import Box from '@mui/joy/Box';
import { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { Link as RouterLink } from 'react-router-dom';

import PageContainer from '../components/PageContainer/PageContainer';
import SignBgImg from '../components/SignBgImg/SignBgImg';
import SignUpForm from '../components/SignUpForm/SignUpForm';

export default function SignUp() {
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
              <Typography component='h1' fontSize='xl2' fontWeight='lg'>
                Sign up for Smart assistant
              </Typography>
              <SignUpForm />
              <Link
                component={RouterLink}
                fontSize='sm'
                to='/login'
                fontWeight='lg'
              >
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Box>
        <SignBgImg />
      </>
    </PageContainer>
  );
}
