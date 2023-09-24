import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import DropZone from '../DropZone/DropZone';
import { deleteUserById, updateUserById } from '../../apis/user';
import { cleanToken, getTokenDecode, setToken } from '../../utils/token';
import { BasicUserProps, DecodedToken } from '../../types';

interface FormElements extends HTMLFormControlsCollection {
  firstname: HTMLInputElement;
  lastname: HTMLInputElement;
}

interface ProfileFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Profile() {
  const decode = getTokenDecode() as DecodedToken;
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<BasicUserProps>(decode);

  const handleSave = async (event: React.FormEvent<ProfileFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const updatedData = {
      ...user,
      firstname: formElements.firstname.value,
      lastname: formElements.lastname.value,
    };
    setUser(updatedData);
    const data = await updateUserById({
      ...updatedData,
      id: decode.id,
    });
    if (data.success) {
      setToken(data.token);
      setIsEdit(false);
    }
  };

  const handleDeleteUser = async () => {
    const result = await deleteUserById(decode.id);
    if (result) {
      cleanToken();
      navigate('/login');
    }
  };

  return (
    <Box
      width={{ xs: '90%', md: '100%' }}
      sx={{
        flex: 1,
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <Typography level='h1' fontSize='xl2' sx={{ mb: 1 }}>
        My profile
      </Typography>
      <Box
        component='form'
        onSubmit={(event: React.FormEvent<ProfileFormElement>) =>
          handleSave(event)
        }
        sx={{
          pt: 3,
          pb: 10,
          display: 'grid',
          gridTemplateColumns: {
            xs: '100%',
            sm: 'minmax(120px, 30%) 1fr',
            lg: '280px 1fr minmax(120px, 208px)',
          },
          columnGap: { xs: 2, sm: 3, md: 4 },
          rowGap: { xs: 2, sm: 2.5 },
          '& > hr': {
            gridColumn: '1/-1',
          },
        }}
      >
        <FormLabel sx={{ display: { xs: 'none', sm: 'block' } }}>
          Name
        </FormLabel>
        <Box sx={{ display: { xs: 'contents', sm: 'flex' }, gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel sx={{ display: { sm: 'none' } }}>First name</FormLabel>
            {isEdit ? (
              <Input
                placeholder='first name'
                name='firstname'
                defaultValue={user.firstname}
              />
            ) : (
              <p className='px-3 py-2'>{user.firstname}</p>
            )}
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel sx={{ display: { sm: 'none' } }}>Last name</FormLabel>
            {isEdit ? (
              <Input
                placeholder='last name'
                name='lastname'
                defaultValue={user.lastname}
              />
            ) : (
              <p className='px-3 py-2'>{user.lastname}</p>
            )}
          </FormControl>
        </Box>
        <Divider role='presentation' />
        <FormControl sx={{ display: { sm: 'contents' } }}>
          <FormLabel>Email</FormLabel>
          <p className='px-3 py-2'>{user.email}</p>
        </FormControl>
        <Divider role='presentation' />
        <div>
          <FormLabel>Your photo</FormLabel>
          <FormHelperText>
            This will be displayed on your profile.
          </FormHelperText>
        </div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2.5,
          }}
        >
          <Avatar
            size='lg'
            src='/static/images/avatar/1.jpg'
            sx={{ '--Avatar-size': '64px' }}
          />
          <DropZone />
        </Box>
        <Divider role='presentation' />
        <FormControl sx={{ display: { sm: 'contents' } }}>
          <FormLabel>Role</FormLabel>
          <Input defaultValue='UI Developer' />
        </FormControl>
        <Divider role='presentation' />
        {isEdit ? (
          <Box
            sx={{
              gridColumn: '1/-1',
              justifySelf: 'flex-end',
              display: 'flex',
              gap: 1,
            }}
          >
            <Button
              variant='outlined'
              color='neutral'
              size='md'
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </Button>
            <Button size='md' color='success' type='submit'>
              Save
            </Button>
          </Box>
        ) : (
          <Button
            size='md'
            fullWidth
            sx={{
              gridColumn: '1/-1',
              justifySelf: 'flex-end',
              display: 'flex',
            }}
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        )}
        <Divider role='presentation' />
        <Button
          size='lg'
          color='danger'
          sx={{
            gridColumn: '1/-1',
            justifySelf: 'flex-end',
            display: 'flex',
          }}
          onClick={handleDeleteUser}
        >
          Delete your account
        </Button>
      </Box>
    </Box>
  );
}
