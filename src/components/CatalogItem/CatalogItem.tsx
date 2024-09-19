/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Cell, Image, Section } from '@telegram-apps/telegram-ui';
import { SyntheticEvent, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AddFavourite } from '../AddFavourite/AddFavourite';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { AddFavouriteNew } from '../AddFavouriteNew/AddFavouriteNew';

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
        {/* <AddFavourite id={spot.id} title={spot.name} isCard withPadding iconAdd={iconAdd} iconNotAdd={iconNotAdd} added={added} onFavourite={onFavourite} /> */}
        <AddFavouriteNew id={spot.id} title={spot.name} isCard withPadding added={added} onFavourite={onFavourite} />

        <img
          alt="Dog"
          src={spot.mainImg}
          style={{
            display: 'block',
            height: 200,
            objectFit: 'cover',
            width: '100%'
          }}
        />

        <CardCell
          readOnly
          subtitle={spot.description}
        >
          {spot.name}
        </CardCell>
      </>
    </Card>
  ) : (
    <Section>
      <Cell
        // after={<AddFavourite id={spot.id} title={spot.name} withPadding iconAdd={iconAdd} iconNotAdd={iconNotAdd} added={added} onFavourite={onFavourite} />}
        after={<AddFavouriteNew id={spot.id} title={spot.name} isCard withPadding added={added} onFavourite={onFavourite} />}
        before={<Image size={96} src={spot.mainImg} />}
        description={spot.description}
        subtitle={`Оценка: ${spot.raiting}`}
        style={{ minHeight: '124px '}}
        onClick={() => {
          navigate('/item/' + spot.id);
        }}
      >
        {spot.name}
      </Cell>
    </Section>
  );
};
