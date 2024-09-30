import { createEvent, createStore } from "effector";

interface ISnackbar {
  isShow: boolean;
  spotId: number | null;
  title: string;
  description: string;
  isDelete: boolean;
}

export const onChangeSnackbar = createEvent<ISnackbar>();

export const $snakbar = createStore<ISnackbar>({
  isShow: false,
  spotId: null,
  title: '',
  description: '',
  isDelete: false,
});

$snakbar
  .on(onChangeSnackbar, (_, value) => {
    return value;
  });