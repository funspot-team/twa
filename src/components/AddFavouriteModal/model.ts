import { createEvent, createStore } from "effector";

interface IFavouriteModal {
  isShow: boolean;
  spotId: number | null;
  title: string;
}
export const onChangeFavouriteModal = createEvent<IFavouriteModal>();

export const $isShowFavouriteModal = createStore<IFavouriteModal>({
  isShow: false,
  spotId: null,
  title: ''
});

$isShowFavouriteModal
  .on(onChangeFavouriteModal, (_, value) => {
    return value;
  });