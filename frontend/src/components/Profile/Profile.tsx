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

export default function Profile() {
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
        sx={{
          '--_shadow-height': '16px',
          height: 0,
          position: 'sticky',
          top: 'calc(48px - var(--main-paddingTop, 0px) + var(--Header-height, 0px) - (var(--_shadow-height) / 2))',
          zIndex: 1,
        }}
      />
      <Box
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
            <Input placeholder='first name' defaultValue='Siriwat' />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel sx={{ display: { sm: 'none' } }}>Last name</FormLabel>
            <Input placeholder='last name' defaultValue='K.' />
          </FormControl>
        </Box>
        <Divider role='presentation' />
        <FormControl sx={{ display: { sm: 'contents' } }}>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            startDecorator={<i data-feather='mail' />}
            placeholder='email'
            defaultValue='siriwatk@test.com'
          />
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
        <Box
          sx={{
            gridColumn: '1/-1',
            justifySelf: 'flex-end',
            display: 'flex',
            gap: 1,
          }}
        >
          <Button variant='outlined' color='neutral' size='sm'>
            Cancel
          </Button>
          <Button size='sm'>Save</Button>
        </Box>
      </Box>
    </Box>
  );
}
