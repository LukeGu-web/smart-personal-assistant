import { useState, FormEvent } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import PageContainer from '../components/PageContainer/PageContainer';
import SignBgImg from '../components/SignBgImg/SignBgImg';
import { resetPasswordByemail } from '../apis/user';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
                Forgot password
              </Typography>
              <form
                onSubmit={async (event: FormEvent<SignUpFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  if (!isLoading) setIsLoading(true);
                  const isSuccess = await resetPasswordByemail({
                    email: formElements.email.value,
                  });
                  if (isSuccess) {
                    navigate('/login');
                    setIsLoading(false);
                  }
                }}
              >
                <Typography component='h2'>
                  Lost your password? Please enter your email address. You will
                  receive a link to create a new password via email.
                </Typography>
                <FormControl required>
                  <FormLabel>Email *</FormLabel>
                  <Input type='email' name='email' />
                </FormControl>
                <Button type='submit' fullWidth loading={isLoading}>
                  Reset password
                </Button>
              </form>
              <Link
                component={RouterLink}
                fontSize='sm'
                to='/login'
                fontWeight='lg'
              >
                Remember your password and login
              </Link>
            </Box>
          </Box>
        </Box>
        <SignBgImg />
      </>
    </PageContainer>
  );
}
