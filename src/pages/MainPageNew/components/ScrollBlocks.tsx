/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

import { useNavigate } from 'react-router-dom';
import { onChangeMainFilters, onResetFilters } from '@/components/Filters/model';
import { ROUTE_NAMES } from '@/navigation/routes';

interface IScrollBlocksProps {
  items: any;
  multiline?: boolean;
  onClick?: (item: any) => void;
}

export const ScrollBlocks: FC<IScrollBlocksProps> = ({ items, multiline, onClick }) => {
  const navigate = useNavigate();

  const onOpenItem = (item: any) => {
    if (onClick) {
      return onClick(item);
    }

    onResetFilters();
    item.filters.map(onChangeMainFilters);
    navigate(ROUTE_NAMES.CATALOGUE_ROUTE);
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '14px', marginBottom: '14px', overflowX: 'scroll' }}>
        {items.map((item: any) => {
          return (
            <Card
              id={item.id}
              key={item.title}
              onClick={() => onOpenItem(item)}
              style={{
                minWidth: '146px',
              }}
            >            
              <img
                alt="Dog"
                src={item.mainImg}
                style={{
                  display: 'block',
                  height: 100,
                  objectFit: 'cover',
                  width: '146px'
                }}
              />

              <CardCell
                // style={{ minHeight: '78px' }}
                multiline={multiline}
                readOnly
                // description={item.description ? 
                //   <span
                //     style={{
                //       display: '-webkit-box',
                //       WebkitLineClamp: 3,
                //       WebkitBoxOrient: 'vertical',
                //       whiteSpace: 'break-spaces',
                //     }}
                //     dangerouslySetInnerHTML={{ __html: item.description }}
                //   />
                //   : null
                // }
              >
                <span style={{ fontSize: '15px' }}>{item.title}</span>
              </CardCell>
            </Card>
          );
        })}
      </div>
    </>
  );
}
