/* eslint-disable @typescript-eslint/no-explicit-any */
import { Caption, Card, Cell, IconContainer, Image, Section } from '@telegram-apps/telegram-ui';
import { SyntheticEvent, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { AddFavourite } from '../AddFavourite/AddFavourite';
import { Icon16Star } from '@/icons/star';
import { onChangeSpotVisible } from '@/pages/ItemPage/model';

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

  // const goToSpot = () => {
  //   navigate('/item/' + spot.id);
  // };
  const goToSpot = () => {
    // navigate('');
    // const newUrl = `${window.location.pathname}?spot=open`;
    // window.history.pushState(null, '', newUrl);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { history } = JSON.parse(sessionStorage.getItem('app-navigation-state')) || {};

    // console.log({ history, index });
    const item = history[history.length - 1];

    navigate(item);
    // const data = {
    //   history: [ ...history, history[history.length - 1] ],
    //   index: index + 1,
    // }
    
    // console.log(data);

    // sessionStorage.setItem('app-navigation-state', JSON.stringify(data));

    onChangeSpotVisible(spot.id);
    // onChangeRestoreScroll(window.scrollY);
  }

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
