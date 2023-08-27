import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import PageContainer from '../components/PageContainer/PageContainer';
import GoogleIcon from '../assets/GoogleIcon';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
export default function Login() {
  return (
    <PageContainer>
      <>
        <Box
          sx={{
            width:
              'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
            height: 'calc(100vh - 9.25rem)',
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
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    email: formElements.email.value,
                    password: formElements.password.value,
                    persistent: formElements.persistent.checked,
                  };
                  alert(JSON.stringify(data, null, 2));
                }}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' name='email' />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type='password' name='password' />
                </FormControl>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    size='sm'
                    label='Remember for 30 days'
                    name='persistent'
                  />
                  <Link
                    fontSize='sm'
                    href='#replace-with-a-link'
                    fontWeight='lg'
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <Button type='submit' fullWidth>
                  Sign in
                </Button>
              </form>
              <Button
                variant='outlined'
                color='neutral'
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: '100%',
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
            transition:
              'background-image var(--Transition-duration), left var(--Transition-duration) !important',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            backgroundColor: 'background.level1',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
            [theme.getColorSchemeSelector('dark')]: {
              backgroundImage:
                'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
            },
          })}
        />
      </>
    </PageContainer>
  );
}
