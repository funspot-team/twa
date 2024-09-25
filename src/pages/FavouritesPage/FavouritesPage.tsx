/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from '@telegram-apps/telegram-ui';
import { SyntheticEvent, useEffect, useState, type FC } from 'react';
import { PageMessage } from '@/components/PageMessage/PageMessage';
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { LastItem } from '@/components/LastItem/LastItem';
import { useUnit } from 'effector-react';
import { $catalog } from '@/components/Layout/model';
import { $favourites, $isLoadingFavourites, deleteFavourite, fetchFavourites } from './model';
import { useParams } from 'react-router-dom';
import { onChangeFavouriteSnackbar } from '@/components/AddFavouriteModal/model';

export const FavouritesPage: FC = () => {
  const { id: groupId } = useParams();
  const spots = useUnit($catalog);
  const favourites = useUnit($favourites);
  const isLoading = useUnit($isLoadingFavourites);

  useEffect(() => {
    // @ts-ignore
    fetchFavourites(groupId);
  }, []);

  const favouritesIds = favourites.map(({ spot }) => spot);
  const favouritesList = spots
    .filter(({ id }) => favouritesIds.includes(id))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // .map((spot) => ({ ...spot, show: true }));

  // const { loading } = useFakeLoading(0);
  // const [favourites, setFavourites] = useState(favouritesList);
  const [deleted, setDeleted] = useState<any>([]);
  
  // const [isDeleteSnackbarShown, setIsDeleteSnackbarShown] = useState(false);
  // const [isUndoSnackbarShown, setIsUndoSnackbarShown] = useState(false);

  const removeHandle = (e: SyntheticEvent, spotId: number, title: string) => {
    e.stopPropagation();

    // @ts-ignore
    deleteFavourite({ spot: Number(spotId), group: Number(groupId) });

    setDeleted([...deleted, spotId]);

    onChangeFavouriteSnackbar({
      isShow: true,
      title,
      spotId,
      isDelete: true,
    });

    // const deleted = favourites.find(({ id }) => idToRemove === id);
    // const updateFavourites = favourites.map((spot) => {
    //   if (idToRemove === spot.id) {
    //     return { ...spot, show: false };
    //   }
    //   return spot;
    // });

    // setFavourites(updateFavourites);
    // setDeleted(deleted);
    // setIsUndoSnackbarShown(false);
    // setIsDeleteSnackbarShown(true);
  }

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

  const filteredItems = favouritesList
    .filter(({ id }) => !deleted.includes(id));

  if (isLoading) return <SpinnerList />;

  return (
    <List>
      {!filteredItems.length && (
        <PageMessage title="Пока пусто" description="Вы ничего не добавили в подборку" />
      )}

      {filteredItems.length > 0 && filteredItems
        .map((spot) => {
          return (
            <CatalogItem
              // @ts-ignore
              key={spot.id}
              spot={spot}
              added
              // @ts-ignore
              onFavourite={(e) => removeHandle(e, spot.id, spot.name)}
            />
          );
        })}

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
