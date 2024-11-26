/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Cell, Chip, Divider, IconContainer, Image, InlineButtons, List, Section, Subheadline, Title } from '@telegram-apps/telegram-ui';
import { IconStar } from '@telegram-apps/telegram-ui/dist/components/Form/Rating/icons/star';
import { useEffect, type FC } from 'react';
import ImageGallery from 'react-image-gallery';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { SpotSmallMap } from '@/components/SpotSmallMap/SpotSmallMap';
import { onChangeSpotVisible } from '@/pages/ItemPage/model';
import { Icon28Link } from '@/icons/link';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Location } from '@/icons/location';
import { Icon28Navi } from '@/icons/navi';
import { getWeekRange } from './helpers/itemPageHelpers';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { onChangeSnackbar } from '@/components/Snackbar/model';
import { decodeHtmlEntities } from '@/helpers/helpers';
import { initUtils, useLaunchParams, useMainButton } from '@telegram-apps/sdk-react';
import { SpotDescription } from '@/components/Spot/components/SpotDescription';
import { LastItem } from '@/components/LastItem/LastItem';
import { SpotFullMap } from '@/components/SpotFullMap/SpotFullMap';

import "react-image-gallery/styles/css/image-gallery.css";
import './ItemPage.css';

interface IItemPageProps {
  spot: any;
  isShowMap: boolean;
  onShowMap: (val: boolean) => void;
}

export const ItemPage: FC<IItemPageProps> = ({ spot, isShowMap, onShowMap }) => {
  const { platform } = useLaunchParams();
  const utils = initUtils();
  const mainButton = useMainButton();

  const isIos = platform === 'ios';

  const { id, name, mainImg, description, tags, address, schedule, minPrice, coords, parking, minAge, link, phone, raiting, images, youtube } = spot;
  const scheduleArr = schedule ? getWeekRange(schedule) : [];

  const phoneClick = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ym(97751698,'reachGoal','btn-click-phone');
    // utils.openLink(`tel:${phone}`);
    window.open(`tel:${phone}`, '_blank');
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ym(97751698,'reachGoal', `page-open-spot-${id}`);

    mainButton.setParams({
      text: "Позвонить",
      isEnabled: true,
      isVisible: true,
    })
    .on('click', phoneClick);

    return () => {
      mainButton.off('click', phoneClick);
      mainButton.hide();
    }
  }, []);


  {/* https://github.com/xiaolin/react-image-gallery */}
  return (
      !isShowMap ? (
        <div className="spot-page">
          <div style={{ position: 'relative' }}>
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

            <Button
              mode="filled"
              size="s"
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
              }}
              onClick={() => {
                onChangeSpotVisible(null);
              }}
            >
              Закрыть
            </Button>
            {/* <IconButton
              mode="plain"
              size="s"
              onClick={() => onChangeSpotVisible(null)}
              style={{ position: 'absolute', left: '8px', top: '8px' }}
            >
              <Icon28Close style={{ color: 'var(--tgui--plain_foreground)' }} />
            </IconButton> */}
            
            <AddFavourite id={Number(id)} title={name} isCard isSpotPage />
          </div>

          <Cell
            after={
              <Button
                size="s"
                onClick={() => {
                  // @ts-ignore
                  ym(97751698,'reachGoal','btn-click-go-to-group');
                  utils.openTelegramLink('https://t.me/+INJJi1d5O8QzOGVi');
                }}
              >
                В группу
              </Button>
            }
            before={<Image size={40} src="/twa/images/shpargalki-spb.jpeg" />}
            description="Спот добавлен партнером"
          >
            Шпаргалки Петербурга
          </Cell>

          <Divider />
          <Divider />

          <List>
            <div style={{
              padding: !isIos ? '4px 18px 4px' : '',
            }}>
              <div style={{ marginBottom: '24px' }}>
                <Title
                  level="2"
                  weight="1"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}
                >
                  {decodeHtmlEntities(name)}

                  <Subheadline
                    level="2"
                    weight="1"
                    style={{ display: 'flex', alignItems: 'end', minWidth: '70px' }}
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

              <InlineButtons mode="bezeled">
                {/* {phone && (
                  <InlineButtonsItem
                    text="Позвонить"
                    onClick={() => {
                      // @ts-ignore
                      ym(97751698,'reachGoal','btn-click-phone');
                      window.open(`tel:${phone}`, '_blank');
                    }}
                  >
                    <IconContainer>
                      <Icon28Chat />
                    </IconContainer>
                  </InlineButtonsItem>
                )} */}

                <InlineButtonsItem
                  text="Открыть сайт"
                  onClick={() => {
                    // @ts-ignore
                    ym(97751698,'reachGoal','btn-click-site');
                    window.open(link, '_blank');
                  }}
                >
                  <IconContainer>
                    <Icon28Link />
                  </IconContainer>
                </InlineButtonsItem>

                <ShareButton spotId={id} title={name} />
              </InlineButtons>
            </div>

            {/* {id === '55' && (
              <Section header="Предложение для друзей">
                <Cell
                  subtitle="Специальное предложение для гостей бара Сайгон, сет настоек со скидкой 20%! Просто покажите бармену этот код и не мерзнете осенью!"
                  // after={<Icon16ChevronRight />}
                  multiline
                  // onClick={}
                  before={
                    <IconContainer>
                      <Icon28Smile />
                    </IconContainer>
                  }
                >
                  <div className="blur-element">
                    ТЕПЛАЯОСЕНЬ24
                  </div>
                  <Spoiler>
                    ТЕПЛАЯОСЕНЬ24
                  </Spoiler>
                </Cell>
              </Section>
            )} */}

            <Section header="Адрес">
              <Cell
                multiline
                subtitle={address}
                after={<Icon16ChevronRight />}
                onClick={() => {
                  // @ts-ignore
                  ym(97751698,'reachGoal','btn-click-address');

                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(address).then(function() {
                      onChangeSnackbar({
                        isShow: true,
                        title: 'Адрес скопирован в буфер обмена',
                        description: '',
                        spotId: null,
                        isDelete: false,
                      });
                    });
                  }
                }}
                before={
                  <IconContainer>
                    <Icon28Location />
                  </IconContainer>
                }
              />

              <Cell
                subtitle="Построить маршрут"
                after={<Icon16ChevronRight />}
                onClick={() => {
                  // @ts-ignore
                  ym(97751698,'reachGoal','btn-click-navi');
                  window.open(`yandexnavi://build_route_on_map?lat_to=${coords[0]}&lon_to=${coords[1]}`, '_blank');
                }}
                before={
                  <IconContainer>
                    <Icon28Navi />
                  </IconContainer>
                }
              />
            </Section>

            <SpotDescription description={description} youtube={youtube} />

            <Section
              header="Дополнительно"
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

              {Number(minAge) < 18 && (
                <>
                  <Cell>
                    Можно с детьми
                  </Cell>
                </>
              )}

              {parking && (
                <>
                  <Cell>
                    Есть парковка
                  </Cell>
                </>
              )}
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

            <SpotSmallMap
              center={coords as L.LatLngExpression}
              onClick={() => onShowMap(true)}
            />

            <LastItem />
          </List>
        </div>
      ) : (
        <SpotFullMap center={coords} onClick={() => onShowMap(false)} />
      )
  );
};