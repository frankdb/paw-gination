import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
}

export const List = ({ children }: ListProps) => {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
};
