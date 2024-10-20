import { createEvent, createStore } from "effector";

export const onChangeSpotVisible = createEvent<string | null>();
export const $spotVisible = createStore<string | null>(null);

$spotVisible
  .on(onChangeSpotVisible, (_, data) => {
    return data;
  });
  

// export const onChangeRestoreScroll = createEvent<number>();
// export const $restoreScroll = createStore<number>(0);

// $restoreScroll
//   .on(onChangeRestoreScroll, (_, data) => {
//     return data;
//   });