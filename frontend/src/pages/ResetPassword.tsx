import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import PageContainer from '../components/PageContainer/PageContainer';
import SignBgImg from '../components/SignBgImg/SignBgImg';
import { toast } from 'react-toastify';
import { updatePasswordByEmail } from '../apis/user';

interface FormElements extends HTMLFormControlsCollection {
  newPassword: HTMLInputElement;
  repeatPassword: HTMLInputElement;
}
interface PasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Decode = {
  email: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const decode = token ? (jwt_decode(token) as Decode) : null;
  const email: string = decode ? decode.email : '';
  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
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
                Reset password
              </Typography>
              <form
                onSubmit={async (
                  event: React.FormEvent<PasswordFormElement>
                ) => {
                  event.preventDefault();
                  if (email === '') {
                    toast.error(
                      'Your token is invaild. Please check your reset passwrod email.'
                    );
                  } else {
                    const formElements = event.currentTarget.elements;
                    if (!isLoading) setIsLoading(true);
                    if (
                      formElements.newPassword.value ===
                      formElements.repeatPassword.value
                    ) {
                      const isSuccess = await updatePasswordByEmail({
                        email: email,
                        password: formElements.newPassword.value,
                      });
                      if (isSuccess) {
                        setIsLoading(false);
                        navigate('/login');
                      }
                    } else {
                      toast.error('Passwords do NOT match');
                      setIsLoading(false);
                    }
                  }
                }}
              >
                <FormControl required>
                  <FormLabel>New password *</FormLabel>
                  <Input
                    type='password'
                    name='newPassword'
                    value={newPass}
                    onChange={(event) => setNewPass(event.target.value)}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Repeat password *</FormLabel>
                  <Input
                    type='password'
                    name='repeatPassword'
                    value={repeatPass}
                    onChange={(event) => setRepeatPass(event.target.value)}
                  />
                </FormControl>
                <Button type='submit' fullWidth loading={isLoading}>
                  Submit
                </Button>
              </form>
              <Link
                component={RouterLink}
                fontSize='sm'
                to='/login'
                fontWeight='lg'
              >
                Login your account
              </Link>
            </Box>
          </Box>
        </Box>
        <SignBgImg />
      </>
    </PageContainer>
  );
}
