/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import RECOMMENDED from '@/mocks/recommended.json';
import { PageMessage } from '@/components/PageMessage/PageMessage';
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { useFakeLoading } from '@/hooks/useFakeLoading';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { LastItem } from '@/components/LastItem/LastItem';
import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { $catalog } from '../CatalogPage/model';

export const RecommendedGroupsPage: FC = () => {
  const { id } = useParams();
  
  const spots = useUnit($catalog);

  const recommendedItem = RECOMMENDED.data
    .find((item) => item.id === Number(id));
  const favouritesIds = recommendedItem?.spots || [];

  const favouritesList = spots
    .filter(({ id }) => favouritesIds.includes(Number(id)))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .map((spot) => ({ ...spot, show: true }));

  const { loading } = useFakeLoading(0);
  
  if (loading) return <SpinnerList />;

  return (
    <List>
      {!favouritesList.length && (
        <PageMessage title="Пока пусто" description="Вы ничего не добавили в избранное" />
      )}

      {favouritesList.length > 0 && favouritesList
        .map((spot) => {
          return (
            <CatalogItem
              key={spot.id}
              spot={spot}
            />
          );
        })}
      <LastItem />
    </List>
  );
};
