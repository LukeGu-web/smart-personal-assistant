import Box from '@mui/joy/Box';

import MyProfile from '../components/Profile/Profile';
import PageContainer from '../components/PageContainer/PageContainer';

export default function Profile() {
  return (
    <PageContainer>
      <Box
        sx={{
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          minHeight: 'calc(100vh - 9.25rem)',
          margin: '0 auto',
          overflow: 'auto',
        }}
      >
        <MyProfile />
      </Box>
    </PageContainer>
  );
}
