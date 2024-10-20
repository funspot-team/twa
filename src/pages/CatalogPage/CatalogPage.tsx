/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FC } from 'react';
import { List } from '@telegram-apps/telegram-ui';
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { Filters } from '@/components/Filters/components/Filters';
import { $childrenFilter, $isViewAsMap, $mainFilters, $priceFilter, $searchFilter, onResetFilters } from '@/components/Filters/model';
import { useUnit } from 'effector-react';
import { LastItem } from '@/components/LastItem/LastItem';
import { getSpotsByFilters } from '@/components/Filters/helpers/filtersHelpers';
import { PageMessage } from '@/components/PageMessage/PageMessage';
import { Map } from '@/components/Map/Map';
import { $catalog, $isLoadingCatalog } from './model';

export const CatalogPage: FC = () => {
  const [disableScroll, setDisableScroll] = useState(true);

  const filters = useUnit($mainFilters);
  const childrenFilter = useUnit($childrenFilter);
  const priceFilter = useUnit($priceFilter);
  const searchFilter = useUnit($searchFilter);
  const rawSpots = useUnit($catalog);
  const isLoadingCatalog = useUnit($isLoadingCatalog);
  const isViewAsMap = useUnit($isViewAsMap);
  const spots = getSpotsByFilters(rawSpots, filters, childrenFilter, priceFilter, searchFilter);

  useEffect(() => {
    setDisableScroll(false);
    
    setTimeout(() => {
      window.scrollTo(0, 0);
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.documentElement.scrollIntoView({ behavior: 'smooth' });
    }, 2000);

    const scrollToTop = () => {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    };
  
    scrollToTop();
  }, []);

  return (
    <>
      <Filters isMap={isViewAsMap} />

      {isLoadingCatalog || disableScroll ? (
        <SpinnerList />
      ) : (
        <>
          {isViewAsMap ? (
            <Map />
          ) : (
            <>
              <List style={{ paddingTop: '74px' }}>
                {!spots.length && (
                  <PageMessage
                    title="Ничего не найдено"
                    description="Попробуйте изменить параметры поиска"
                    actionTitle="Сбросить фильтры"
                    onAction={onResetFilters}
                  />
                )}

                {spots.map((spot: any, i: number) => {
                  return (
                    <CatalogItem
                      key={spot.id}
                      spot={spot}
                      isLarge={(i + 1) % 4 == 0 ? true : false}
                      isCatalog
                    />
                  );
                })}
              </List>

              <LastItem />
            </>
          )}
        </>
      )}
    </>
  );
};