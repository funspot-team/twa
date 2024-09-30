/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react';
import { Snackbar as SnackbarUI } from '@telegram-apps/telegram-ui';
import { useUnit } from 'effector-react';
import { $snakbar, onChangeSnackbar } from './model';

export const Snackbar: FC = () => {
  const { isShow, title, description, isDelete } = useUnit($snakbar);

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
          })}
          style={{ bottom: '96px' }}
          after={(isDelete && (
            // <Snackbar.Button onClick={undoHandler}>
            //     Отменить
            // </Snackbar.Button>
            null
          ))}
        >
          {title}
        </SnackbarUI>
      )}
    </>
  );
};
