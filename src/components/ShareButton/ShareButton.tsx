/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Icon28Share } from '@/icons/share';
import { IconContainer } from '@telegram-apps/telegram-ui';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { type FC } from 'react';
import { onChangeSnackbar } from '../Snackbar/model';

interface IShareButtonProps {
  spotId: string;
  title: string;
}

export const ShareButton: FC<IShareButtonProps> = ({ spotId, title }) => {
  const shareData = {
    text: `Нашел отличное место - ${title}. Посмотри в telegram приложении Funspot!`,
    url: `https://t.me/fun_spot_official_bot/app?startapp=spotId_${spotId}`,
  };


  const onShare = async () => {
    // @ts-ignore
    ym(97751698,'reachGoal','btn-click-share');

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Ошибка при попытке поделиться ссылкой:', err);
      }
    } else {
      // Если Web Share API не поддерживается, копируем ссылку
      copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
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