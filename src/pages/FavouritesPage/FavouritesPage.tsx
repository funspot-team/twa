/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from '@telegram-apps/telegram-ui';
import { useEffect, type FC } from 'react';
import { PageMessage } from '@/components/PageMessage/PageMessage';
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { LastItem } from '@/components/LastItem/LastItem';
import { useUnit } from 'effector-react';
import { $favourites, $isLoadingFavourites, fetchFavourites } from './model';
import { useParams } from 'react-router-dom';
import { $catalog } from '../CatalogPage/model';
import { Header } from '../MainPageNew/components/Header';
import { $commonGroup, $groups, SYSTEM_GROUP } from '../FavoriteGroupsPage/model';

export const FavouritesPage: FC = () => {
  const { id: groupId } = useParams();
  const spots = useUnit($catalog);
  const groups = useUnit($groups);
  const commonGroup = useUnit($commonGroup);
  const favourites = useUnit($favourites);
  const isLoading = useUnit($isLoadingFavourites);

  useEffect(() => {
    // @ts-ignore
    fetchFavourites(groupId);
  }, []);

  if (!groups.length) {
    return null;
  }

  const group: any = [commonGroup, ...groups].find((group: any) => group.id === groupId);
  const groupName = group.name === SYSTEM_GROUP ? 'Все места' : group.name;

  const favouritesIds = favourites.map(({ spot }) => spot);
  const favouritesList = spots
    .filter(({ id }) => favouritesIds.includes(id))

  // const { loading } = useFakeLoading(0);
  // const [favourites, setFavourites] = useState(favouritesList);
  // const [deleted, setDeleted] = useState<any>([]);
  
  // const [isDeleteSnackbarShown, setIsDeleteSnackbarShown] = useState(false);
  // const [isUndoSnackbarShown, setIsUndoSnackbarShown] = useState(false);

  // const undoHandler = () => {
  //   const updateFavourites = favourites.map((spot) => {
  //     if (deleted.id === spot.id) {
  //       return { ...spot, show: true };
  //     }
  //     return spot;
  //   });

  //   setIsDeleteSnackbarShown(false);
  //   setIsUndoSnackbarShown(true);
  //   setFavourites(updateFavourites);
  // }

  const filteredItems = favouritesList;
  //   .filter(({ id }) => !deleted.includes(id));

  if (isLoading) return <SpinnerList />;

  return (
    <List>
      {!filteredItems.length && (
        <PageMessage title="Пока пусто" description="Вы ничего не добавили в подборку" />
      )}

      {filteredItems.length > 0 && (
        <>
          <Header title={`Избранное - ${groupName}`} />

          {filteredItems
            .map((spot: any) => {
              return (
                <CatalogItem
                  key={spot.id}
                  spot={spot}
                  isLarge
                  withRemove
                  // onCustomRemove={(e) => removeHandle(e, spot.id, spot.name)}
                />
              );
            })}
        </>
      )}

      {/* <FavouriteSnackbar
        title={deleted?.name}
        isDeleteSnackbarShown={isDeleteSnackbarShown}
        isUndoSnackbarShown={isUndoSnackbarShown}
        setIsDeleteSnackbarShown={setIsDeleteSnackbarShown}
        setIsUndoSnackbarShown={setIsUndoSnackbarShown}
        undoHandler={undoHandler}
        withPadding
      /> */}
      <LastItem />
    </List>
  );
};
