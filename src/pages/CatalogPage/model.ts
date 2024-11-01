/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodeHtmlEntities } from '@/helpers/helpers';
import { createEvent, createStore, createEffect } from 'effector';

export const fetchCatalog = createEvent();

export const fetchCatalogFx = createEffect(async (city: string) => {
  const response = await fetch('https://funspot.ru/places/?City=' + city); 

  if (!response.ok) {
    throw new Error('Failed to fetch catalog');
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
});

export const $catalog = createStore([])
  .on(fetchCatalogFx.doneData, (_, result) => {
    if (!result?.data) return [];

    return result.data
      .map((spot: any) => ({
          ...spot,
          name: decodeHtmlEntities(spot.name),
      }))
      .sort((a: any, b: any) => {
        if (a.raiting === null) return 1;
        if (b.raiting === null) return -1;
        return parseFloat(b.raiting) - parseFloat(a.raiting);
      });
  });

export const $isLoadingCatalog = fetchCatalogFx.pending;

fetchCatalog.watch((city) => {
  // @ts-ignore
  fetchCatalogFx(city);
});

export const onChangeCatalogScroll = createEvent<number>();
export const $catalogScroll = createStore<number>(0);
$catalogScroll
  .on(onChangeCatalogScroll, (_, scroll) => scroll);

