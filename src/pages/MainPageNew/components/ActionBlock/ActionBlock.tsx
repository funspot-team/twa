/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Banner } from '@telegram-apps/telegram-ui';
import { FC } from 'react';

import './ActionBlock.css';

interface IActionBlockProps {
  title: string;
  img: string;
  onClick?: () => void;
}

export const ActionBlock: FC<IActionBlockProps> = ({ title, img, onClick }) => {
  return (
    <Banner
      header={
        <div style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}>
          <div>{title}</div>

          <Icon16ChevronRight style={{ marginTop: '2px' }} />
        </div>
      }
      type="section"
      className="action-block"
      style={{
        backgroundImage: `url(${img})`,
      }}
      onClick={onClick}
    />
  );
}
