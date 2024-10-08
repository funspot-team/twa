/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Cell, Image, Section } from '@telegram-apps/telegram-ui';
import { SyntheticEvent, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { AddFavourite } from '../AddFavourite/AddFavourite';

interface ICatalogItemProps {
  spot: any;
  added?: boolean;
  onFavourite?: (e: SyntheticEvent, id: number) => void;
  isLarge?: boolean;
}

export const CatalogItem: FC<ICatalogItemProps> = ({
  spot,
  added,
  onFavourite,
  isLarge = false,
}) => {
  const navigate = useNavigate();

  return isLarge ? (
    <Card style={{ width: '100%' }} onClick={() => navigate('/item/' + spot.id)}>
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
          subtitle={
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
        </CardCell>
      </>
    </Card>
  ) : (
    <Section>
      <Cell
        after={<AddFavourite id={spot.id} title={spot.name} added={added} onFavourite={onFavourite} />}
        before={<Image size={96} src={spot.mainImg} loading="lazy" />}
        subtitle={`Оценка: ${spot.raiting}`}
        style={{ minHeight: '124px '}}
        onClick={() => {
          navigate('/item/' + spot.id);
        }}
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
