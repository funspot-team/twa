import { type FC, useState } from 'react';

import { IconContainer, Snackbar } from '@telegram-apps/telegram-ui';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Icon28HeartFill } from '@/icons/heartFill';
import { Icon28Heart } from '@/icons/heart';
import { useHapticFeedback } from '@telegram-apps/sdk-react';

interface IAddFavouriteProps {
  title: string;
  withPadding?: boolean;
}

export const AddFavourite: FC<IAddFavouriteProps> = ({ title, withPadding = false}) => {
  const haptic = useHapticFeedback();

  const [isAdd, setIsAdd] = useState(false);
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);

  const addHandler = (e: React.SyntheticEvent) => {
    haptic.selectionChanged();

    setIsAdd(!isAdd);
    setIsShowSnackbar(true);
    e.stopPropagation();
  }

  return (
    <>
      <CardChip className='card-chip' onClick={addHandler}>
        <IconContainer>
          {isAdd ? <Icon28HeartFill /> : <Icon28Heart />}
        </IconContainer>
      </CardChip>
    
      {isShowSnackbar && <Snackbar
        description={title}
        duration={3000}
        onClose={() => setIsShowSnackbar(false)}
        style={{ bottom: withPadding ? '96px' : '25px' }}
      >
        {isAdd ? 'Добавлено в избранное' : 'Удалено из избранного'}
      </Snackbar>}
    </>
  );
};
