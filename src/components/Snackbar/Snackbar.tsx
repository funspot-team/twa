/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react';
import { Snackbar as SnackbarUI } from '@telegram-apps/telegram-ui';
import { useUnit } from 'effector-react';
import { $snakbar, onChangeSnackbar } from './model';

export const Snackbar: FC = () => {
  const { isShow, title, description, action, withBottom } = useUnit($snakbar);

  return (
    <>
      {isShow && (
        <SnackbarUI
          description={description}
          duration={3000}
          onClose={() => onChangeSnackbar({
            title: '',
            description: '',
            spotId: null,
            isShow: false,
            isDelete: false,
            withBottom: true,
          })}
          style={
            withBottom ? { bottom: '96px', zIndex: 101 } : { zIndex: 101 }
          }
          after={(action && (
            <SnackbarUI.Button onClick={action.fn}>
                {action.name}
            </SnackbarUI.Button>
          ))}
        >
          {title}
        </SnackbarUI>
      )}
    </>
  );
};
