import { Button, IconButton, IconContainer, Text } from '@telegram-apps/telegram-ui';
import { Icon28Close } from '@telegram-apps/telegram-ui/dist/icons/28/close';
import { type FC } from 'react';

interface IModalHeaderProps {
  title: string;
  titleAction?: string;
  onAction?: () => void;
  onClose?: () => void;
}

export const ModalHeader: FC<IModalHeaderProps> = ({
  title,
  titleAction,
  onClose,
  onAction,
}) => {
  
  return (
    <div style={{
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      gap: '12px',
      justifyContent: 'space-between',
      padding: '16px',
      position: 'relative',
      height: '60px',
    }}>
      <div style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
          flex: '1 0 0'
        }}
      >
        {onAction && <Button
          mode="plain"
          size="s"
          onClick={onAction}
        >
          {titleAction}
        </Button>}
      </div>

      <Text weight='2'>{title}</Text>
      
      <div
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          display: 'flex',
          flex: '1 0 0'
        }}
      >
        {onClose && <IconButton
          mode="plain"
          size="s"
          onClick={onClose}
        >
          <IconContainer>
            <Icon28Close />
          </IconContainer>
        </IconButton>}
      </div>
    </div>
  );
};
