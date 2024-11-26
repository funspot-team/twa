/* eslint-disable @typescript-eslint/no-explicit-any */
import { Caption, Card, Cell, IconContainer, Image, Section } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { AddFavourite } from '../AddFavourite/AddFavourite';
import { Icon16Star } from '@/icons/star';
import { useOpenSpot } from '@/hooks/useOpenSpot';

interface ICatalogItemProps {
  spot: any;
  isLarge?: boolean;
  withRemove?: boolean;
}

export const CatalogItem: FC<ICatalogItemProps> = ({
  spot,
  isLarge = false,
  withRemove,
}) => {
  const { openSpot } = useOpenSpot();

  return isLarge ? (
    <Card style={{ width: '100%' }} onClick={() => openSpot(spot.id)}>
      <>
        <AddFavourite id={spot.id} title={spot.name} isCard withRemove={withRemove} />

        <img
          src={spot.mainImg}
          style={{
            display: 'block',
            height: 170,
            objectFit: 'cover',
            width: '100%'
          }}
          loading="lazy"
        />

        <CardCell
          readOnly
          description={
            <span
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'break-spaces',
              }}
              dangerouslySetInnerHTML={{ __html: spot.shortDescription }}
            />
          }
          subtitle={
            <div style={{ display: 'flex' }}>
              <IconContainer>
                <Icon16Star/>
              </IconContainer>
  
              <Caption weight='1' style={{ color: 'var(--tgui--link_color'}}>
                {` ${spot.raiting}`}
              </Caption>
            </div>
          }
        >
          {spot.name}
        </CardCell>
      </>
    </Card>
  ) : (
    <Section>
      <Cell
        after={<AddFavourite id={spot.id} title={spot.name} withRemove={withRemove} />}
        before={<Image size={96} src={spot.mainImg} loading="lazy" />}
        subtitle={
          <div style={{ display: 'flex' }}>
            <IconContainer>
              <Icon16Star/>
            </IconContainer>

            <Caption weight='1' style={{ color: 'var(--tgui--link_color'}}>
              {` ${spot.raiting}`}
            </Caption>
          </div>
        }
        style={{ minHeight: '124px '}}
        onClick={() => openSpot(spot.id)}
        description={
          <span
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'break-spaces',
            }}
            dangerouslySetInnerHTML={{ __html: spot.shortDescription }}
          />
        }
      >
        {spot.name}
      </Cell>
    </Section>
  );
};
