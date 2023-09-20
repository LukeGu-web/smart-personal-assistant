import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';
import { getAvatar, cleanToken } from '../../utils/token';

const publicRoutes = [
  '/login',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPublicPage = publicRoutes.includes(location.pathname);
  const name = getAvatar();
  const handleLogout = () => {
    cleanToken();
    navigate('/login');
  };
  return (
    <Box
      component='header'
      sx={{
        position: 'relative',
        zIndex: 999,
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link
        sx={{
          '&:hover': {
            textDecorationLine: 'none',
          },
        }}
        component={RouterLink}
        to='/'
      >
        <Typography
          fontWeight='lg'
          color='neutral'
          startDecorator={
            <Box
              component='span'
              sx={{
                width: 24,
                height: 24,
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                borderRadius: '50%',
                boxShadow: (theme) => theme.shadow.md,
                '--joy-shadowChannel': (theme) =>
                  theme.vars.palette.primary.mainChannel,
              }}
            />
          }
        >
          Smart Assistant
        </Typography>
      </Link>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        {!isPublicPage && (
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
              sx={{ borderRadius: 50, padding: 0 }}
            >
              <Avatar>{name}</Avatar>
            </MenuButton>
            <Menu>
              <MenuItem>
                <Link
                  sx={{
                    '&:hover': {
                      textDecorationLine: 'none',
                    },
                  }}
                  component={RouterLink}
                  to='/profile'
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Dropdown>
        )}
        <ColorSchemeToggle />
      </Box>
    </Box>
  );
}
