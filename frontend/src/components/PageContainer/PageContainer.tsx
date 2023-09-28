import { ReactElement } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { mergedTheme } from '../../theme';
type PageContainerProps = {
  children: ReactElement;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <CssVarsProvider
      defaultMode='dark'
      disableTransitionOnChange
      theme={mergedTheme}
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
            '--Cover-width': '40vw', // must be `vw` only
            '--Form-maxWidth': '700px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Stack
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          overflow: 'auto',
        })}
      >
        <Header />
        {children}
        <Footer />
      </Stack>
    </CssVarsProvider>
  );
}
