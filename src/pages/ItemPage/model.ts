import { createEvent, createStore } from "effector";

export const onChangeSpotVisible = createEvent<string | null>();
export const $spotVisible = createStore<string | null>(null);

$spotVisible
  .on(onChangeSpotVisible, (_, data) => {
    return data;
  });