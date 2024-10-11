/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, Card, Button } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

import { useNavigate } from 'react-router-dom';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
// import ReactImageGallery from 'react-image-gallery';
import { SectionHeader } from '@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader';
import { LastItem } from '@/components/LastItem/LastItem';
import { BannerSpot } from '@/components/BannerSpot/BannerSpot';
import { useUnit } from 'effector-react';
import { ROUTE_NAMES } from '@/navigation/routes';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import RECOMMENDED from '@/mocks/recommended.json';
import { GroupsBlock } from './components/GroupsBlock';
import { onChangeIsViewAsMap } from '@/components/Filters/model';
import { $catalog, $isLoadingCatalog } from '../CatalogPage/model';
import { BannerContest } from '@/components/BannerContest/BannerContest';

import './MainPage.css';

interface ISpotsBlockProps {
  title: string;
  spots: any;
}

const SpotsBlock: FC<ISpotsBlockProps> = ({ title, spots }) => {
  const navigate = useNavigate();

  return (
    <>
      <SectionHeader>{title}</SectionHeader>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', overflowX: 'scroll' }}>
        {spots.map(({ id, name, mainImg, shortDescription }: any) => {
          return (
            <Card key={name} style={{ minWidth: '254px' }} onClick={() => navigate('/item/' + id)}>
              <>
                <AddFavourite id={id} title={name} isCard />
                
                <img
                  alt="Dog"
                  src={mainImg}
                  style={{
                    display: 'block',
                    height: 200,
                    objectFit: 'cover',
                    width: 254
                  }}
                />

                <CardCell
                  readOnly
                  subtitle={<span dangerouslySetInnerHTML={{ __html: shortDescription }} />}
                >
                  {name}
                </CardCell>
              </>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export const MainPage: FC = () => {
  const navigate = useNavigate();
  const spots = useUnit($catalog);
  const isLoading = useUnit($isLoadingCatalog);

  const [disableScroll, setDisableScroll] = useState(true);

  useEffect(() => {
    setDisableScroll(false);
  }, []);

  if (isLoading || disableScroll) {
    return <SpinnerList />;
  }

  if (!spots || !spots.length) {
    return null;
  }

  const youLiked = spots
    .filter(({id}) => [14, 18, 55, 56, 59, 85, 268, 276, 305, 309].includes(Number(id)))
    .slice(0).reverse();
  const popular = spots.filter(({id}) => [26, 54, 78, 115, 124, 129, 209, 273, 308, 312].includes(Number(id)));
  const baner = spots.find(({id}) => 34 === Number(id));

  return (
    <>
      <div style={{
        // height: '210px',
        backgroundImage: 'url(/twa/images/catalogue.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom -30px right 0px',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        aspectRatio: '16 / 9',
      }}>
        <Button
          mode="white"
          size="s"
          style={{ position: 'absolute', bottom: '7%', opacity: 0.85 }}
          onClick={() => {
            onChangeIsViewAsMap(false);
            navigate(ROUTE_NAMES.CATALOGUE_ROUTE);
          }}
        >
          Открыть каталог
        </Button>
      </div>

      <List>
        <GroupsBlock title="Наши подборки" groups={RECOMMENDED.data} />
      </List>

      <div style={{
        height: '150px',
        backgroundImage: 'url(/twa/images/main-map.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16px',
        margin: '0 18px',
      }}>
        <Button
          mode="filled"
          size="s"
          style={{ marginTop: '10px' }}
          onClick={() => {
            onChangeIsViewAsMap(true);
            navigate(ROUTE_NAMES.CATALOGUE_ROUTE);
          }}
        >
          Искать на карте
        </Button>
      </div>

      <List>
        <BannerContest />

        <SpotsBlock title="Вам понравится" spots={youLiked} />

        <BannerSpot spot={baner} />

        <SpotsBlock title="Популярное" spots={popular} />
      </List>

      {/* <div style={{
        height: '100px',
        backgroundImage: 'url(/twa/images/add-spot.jpeg)',
        backgroundSize: 'contain',
        padding: '20px 0',
        backgroundPosition: 'center',
        backgroundColor: '#C9E3FF',
        backgroundRepeat: 'no-repeat',
      }}/> */}

      <LastItem />
    </>
  );
};
