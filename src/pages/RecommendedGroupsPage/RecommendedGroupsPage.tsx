/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, List } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { PageMessage } from '@/components/PageMessage/PageMessage';
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { useFakeLoading } from '@/hooks/useFakeLoading';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { LastItem } from '@/components/LastItem/LastItem';
import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { $catalog } from '../CatalogPage/model';
import { $recommended } from './model';
import { Header } from '../MainPageNew/components/Header';


// fix me
export const RecommendedGroupsPage: FC = () => {
  const { id } = useParams();
  
  const recommended = useUnit($recommended);
  const spots = useUnit($catalog);

  const recommendedItem: any = recommended
    .find((item: any) => item.id === id);
  const recommendedItemIds = recommendedItem?.spots || [];

  const recommendedItemList = spots
    .filter(({ id }) => recommendedItemIds.includes(id))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .map((spot) => ({ ...spot, show: true }));

  const { loading } = useFakeLoading(0);
  
  if (loading) return <SpinnerList />;

  return (
    <List>
      <Header title={recommendedItem?.title} />

      <Cell
        description={recommendedItem?.description}
        multiline
        style={{ padding: 0 }}
      />

      {!recommendedItemList.length && (
        <PageMessage title="Пока пусто" description="Вы ничего не добавили в избранное" />
      )}

      {recommendedItemList.length > 0 && recommendedItemList
        .map((spot) => {
          return (
            <CatalogItem
              key={spot.id}
              spot={spot}
              isLarge
            />
          );
        })}

      <LastItem />
    </List>
  );
};
