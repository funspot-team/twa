/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodeHtmlEntities, LSgetItem, LSsetItem } from '@/helpers/helpers';
import { createEvent, createStore, createEffect } from 'effector';

// catalog
export const fetchCatalog = createEvent();

export const fetchCatalogFx = createEffect(async () => {
  const response = await fetch('https://funspot.ru/places/ '); 

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

fetchCatalog.watch(fetchCatalogFx);


// userData
export const onChangeUserData = createEvent<any>();
export const $userData = createStore<any>({});

$userData
  .on(onChangeUserData, (_, value) => {
    return value;
  });

// stepper guide
export const onChangeStepperGuide = createEvent<boolean>();

const initValue = Boolean(LSgetItem('stepper-guide'));
export const $isShowStepperGuide = createStore<boolean>(!initValue);

$isShowStepperGuide
  .on(onChangeStepperGuide, (_, value) => {
    LSsetItem('stepper-guide', true);
    return value;
  });
