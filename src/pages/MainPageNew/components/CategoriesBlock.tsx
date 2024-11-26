/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Card } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { onChangeMainFilters } from '@/components/Filters/model';

interface ICategoriesBlockProps {
  items: any;
  onClick?: (item: any) => void;
}

export const CategoriesBlock: FC<ICategoriesBlockProps> = ({ items, onClick }) => {
  const onOpenCategory = (item: any) => {
    if (onClick) {
      return onClick(item);
    }

    item.filters.map(onChangeMainFilters);
  }

  return (
    <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
      {items.map((item: any) => {
        return (
          <Card
            id={item.id}
            key={item.title}
            onClick={() => onOpenCategory(item)}
            style={{ width: 'calc(50vw - 16px - (14px / 2))' }}
          >            
            <img
              alt="Dog"
              src={item.mainImg}
              style={{
                display: 'block',
                height: 120,
                objectFit: 'cover',
                width: 'calc(50vw - 16px - (14px / 2))',
                ...item.style
              }}
            />

            {item.badge && <Badge
              type="number"
              large
              style={{ position: 'absolute', bottom: 75, right: 12, zIndex: 1 }}
            >
              {item.badge}
            </Badge>}

            <CardCell
              readOnly
              description={
                <span
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'break-spaces',
                  }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              }
            >
              {item.title}
            </CardCell>
          </Card>
        );
      })}
    </div>
  );
}
