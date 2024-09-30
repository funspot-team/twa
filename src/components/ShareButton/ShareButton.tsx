import { Icon28Share } from '@/icons/share';
import { IconContainer } from '@telegram-apps/telegram-ui';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { type FC } from 'react';
import { onChangeSnackbar } from '../Snackbar/model';

interface IShareButtonProps {
  spotId: string;
}

export const ShareButton: FC<IShareButtonProps> = ({ spotId }) => {
  const onShare = () => {
    if (navigator.clipboard) {
      const link = `https://t.me/fun_spot_official_bot/app?startapp=spotId_${spotId}`;

      navigator.clipboard.writeText(link).then(function() {
        onChangeSnackbar({
          isShow: true,
          title: 'Ссылка скопирована в буфер обмена',
          description: '',
          spotId: null,
          isDelete: false,
        });
      });
    }
  }

  return (
    <>
      <InlineButtonsItem
        text="Поделиться"
        onClick={onShare}
      >
        <IconContainer>
          <Icon28Share />
        </IconContainer>
      </InlineButtonsItem>
    </>
  );
};
