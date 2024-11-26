/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, IconContainer, List, Section } from '@telegram-apps/telegram-ui';
import { useEffect, useMemo, useState, type FC } from 'react';
import { LastItem } from '@/components/LastItem/LastItem';
import { useUnit } from 'effector-react';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { $catalog } from '../CatalogPage/model';
import { Header } from './components/Header';
import { Ideas } from './components/Ideas';
import { RecommendedBlock } from './components/RecommendedBlock';
import { InfiniteScrollSpots } from './components/InfiniteScrollSpots';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Location } from '@/icons/location';
import { getDataForCatalog } from './helpers/mainPageHelpers';
import { useNavigate } from 'react-router-dom';
import { CategoriesBlock } from './components/CategoriesBlock';
import { ROUTE_NAMES } from '@/navigation/routes';
import { onChangeIsViewAsMap, onResetFilters } from '@/components/Filters/model';
import { onChangeMapLoadLocation } from '@/components/Map/model';
import { BannerSpot } from '@/components/BannerSpot/BannerSpot';
import { $cities, onChangeShowCity } from '@/components/CitySelector/model';
import { $userSettings } from '@/components/Layout/model';
import { $recommended } from '../RecommendedGroupsPage/model';
import { ActionBlock } from './components/ActionBlock/ActionBlock';

import './MainPageNew.css';

export const MainPageNew: FC = () => {
  const navigate = useNavigate();

  const { city } = useUnit($userSettings);
  const cities = useUnit($cities);
  const cityName = (cities.find(({ id }) => id === city) as any)?.link;

  const spots = useUnit($catalog);
  const recommended = useUnit($recommended);

  const [disableScroll, setDisableScroll] = useState(true);

  useEffect(() => {
    setDisableScroll(false);
    
    setTimeout(() => {
      // в хроме работают все способы
      window.scrollTo(0, 0);
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.documentElement.scrollIntoView({ behavior: 'smooth' });
    }, 200);

    const scrollToTop = () => {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    };
  
    scrollToTop();
  }, []);

  const { catalog, map } = useMemo(() => getDataForCatalog(spots), [spots]);

  if (disableScroll) {
    return <SpinnerList />;
  }

  if (!spots || !spots.length) {
    return null;
  }

  const banerSpot = spots.find(({id}) => 13 === Number(id));
  const shortDescription = 'Прокат мотоциклов для всех уровней: от питбайков до кроссовых.';
  // @ts-ignore
  const baner = { ...banerSpot, shortDescription };

  return (
    <List>
      <Section>
        <Cell
          onClick={() => {
            onChangeShowCity(true);
          }}
          before={<IconContainer><Icon28Location /></IconContainer>}
          after={<Icon16ChevronRight />}
        >
          {cityName}
        </Cell>
      </Section>

      <Header title="Каталог" />

      <CategoriesBlock items={[catalog, map]} onClick={({ id }) => {
        const isMap = id === 'map';

        if (isMap) {
          onChangeMapLoadLocation(true);
        }

        onChangeIsViewAsMap(isMap);
        onResetFilters();
        navigate(ROUTE_NAMES.CATALOGUE_ROUTE);
      }} />

      {banerSpot && <BannerSpot spot={baner} />}

      {recommended.length > 1 &&
        <>
          <Header title="Подборки" />

          <RecommendedBlock recommended={recommended} />

          <ActionBlock title="Открыть все подборки" img="/twa/images/collections.webp" onClick={() => {
            navigate(ROUTE_NAMES.IDEAS_RECOMMENDED_LIST_ROUTE);
          }} />
        </>
      }

      <Header title="Идеи" />

      <Ideas />

      <Header title="Популярные места" />

      <InfiniteScrollSpots spots={spots} />

      <LastItem />
    </List>
  );
};