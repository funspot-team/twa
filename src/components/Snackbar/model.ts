/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEvent, createStore } from "effector";

interface IAction {
  fn: () => void;
  name: string;
}

interface ISnackbar {
  isShow: boolean;
  spotId: number | null;
  title: string;
  description: string;
  isDelete: boolean;
  action?: IAction | null;
  withBottom?: boolean;
}

export const onChangeSnackbar = createEvent<ISnackbar>();

export const $snakbar = createStore<ISnackbar>({
  isShow: false,
  spotId: null,
  title: '',
  description: '',
  isDelete: false,
  action: null,
  withBottom: true,
});

$snakbar
  .on(onChangeSnackbar, (_, value) => {
    return value;
  });