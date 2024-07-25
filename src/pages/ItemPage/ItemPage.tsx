import { Cell, Chip, Divider, IconContainer, InlineButtons, List, Section, Subheadline, Title } from '@telegram-apps/telegram-ui';
import { IconStar } from '@telegram-apps/telegram-ui/dist/components/Form/Rating/icons/star';
import { type FC } from 'react';
import ImageGallery from 'react-image-gallery';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
import { SmallMap } from '@/components/SmallMap/SmallMap';
import { useParams } from 'react-router-dom';
import SPOTS from '../../mocks/catalog.json';

import { Icon28Chat } from '@/icons/chat';
import { Icon28Link } from '@/icons/link';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Location } from '@/icons/location';

import "react-image-gallery/styles/css/image-gallery.css";
import './ItemPage.css';

const nameOfdayWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const ItemPage: FC = () => {
  const { id } = useParams();
  const item = SPOTS.data.find((spot) => spot.id === Number(id));

  if (!item) return null;

  const { name, mainImg, description, tags, address, schedule, minPrice, coords, parking, minAge, link, phone, raiting } = item;
  const scheduleArr = schedule
    .split(';')
    .map((scheduleDay: string) => {
      return scheduleDay.split('/').join('-');
    });
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

        <List style={{
            background: 'var(--tg-theme-secondary-bg-color, white)'
          }}
        >
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

          <Subheadline
            level="1"
            weight="3"
            style={{
              marginBottom: '24px',
              color: 'var(--tgui--section_header_text_color)',
            }}
          >
            {`от ${minPrice} ₽`}
          </Subheadline>

          <InlineButtons mode="bezeled">
            <InlineButtonsItem
              text="Связаться со спотом"
              onClick={() => window.open(`tel:${phone}`, '_blank')}
            >
              <IconContainer>
                <Icon28Chat />
              </IconContainer>
            </InlineButtonsItem>

            <InlineButtonsItem
              text="Перейти на сайт"
              onClick={() => window.open(link, '_blank')}
            >
              <IconContainer>
                <Icon28Link />
              </IconContainer>
            </InlineButtonsItem>
          </InlineButtons>

          <Section>
            <Cell
              multiline
              subtitle={address}
              after={<Icon16ChevronRight />}
              onClick={() => () => window.open(`yandexnavi://build_route_on_map?lat_to=${coords[0]}&lon_to=${coords[1]}`, '_blank')}
              before={
                <IconContainer>
                  <Icon28Location />
                </IconContainer>
              }
            />
          </Section>

          <Section
            header="Описание"
          >
            <Cell
              multiline
              subtitle={description}
            />
          </Section>

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
                  {tags.map((tag) => {
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

          <Section
            header="Режим работы"
            style={{ marginBottom: '20px' }}
          >
            {scheduleArr.map((day, i) => {
              return (
                <Cell
                  key={`${day}-${i}`}
                  subtitle={day}
                >
                  {nameOfdayWeek[i]}
                </Cell>
              );
            })}
          </Section>
        </List>

        <SmallMap center={coords as L.LatLngExpression} />
      </>
  );
};