/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react';
import { List } from '@telegram-apps/telegram-ui';
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { useFakeLoading } from '@/hooks/useFakeLoading';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { Filters } from '@/components/Filters/components/Filters';
import { $childrenFilter, $mainFilters, $priceFilter, onResetFilters } from '@/components/Filters/model';
import { useUnit } from 'effector-react';
import { LastItem } from '@/components/LastItem/LastItem';
import { getSpotsByFilters } from '@/components/Filters/helpers/filtersHelpers';
import { PageMessage } from '@/components/PageMessage/PageMessage';
import { $catalog } from '@/components/Layout/model';

export const CatalogPage: FC = () => {
  const filters = useUnit($mainFilters);
  const childrenFilter = useUnit($childrenFilter);
  const priceFilter = useUnit($priceFilter);
  const rawSpots = useUnit($catalog);

  const { loading } = useFakeLoading(100, [filters, childrenFilter, priceFilter]);
  const spots = getSpotsByFilters(rawSpots, filters, childrenFilter, priceFilter);

  return (
    <>
      <Filters />

      {loading ? (
        <SpinnerList height="80" />
      ) : (
        <List>
          {!spots.length && (
            <PageMessage
              title="Ничего не найдено"
              description="Попройбуйте изменить параметры поиска"
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
              />
            );
          })}
        </List>
      )}

      <LastItem />
    </>
  );
};