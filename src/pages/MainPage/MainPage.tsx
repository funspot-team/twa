/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, Card } from '@telegram-apps/telegram-ui';
import { useRef, type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

import { useNavigate } from 'react-router-dom';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
import ReactImageGallery from 'react-image-gallery';
import { SectionHeader } from '@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader';
import { LastItem } from '@/components/LastItem/LastItem';
import { BannerSpot } from '@/components/BannerSpot/BannerSpot';
import { $catalog, $isLoadingCatalog } from '@/components/Layout/model';
import { useUnit } from 'effector-react';
import { ROUTE_NAMES } from '@/navigation/routes';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';

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
        {spots.map(({ id, name, mainImg, description }: any) => {
          return (
            <Card key={name} style={{ minWidth: '254px' }} onClick={() => navigate('/item/' + id)}>
              <>
                <AddFavourite id={id} title={name} isCard withPadding />
                
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
                  subtitle={<span dangerouslySetInnerHTML={{ __html: description }} />}
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

const images = [
  {
    original: '/twa/images/catalogue0.png',
    thumbnail: '/twa/images/catalogue0.png',
  },
  {
    original: '/twa/images/catalogue1.png',
    thumbnail: '/twa/images/catalogue1.png',
  },
  {
    original: '/twa/images/catalogue2.png',
    thumbnail: '/twa/images/catalogue2.png',
  },
];

export const MainPage: FC = () => {
  const imageGalleryRef = useRef(null);
  const navigate = useNavigate();
  const spots = useUnit($catalog);
  const isLoading = useUnit($isLoadingCatalog);

  if (isLoading) {
    return <SpinnerList />;
  }

  if (!spots || !spots.length) {
    return null;
  }

  const recomended = spots
    .filter(({id}) => [21, 22, 13].includes(Number(id)))
    .slice(0).reverse();
  const popular = spots.filter(({id}) => [19, 12, 15, 26, 27].includes(Number(id)));
  const eco = spots.filter(({id}) => [24, 25, 29, 31, 30].includes(Number(id)));
  const baner = spots.find(({id}) => 20 === Number(id));

  const clickHandler = () => {
    // @ts-ignore
    const currentSlide = imageGalleryRef.current.getCurrentIndex();

    switch(currentSlide) {
      case 1:
        navigate(ROUTE_NAMES.CATALOGUE_ROUTE);
        break;
      case 2:
        navigate(ROUTE_NAMES.MAP_ROUTE);
        break;
      default:
        return null;
    }
  }

  return (
    <>
      <ReactImageGallery
        ref={imageGalleryRef}
        items={images}
        showNav={false}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={false}
        slideDuration={500}
        slideInterval={4000}
        autoPlay
        onClick={clickHandler}
      />

      <List>
        <SpotsBlock title="Вам понравится" spots={recomended} />

        <BannerSpot spot={baner} />

        <SpotsBlock title="Популярное" spots={popular} />

        <SpotsBlock title="Экотропы" spots={eco} />
      </List>

      <div style={{
        height: '100px',
        backgroundImage: 'url(/twa/images/add-spot.jpeg)',
        backgroundSize: 'contain',
        padding: '20px 0',
        backgroundPosition: 'center',
        backgroundColor: '#C9E3FF',
        backgroundRepeat: 'no-repeat',
      }}/>

      <LastItem />
    </>
  );
};
