export interface BasicUserProps {
  email: string;
  firstname: string;
  lastname: string;
}

export interface DecodedToken extends BasicUserProps {
  id: string;
  exp: number;
  iat: number;
}

export type MessageProps = {
  id: string;
  content: string;
  timestamp: string;
  unread?: boolean;
  sender: 'AI' | 'You';
  attachment?: {
    fileName: string;
    type: string;
    size: string;
  };
};

// export type ChatProps = {
//   id: string;
//   sender: UserProps;
//   messages: MessageProps[];
// };

export type TaskProps = {
  id: string;
  label: string;
  isCompleted: boolean;
  completedDate: Date | null;
};
