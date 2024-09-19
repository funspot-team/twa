/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from '@telegram-apps/telegram-ui';
import { SyntheticEvent, useState, type FC } from 'react';
import FAVOURITES from '@/mocks/favourites.json';
import { Icon28Remove } from '@/icons/remove';
import { PageMessage } from '@/components/PageMessage/PageMessage';
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { FavouriteSnackbar } from '@/components/AddFavourite/components/FavouriteSnackbar';
import { useFakeLoading } from '@/hooks/useFakeLoading';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { LastItem } from '@/components/LastItem/LastItem';
import { useUnit } from 'effector-react';
import { $catalog } from '@/components/Layout/model';

export const FavouritesPage: FC = () => {
  const spots = useUnit($catalog);

  const favouritesIds = FAVOURITES.data.map(({ id }) => id);
  const favouritesList = spots
    .filter(({ id }) => favouritesIds.includes(Number(id)))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .map((spot) => ({ ...spot, show: true }));


  const { loading } = useFakeLoading(0);
  const [favourites, setFavourites] = useState(favouritesList);
  const [deleted, setDeleted] = useState<any>(null);
  
  const [isDeleteSnackbarShown, setIsDeleteSnackbarShown] = useState(false);
  const [isUndoSnackbarShown, setIsUndoSnackbarShown] = useState(false);

  const removeHandle = (e: SyntheticEvent, idToRemove: number) => {
    e.stopPropagation();

    const deleted = favourites.find(({ id }) => idToRemove === id);
    const updateFavourites = favourites.map((spot) => {
      if (idToRemove === spot.id) {
        return { ...spot, show: false };
      }
      return spot;
    });

    setFavourites(updateFavourites);
    setDeleted(deleted);
    setIsUndoSnackbarShown(false);
    setIsDeleteSnackbarShown(true);
  }

  const undoHandler = () => {
    const updateFavourites = favourites.map((spot) => {
      if (deleted.id === spot.id) {
        return { ...spot, show: true };
      }
      return spot;
    });

    setIsDeleteSnackbarShown(false);
    setIsUndoSnackbarShown(true);
    setFavourites(updateFavourites);
  }

  const filteredItems = favourites.filter(({ show }) => show);

  if (loading) return <SpinnerList />;

  return (
    <List>
      {!filteredItems.length && (
        <PageMessage title="Пока пусто" description="Вы ничего не добавили в избранное" />
      )}

      {filteredItems.length > 0 && filteredItems
        .map((spot) => {
          return (
            <CatalogItem
              key={spot.id}
              spot={spot}
              iconAdd={Icon28Remove}
              added
              onFavourite={removeHandle}
            />
          );
        })}

      <FavouriteSnackbar
        title={deleted?.name}
        isDeleteSnackbarShown={isDeleteSnackbarShown}
        isUndoSnackbarShown={isUndoSnackbarShown}
        setIsDeleteSnackbarShown={setIsDeleteSnackbarShown}
        setIsUndoSnackbarShown={setIsUndoSnackbarShown}
        undoHandler={undoHandler}
        withPadding
      />

      <LastItem />
    </List>
  );
};
