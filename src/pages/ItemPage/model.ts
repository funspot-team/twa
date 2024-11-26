/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect, createEvent, createStore, sample } from "effector";

export const fetchSpotByIdFx = createEffect(async (id: string) => {
  const response = await fetch(`https://funspot.ru/places/?SpotID=${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch spot by id');
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
});

export const $isLoadingSpot = fetchSpotByIdFx.pending;

export const $spot = createStore([])
  .on(fetchSpotByIdFx.doneData, (_, result) => {
    if (!result?.data) return [];
    return result.data[0];
  });

export const onChangeSpotVisible = createEvent<string | null>();
export const $spotVisible = createStore<string | null>(null);

$spotVisible
  .on(onChangeSpotVisible, (_, data) => {
    return data;
  });

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: $spotVisible,
  filter: (spot: any) => {
    return !!spot;
  },
  target: fetchSpotByIdFx,
});