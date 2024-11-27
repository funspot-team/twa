/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, SyntheticEvent, useState } from 'react';
import { IconButton, IconContainer } from '@telegram-apps/telegram-ui';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Icon28Heart } from '@/icons/heart';
import { useHapticFeedback } from '@telegram-apps/sdk-react';
import { $commonGroup } from '@/pages/FavoriteGroupsPage/model';
import { useUnit } from 'effector-react';
import { $addedSpotsDict, addFavourite, deleteFavourite } from '@/pages/FavouritesPage/model';
import { Icon28HeartFill } from '@/icons/heartFill';
import { onChangeSnackbar } from '../Snackbar/model';
import { Icon28Remove } from '@/icons/remove';
import { onChangeFavouriteModal } from '../AddFavouriteModal/model';
import { $userData } from '../Layout/model';

interface IAddFavouriteProps {
  id: number;
  title: string;
  isCard?: boolean;
  withRemove?: boolean;
  isSpotPage?: boolean;
}

export const AddFavourite: FC<IAddFavouriteProps> = ({
  id,
  title,
  isCard = false,
  withRemove = false,
  isSpotPage = false,
}) => {
  const haptic = useHapticFeedback();

  // clicked нужен чтобы моментально менять состояние
  const [clicked, setClicked] = useState<boolean | null>(null);

  const { id: userId, username } = useUnit($userData);
  const commonGroup = useUnit($commonGroup);
  const addedSpotsDict = useUnit($addedSpotsDict);
  // @ts-ignore
  const added = addedSpotsDict[`${id}`];
  const IconRemove = withRemove ? Icon28Remove : Icon28HeartFill;
  let Icon;

  if (withRemove) {
    // избранное
    Icon = Icon28Remove;
  } else if (clicked !== null) {
    Icon = clicked ? IconRemove : Icon28Heart;
  } else {
    Icon = added ? IconRemove : Icon28Heart;
  }

  const clickHandler = (e: SyntheticEvent) => {
    haptic.selectionChanged();

    if ((clicked !== null && clicked) || added) {
      // @ts-ignore
      deleteFavourite({ spot: id, group: Number(commonGroup.id) });

      onChangeSnackbar({
        isShow: true,
        title,
        description: 'Удалено из избранного',
        spotId: id,
        isDelete: true,
        withBottom: !isSpotPage,
      });

      setClicked(false);
    } else {
      // @ts-ignore
      addFavourite({ spot: id, group: Number(commonGroup.id) });

      // @ts-ignore
      ym(97751698,'reachGoal','btn-click-favourite', { spotName: title, spotId: id, userId, username, date: new Date() });

      onChangeSnackbar({
        isShow: true,
        title,
        description: 'Добавлено в избранное',
        spotId: id,
        isDelete: false,
        action: {
          name: "Добавить в подборку",
          fn: () => onChangeFavouriteModal({ isShow: true, spotId: Number(id), title }),
        },
        withBottom: !isSpotPage,
      });

      setClicked(true);
    }

    e.stopPropagation();
  }
  
  return (
    <>
      {isCard ? (
        <CardChip className="card-chip" onClick={clickHandler}>
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
