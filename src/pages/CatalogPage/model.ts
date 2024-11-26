/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodeHtmlEntities } from '@/helpers/helpers';
import { createStore, createEffect } from 'effector';
import { fetchRecommendedFx } from '../RecommendedGroupsPage/model';

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

export const fetchAppDataFx = createEffect(async (city: string) => { 
  const [catalog, recommended] = await Promise.all([
    fetchCatalogFx(city),
    fetchRecommendedFx(city),
  ]);
  return { catalog, recommended };
});

export const $isLoadingAppData = fetchAppDataFx.pending;

