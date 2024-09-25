import { Icon28Share } from '@/icons/share';
import { IconContainer, Snackbar } from '@telegram-apps/telegram-ui';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { useState, type FC } from 'react';

interface IShareButtonProps {
  spotId: string;
}

export const ShareButton: FC<IShareButtonProps> = ({ spotId }) => {
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);

  const onShare = () => {
    if (navigator.clipboard) {
      const link = `https://t.me/fun_spot_official_bot/app?startapp=spotId_${spotId}`;

      navigator.clipboard.writeText(link).then(function() {
        setIsSnackbarShown(true);
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

      {isSnackbarShown && (
        <Snackbar
          duration={3000}
          onClose={() => setIsSnackbarShown(false)}
          style={{ bottom: '96px' }}
        >
          Ссылка скопирована в буфер обмена
        </Snackbar>
      )}
    </>
  );
};
