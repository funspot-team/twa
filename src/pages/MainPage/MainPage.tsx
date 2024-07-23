import { List, Card, Banner, Image, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

import { useNavigate } from 'react-router-dom';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
import ReactImageGallery from 'react-image-gallery';
import { SectionHeader } from '@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader';

import './MainPage.css';

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

const cards = [
  {
    title: 'BBQ Boats',
    img: '/twa/images/bbq-boats.png',
    description: 'Прогулка на лодке со вкусом барбекю'
  },
  {
    title: 'Прокат эндуро и питбайков в СПБ',
    img: '/twa/images/enduro.png',
    description: 'Поможем подобрать тур в зависимости от ваших навыков и пожеланий'
  },
  {
    title: 'Сплав на sup по реке Оредеж',
    img: '/twa/images/sup-board.png',
    description: 'Лучший загородный маршрут для начинающих сёрферов'
  },
];

export const MainPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <ReactImageGallery items={images} showNav={false} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} showBullets={false} slideDuration={200} autoPlay />

      <List>
        <SectionHeader>Вам может понравится</SectionHeader>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', overflowX: 'scroll' }}>
          {cards.map(({ title, img, description }) => {
            return (
              <Card key={title} style={{ minWidth: '254px' }} onClick={() => navigate('/item')}>
                <>
                  <AddFavourite title={title} withPadding />
                  
                  <img
                    alt="Dog"
                    src={img}
                    style={{
                      display: 'block',
                      height: 200,
                      objectFit: 'cover',
                      width: 254
                    }}
                  />

                  <CardCell
                    readOnly
                    subtitle={description}
                  >
                    {title}
                  </CardCell>
                </>
              </Card>
            );
          })}
        </div>

        <Banner
          before={<Image size={48} src='/twa/images/sup-board.png' />}
          header="Сплав на sup по реке Оредеж"
          subheader="Лучший загородный маршрут для начинающих сёрферов"
          type="section"
        >
          <>
            <Button size="s" onClick={() => navigate('/item')}>
              Бронировать
            </Button>

            <Button
              mode="plain"
              size="s"
              onClick={() => navigate('/item')}
            >
              В избранное
            </Button>
          </>
        </Banner>

        <SectionHeader>Популярное</SectionHeader>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'scroll' }}>
          {cards.slice(0).reverse().map(({ title, img, description }) => {
            return (
              <Card key={title} style={{ minWidth: '254px' }} onClick={() => navigate('/item')}>
                <>
                  <AddFavourite title={title} withPadding />
                  
                  <img
                    alt="Dog"
                    src={img}
                    style={{
                      display: 'block',
                      height: 200,
                      objectFit: 'cover',
                      width: 254
                    }}
                  />

                  <CardCell
                    readOnly
                    subtitle={description}
                  >
                    {title}
                  </CardCell>
                </>
              </Card>
            );
          })}
        </div>
      </List>

      <div style={{ height: '100px', backgroundImage: 'url(/twa/images/add-spot.jpeg)', backgroundSize: 'cover' }}></div>

      <div style={{ width: '100%', height: '100px' }}></div>
    </>
  );
};
