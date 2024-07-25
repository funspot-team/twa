import { Spinner } from '@telegram-apps/telegram-ui';
import { FC } from 'react';

interface ISpinnerListProps {
  height?: string;
}

export const SpinnerList: FC<ISpinnerListProps> = ({
  height = '100'
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: `${height}vh`,
      position: 'absolute',
      zIndex: '10',
      width: '100%',
    }}>
      <Spinner size="l" />
    </div>
  );
};
