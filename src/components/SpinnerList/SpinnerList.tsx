import { Spinner } from '@telegram-apps/telegram-ui';
import { FC } from 'react';

export const SpinnerList: FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Spinner size="l" />
    </div>
  );
};
