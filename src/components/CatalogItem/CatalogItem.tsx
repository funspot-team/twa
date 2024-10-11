/* eslint-disable @typescript-eslint/no-explicit-any */
import { Caption, Card, Cell, IconContainer, Image, Section } from '@telegram-apps/telegram-ui';
import { SyntheticEvent, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { AddFavourite } from '../AddFavourite/AddFavourite';
import { Icon16Star } from '@/icons/star';

interface ICatalogItemProps {
  spot: any;
  added?: boolean;
  onFavourite?: (e: SyntheticEvent, id: number) => void;
  isLarge?: boolean;
  isCatalog?: boolean;
}

export const CatalogItem: FC<ICatalogItemProps> = ({
  spot,
  added,
  onFavourite,
  isLarge = false,
  // isCatalog = false,
}) => {
  const navigate = useNavigate();

  const goToSpot = () => {
    navigate(`/item/${spot.id}`);
  };

  return isLarge ? (
    <Card style={{ width: '100%' }} onClick={goToSpot}>
      <>
        <AddFavourite id={spot.id} title={spot.name} isCard added={added} onFavourite={onFavourite} />

        <img
          src={spot.mainImg}
          style={{
            display: 'block',
            height: 200,
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
        after={<AddFavourite id={spot.id} title={spot.name} added={added} onFavourite={onFavourite} />}
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
        onClick={goToSpot}
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
