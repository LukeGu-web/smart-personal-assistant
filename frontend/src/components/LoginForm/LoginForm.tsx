import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../apis/user';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        if (!isLoading) setIsLoading(true);
        const isSuccess = await login({
          email: formElements.email.value,
          password: formElements.password.value,
        });
        if (isSuccess) {
          navigate('/');
          setIsLoading(false);
        }
      }}
    >
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input type='email' name='email' autoComplete='username' />
      </FormControl>
      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          name='password'
          autoComplete='current-password'
        />
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          component={RouterLink}
          fontSize='sm'
          to='/forgot-password'
          fontWeight='lg'
        >
          Forgot your password?
        </Link>
      </Box>
      <Button type='submit' fullWidth loading={isLoading}>
        Sign in
      </Button>
    </form>
  );
}
