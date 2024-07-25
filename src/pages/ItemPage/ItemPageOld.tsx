import { Button, Cell, Divider, Image, InlineButtons, List, Placeholder, Section, Text } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import ImageGallery from 'react-image-gallery';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { Icon28Guard } from '@/icons/guard';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
import { SmallMap } from '@/components/SmallMap/SmallMap';
import { useParams } from 'react-router-dom';
import SPOTS from '../../mocks/catalog.json';

import "react-image-gallery/styles/css/image-gallery.css";
import './ItemPage.css';


export const ItemPageOld: FC = () => {
  const [isShowContact, setIsShowContact] = useState(false);
  const { id } = useParams();
  const item = SPOTS.data.find((spot) => spot.id === Number(id));

  if (!item) return null;

  const { name, mainImg, description, tags, link, address, phone, operating, minPrice, raiting, coords } = item;

  {/* https://github.com/xiaolin/react-image-gallery */}
  return (
      <>  
        <ImageGallery
          items={[{
            original: mainImg,
            thumbnail: mainImg,
          }]}
          showNav
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets
          slideDuration={200}
        />
        
        <AddFavourite id={Number(id)} title={name} isCard withPadding />

        <List>
          <Placeholder
            // description={description}
            header={name}
            >
            <Image size={96} src={mainImg} />
          </Placeholder>

          <InlineButtons mode="plain">
            <InlineButtonsItem text="Оценка">
              <Text weight="1">
                {raiting}
              </Text>
            </InlineButtonsItem>
            <InlineButtonsItem text="Лучшее место">
              <Icon28Guard />
            </InlineButtonsItem>
            {/* <InlineButtonsItem text="В рейтинге">
              <Text weight="1">
                5
              </Text>
            </InlineButtonsItem> */}
          </InlineButtons>

          <Section
            header="Подробнее"
          >
            <Cell
              multiline
              subtitle={description}
            >
              Описание
            </Cell>

            <Cell
              multiline
              subtitle={
                <>
                  {tags.map((tag) => {
                    return <a key={tag} href="/">{`#${tag} `}</a>;
                  })}
                </>
              }
            />

            <Divider />

            <Cell
              multiline
              subtitle={address}
            >
              Адрес
            </Cell>

            <Divider />

            <Cell
              multiline
              subtitle={operating}
            >
              Режим работы
            </Cell>

            <Cell
              multiline
              subtitle={`от ${minPrice} руб.`}
            >
              Стоимость
            </Cell>

            {isShowContact && (
              <>
                <Divider />

                <Cell
                  multiline
                  subtitle={<a href={link} rel="noreferrer" target="_blank">{link}</a>}
                  onClick={() => window.open(link, '_blank')}
                >
                  Сайт
                </Cell>
    
                <Divider />
    
                <Cell
                  multiline
                  subtitle={<a href={`tel:${phone}`}>{phone}</a>}
                  onClick={() => window.open(`tel:${phone}`, '_blank')}
                >
                  Контакты
                </Cell>
              </>
            )}
          </Section>

          {!isShowContact && <Placeholder
            action={<Button onClick={() => setIsShowContact(!isShowContact)} size="s">Контакты</Button>}
          >
          </Placeholder>}
        </List>

        <SmallMap center={coords as L.LatLngExpression} />
      </>
  );
};


          {/* <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center'
          }}>
            <Chip mode="elevated">
              Летнее
            </Chip>
            <Chip mode="elevated">
              Семья
            </Chip>
            <Chip mode="elevated">
              Водные
            </Chip>
          </div> */}
