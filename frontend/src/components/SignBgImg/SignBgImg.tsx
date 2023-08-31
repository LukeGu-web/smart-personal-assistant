import Box from '@mui/joy/Box';
export default function SignBgImg() {
  return (
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
  );
}
