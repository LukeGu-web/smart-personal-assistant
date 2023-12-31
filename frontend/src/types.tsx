export type AIMessage = {
  role: string;
  content: string;
};

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

export type TaskProps = {
  id: string;
  userId: string;
  label: string;
  isCompleted: boolean;
  completedDate: Date | null;
};

export type EventType = {
  title: string;
  start: Date | string;
  end: Date | string;
  description?: string;
};

export type EventsByDay = {
  [key: number]: EventType[];
};
