/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, type FC } from 'react';

import { Snackbar } from '@telegram-apps/telegram-ui';

interface IFavouriteSnackbarProps {
  title: string;
  isDeleteSnackbarShown: boolean;
  isUndoSnackbarShown: boolean;
  setIsDeleteSnackbarShown: (val: boolean) => void;
  setIsUndoSnackbarShown: (val: boolean) => void;
  undoHandler: (e: SyntheticEvent) => void;
  withPadding?: boolean;
}

export const FavouriteSnackbar: FC<IFavouriteSnackbarProps> = ({
  title,
  isDeleteSnackbarShown,
  isUndoSnackbarShown,
  setIsDeleteSnackbarShown,
  setIsUndoSnackbarShown,
  undoHandler,
  withPadding = false,
}) => {
  return (
    <>
      {isDeleteSnackbarShown && title && <Snackbar
        description={title}
        duration={3000}
        onClose={() => setIsDeleteSnackbarShown(false)}
        style={{ bottom: withPadding ? '96px' : '25px' }}
        after={(
          <Snackbar.Button onClick={undoHandler}>
              Отменить
          </Snackbar.Button>
        )}
      >
        Удалено из избранного
      </Snackbar>}

      {isUndoSnackbarShown && title && (
        <Snackbar
          description={title}
          duration={3000}
          onClose={() => setIsUndoSnackbarShown(false)}
          style={{ bottom: withPadding ? '96px' : '25px' }}
        >
          Добавлено в избранное
        </Snackbar>
      )}
    </>
  );
};
