import { Button, List, Placeholder } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';

interface IPageMessageProps {
  title?: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
}

export const PageMessage: FC<IPageMessageProps> = ({
  title,
  description,
  actionTitle,
  onAction,
}) => {
  return (
    <List
      style={{
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Placeholder
        description={description || ''}
        header={title || ''}
        action={actionTitle &&
          <Button
            size="s"
            onClick={onAction}
          >
            {actionTitle}
          </Button>
        }
      >
        <img
          alt="Telegram sticker"
          src="/twa/images/cxyduck.gif"
          style={{
            display: 'block',
            height: '150px',
          }}
        />
      </Placeholder>
    </List>
  );
};
