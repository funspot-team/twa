/* eslint-disable @typescript-eslint/no-explicit-any */
import { Headline } from '@telegram-apps/telegram-ui';
import { FC } from 'react';

interface IHeaderProps {
  title: string;
}

export const Header: FC<IHeaderProps> = ({ title }) => {
  return (
    <Headline
      style={{ padding: '9px 0 3px' }}
      weight="3"
    >
      {title}
    </Headline>
  );
}
