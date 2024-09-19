import { createEvent, createStore } from "effector";

interface IFavouriteModal {
  isShow: boolean;
  spotId: number | null;
  title: string;
}

interface IFavouriteSnackbar {
  isShow: boolean;
  spotId: number | null;
  title: string;
  isDelete: boolean;
}

export const onChangeFavouriteModal = createEvent<IFavouriteModal>();
export const onChangeFavouriteSnackbar = createEvent<IFavouriteSnackbar>();

export const $isShowFavouriteModal = createStore<IFavouriteModal>({
  isShow: false,
  spotId: null,
  title: ''
});
export const $favouriteSnakbar = createStore<IFavouriteSnackbar>({
  isShow: false,
  spotId: null,
  title: '',
  isDelete: false,
});

$isShowFavouriteModal
  .on(onChangeFavouriteModal, (_, value) => {
    return value;
  });

$favouriteSnakbar
  .on(onChangeFavouriteSnackbar, (_, value) => {
    return value;
  });