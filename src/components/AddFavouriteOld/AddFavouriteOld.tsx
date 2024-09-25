/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, SyntheticEvent, useState } from 'react';

import { IconButton, IconContainer } from '@telegram-apps/telegram-ui';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Icon28HeartFill } from '@/icons/heartFill';
import { Icon28Heart } from '@/icons/heart';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { FavouriteSnackbar } from './components/FavouriteSnackbarOld';

interface IAddFavouriteProps {
  id: number;
  title: string;
  isCard?: boolean;
  withPadding?: boolean;
  iconAdd?: any;
  iconNotAdd?: any;
  added?: boolean;
  onFavourite?: (e: SyntheticEvent, id: number) => void;
}

export const AddFavourite: FC<IAddFavouriteProps> = ({
  id,
  title,
  isCard = false,
  withPadding = false,
  iconAdd = Icon28HeartFill,
  iconNotAdd = Icon28Heart,
  added,
  onFavourite,
}) => {
  const IconAdd = iconAdd;
  const IconNotAdd = iconNotAdd;

  const haptic = useHapticFeedback();

  const [isAdd, setIsAdd] = useState(!!added);
  const [isDeleteSnackbarShown, setIsDeleteSnackbarShown] = useState(false);
  const [isUndoSnackbarShown, setIsUndoSnackbarShown] = useState(false);


  const clickHandler = (e: SyntheticEvent) => {
    haptic.selectionChanged();

    if (!isAdd) {
      setIsDeleteSnackbarShown(false);
      setIsUndoSnackbarShown(true);
    } else {
      setIsUndoSnackbarShown(false);
      setIsDeleteSnackbarShown(true);
    }

    setIsAdd(!isAdd);

    if (onFavourite) onFavourite(e, id);

    e.stopPropagation();
  }

  const undoHandler = (e: SyntheticEvent) => {
    setIsAdd(!isAdd);

    setIsDeleteSnackbarShown(false);
    setIsUndoSnackbarShown(true);
    
    e.stopPropagation();
  }

  return (
    <>
      {isCard ? (
        <CardChip className='card-chip' onClick={clickHandler}>
          <IconContainer>
            {isAdd ? <IconAdd /> : <IconNotAdd />}
          </IconContainer>
        </CardChip>
        ) : (
          <IconButton
            mode="plain"
            size="l"
            onClick={clickHandler}
          >
            {isAdd ? <IconAdd /> : <IconNotAdd />}
          </IconButton>
        )}

      <FavouriteSnackbar
        title={title}
        isDeleteSnackbarShown={isDeleteSnackbarShown}
        isUndoSnackbarShown={isUndoSnackbarShown}
        setIsDeleteSnackbarShown={setIsDeleteSnackbarShown}
        setIsUndoSnackbarShown={setIsUndoSnackbarShown}
        undoHandler={undoHandler}
        withPadding={withPadding}
      />
    </>
  );
};
