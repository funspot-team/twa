/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Chip, Divider, IconContainer, InlineButtons, List, Section, Snackbar, Subheadline, Title } from '@telegram-apps/telegram-ui';
import { IconStar } from '@telegram-apps/telegram-ui/dist/components/Form/Rating/icons/star';
import { useState, type FC } from 'react';
import ImageGallery from 'react-image-gallery';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
import { SpotSmallMap } from '@/components/SpotSmallMap/SpotSmallMap';
import { useParams } from 'react-router-dom';
import { useFakeLoading } from '@/hooks/useFakeLoading';

import { Icon28Chat } from '@/icons/chat';
import { Icon28Link } from '@/icons/link';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Location } from '@/icons/location';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { Icon28Navi } from '@/icons/navi';
import { getWeekRange } from './helpers/itemPageHelpers';
import { useUnit } from 'effector-react';
import { $catalog } from '@/components/Layout/model';

import "react-image-gallery/styles/css/image-gallery.css";
import './ItemPage.css';

export const ItemPage: FC = () => {
  const spots = useUnit($catalog);

  const { loading } = useFakeLoading(0);
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);

  const { id } = useParams();
  const item = spots.find((spot: any) => spot.id === id);

  if (!item) return null;

  const { name, mainImg, description, tags, address, schedule, minPrice, coords, parking, minAge, link, phone, raiting, images, youtube } = item as any;
  const scheduleArr = schedule ? getWeekRange(schedule) : [];

  if (loading) {
    return <SpinnerList />;
  }

  {/* https://github.com/xiaolin/react-image-gallery */}
  return (
      <div className="spot-page">  
        <ImageGallery
          items={[{
              original: mainImg,
              thumbnail: mainImg,
            },
            ...images.map((img: string) => ({ original: img, thumbnail: img })),
          ]}
          showNav
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets
          slideDuration={200}
        />
        
        <AddFavourite id={Number(id)} title={name} isCard withPadding />

        <List style={{
            background: 'var(--tg-theme-secondary-bg-color, white)'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <Title
              level="2"
              weight="1"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}
            >
              {name}

              <Subheadline
                level="2"
                weight="1"
                style={{ display: 'flex', alignItems: 'end', minWidth: '68px' }}
              >
                <IconContainer>
                  {raiting} <IconStar style={{ marginBottom: '-5px' }} />
                </IconContainer>
              </Subheadline>
            </Title>

            {minPrice && <Subheadline
              level="1"
              weight="3"
              style={{
                color: 'var(--tgui--section_header_text_color)',
              }}
            >
              {`от ${minPrice} ₽`}
            </Subheadline>}
          </div>

          {phone ? (
            <InlineButtons mode="bezeled">
              <InlineButtonsItem
                text="Связаться"
                onClick={() => window.open(`tel:${phone}`, '_blank')}
              >
                <IconContainer>
                  <Icon28Chat />
                </IconContainer>
              </InlineButtonsItem>

              <InlineButtonsItem
                text="Сайт"
                onClick={() => window.open(link, '_blank')}
              >
                <IconContainer>
                  <Icon28Link />
                </IconContainer>
              </InlineButtonsItem>

              <InlineButtonsItem
                text="Маршрут"
                onClick={() => window.open(`yandexnavi://build_route_on_map?lat_to=${coords[0]}&lon_to=${coords[1]}`, '_blank')}
              >
                <IconContainer>
                  <Icon28Navi />
                </IconContainer>
              </InlineButtonsItem>
            </InlineButtons>
          ) : (
            <InlineButtons mode="bezeled">
              <InlineButtonsItem
                text="Перейти на сайт"
                onClick={() => window.open(link, '_blank')}
              >
                <IconContainer>
                  <Icon28Link />
                </IconContainer>
              </InlineButtonsItem>

              <InlineButtonsItem
                text="Маршрут"
                onClick={() => window.open(`yandexnavi://build_route_on_map?lat_to=${coords[0]}&lon_to=${coords[1]}`, '_blank')}
              >
                <IconContainer>
                  <Icon28Navi />
                </IconContainer>
              </InlineButtonsItem>
            </InlineButtons>
          )}

          <Section>
            <Cell
              multiline
              subtitle={address}
              after={<Icon16ChevronRight />}
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(address).then(function() {
                    setIsSnackbarShown(true);
                  });
                }
              }}
              before={
                <IconContainer>
                  <Icon28Location />
                </IconContainer>
              }
            />
          </Section>

          {youtube ? (
            <Section header="Описание">
              <Cell
                after={<Icon16ChevronRight />}
                subtitle="Открыть обзор"
                onClick={() => window.open(youtube, '_blank')}
              >
                Youtube
              </Cell>

              <Divider />

              <Cell
                multiline
                subtitle={description}
              />
            </Section>
          ) : (
            <Section header="Описание">
              <Cell
                multiline
                subtitle={description}
              />
            </Section>
          )}

          <Section
            header="Детали"
          >
            <Cell
              multiline
              subtitle={
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}>
                  {tags.map((tag: string) => {
                    return (
                      <Chip
                        key={tag}
                        mode="mono"
                      >
                        {tag}
                      </Chip>
                    );
                  })}
                </div>
              }
            />

            <Divider />

            <Cell
              multiline
              subtitle={minAge < 18 ? 'Да' : 'Нет'}
            >
              С детьми
            </Cell>

            <Divider />

            <Cell
              multiline
              subtitle={parking ? 'Да' : 'Нет'}
            >
              Парковка
            </Cell>
          </Section>
          
          {scheduleArr.length > 0 && <Section
            header="Режим работы"
          >
            {scheduleArr.length > 1 ? scheduleArr.map((range) => {
              return (
                <Cell
                  key={`${range[0]}`}
                  subtitle={range[1]}
                >
                  {range[0]}
                </Cell>
              );
            }) : (
              <Cell subtitle={scheduleArr[0][1]}>{scheduleArr[0][0]}</Cell>
            )}
          </Section>}

          <div style={{ marginBottom: '20px' }}></div>
        </List>

        <SpotSmallMap center={coords as L.LatLngExpression} />

        {isSnackbarShown && (
          <Snackbar
            duration={3000}
            onClose={() => setIsSnackbarShown(false)}
            style={{ bottom: '96px' }}
          >
            Адрес скопирован в буфер обмена
          </Snackbar>
        )}
      </div>
  );
};

// {
//   "id": 10,
//   "link": "",
//   "name": "",
//   "pets": false,
//   "tags": ["aктивное", "вождение", "экстрим", "за городом"],
//   "phone": "",
//   "coords": [],
//   "images": [],
//   "minAge": 7,
//   "address": "",
//   "mainImg": "/twa/images/-1.png",
//   "parking": false,
//   "raiting": 5.0,
//   "youtube": "",
//   "minPrice": 2500,
//   "schedule": "10:00/21:00;10:00/21:00;10:00/21:00;10:00/21:00;10:00/21:00;10:00/21:00;10:00/21:00",
//   "description": ""
// }