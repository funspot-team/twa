/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, type FC } from 'react';
import { Snackbar } from '@telegram-apps/telegram-ui';

interface IFavouriteSnackbarProps {
  title: string;
  isShowSnackbar: boolean;
  onChangeFavouriteSnackbar: any;
  isDelete: boolean;
  undoHandler?: (e: SyntheticEvent) => void;
  withPadding?: boolean;
}

export const FavouriteSnackbar: FC<IFavouriteSnackbarProps> = ({
  title,
  isShowSnackbar,
  isDelete,
  onChangeFavouriteSnackbar,
  // undoHandler,
  withPadding = true,
}) => {
  const description = !isDelete ? 'Добавлено в подборку' : 'Удалено из подборки';

  return (
    <>
      {isShowSnackbar && (
        <Snackbar
          description={description}
          duration={3000}
          onClose={() => onChangeFavouriteSnackbar({
            title: '',
            spotId: null,
            isShow: false,
          })}
          style={{ bottom: withPadding ? '96px' : '25px' }}
          after={(isDelete && (
            // <Snackbar.Button onClick={undoHandler}>
            //     Отменить
            // </Snackbar.Button>
            null
          ))}
        >
          {title}
        </Snackbar>
      )}
    </>
  );
};
