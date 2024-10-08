/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, SyntheticEvent } from 'react';

import { IconButton, IconContainer } from '@telegram-apps/telegram-ui';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Icon28Heart } from '@/icons/heart';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { onChangeFavouriteModal } from '../AddFavouriteModal/model';
import { Icon28Remove } from '@/icons/remove';

interface IAddFavouriteProps {
  id: number;
  title: string;
  topOffset?: string;
  isCard?: boolean;
  added?: boolean;
  onFavourite?: (e: SyntheticEvent, id: number) => void;
}

export const AddFavourite: FC<IAddFavouriteProps> = ({
  id,
  title,
  isCard = false,
  topOffset,
  added,
  onFavourite,
}) => {
  const Icon = added ? Icon28Remove : Icon28Heart;
  const haptic = useHapticFeedback();

  const clickHandler = (e: SyntheticEvent) => {
    haptic.selectionChanged();

    if (added) {
      if (onFavourite) onFavourite(e, id);
    } else {
      onChangeFavouriteModal({ isShow: true, spotId: Number(id), title });
    }

    e.stopPropagation();
  }
  
  return (
    <>
      {isCard ? (
        <CardChip className="card-chip" onClick={clickHandler} style={topOffset ? { top: topOffset } : {}}>
          <IconContainer>
            <Icon />
          </IconContainer>
        </CardChip>
        ) : (
          <IconButton
            mode="plain"
            size="l"
            onClick={clickHandler}
          >
            <Icon />
          </IconButton>
        )}
    </>
  );
};
