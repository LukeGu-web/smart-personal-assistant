import Avatar, { AvatarProps } from '@mui/joy/Avatar';

type AvatarWithStatusProps = AvatarProps & {
  online?: boolean;
};

export default function AvatarWithStatus({ ...rest }: AvatarWithStatusProps) {
  return (
    <Avatar
      {...rest}
      src='https://cdn-icons-png.flaticon.com/512/10528/10528179.png'
    />
  );
}
