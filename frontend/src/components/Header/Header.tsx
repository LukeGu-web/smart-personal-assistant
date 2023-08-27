import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';
export default function Header() {
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
      <Typography
        fontWeight='lg'
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
        Logo
      </Typography>
      <ColorSchemeToggle />
    </Box>
  );
}
