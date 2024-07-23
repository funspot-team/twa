import { createEvent, createStore } from "effector";

export const onChangeMapZoom = createEvent<number>();
export const onChangeMapCenter = createEvent<[number, number]>();

export const $mapZoom = createStore<number>(9);
export const $mapCenter = createStore<[number, number]>([59.95007662114074, 30.316943757666053]);

$mapZoom
  .on(onChangeMapZoom, (_, zoom) => zoom);

$mapCenter
  .on(onChangeMapCenter, (_, center) => center);