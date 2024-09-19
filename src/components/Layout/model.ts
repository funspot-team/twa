/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEvent, createStore, createEffect } from 'effector';

// catalog
export const fetchCatalog = createEvent();

const fetchCatalogFx = createEffect(async () => {
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
  .on(fetchCatalogFx.doneData, (_, result) => result.data);

export const $isLoading = fetchCatalogFx.pending;

fetchCatalog.watch(fetchCatalogFx);


// userData
export const onChangeUserData = createEvent<any>();
export const $userData = createStore<any>({});

$userData
  .on(onChangeUserData, (_, value) => {
    return value;
  });
