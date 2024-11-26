import { createEffect, createEvent, createStore } from 'effector';

// showCity
export const onChangeShowCity = createEvent<boolean>();

export const $isShowCity = createStore<boolean>(false);

$isShowCity
  .on(onChangeShowCity, (_, value) => {
    return value;
  });

// fetch cities
export const fetchCities = createEvent();

export const fetchCitiesFx = createEffect(async () => {
  const response = await fetch('https://funspot.ru/cities/'); 

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
});

export const $cities = createStore([])
  .on(fetchCitiesFx.doneData, (_, result) => {
    if (!result?.data) return [];
    return result.data;
  });

export const $isLoadingCities = fetchCitiesFx.pending;

fetchCities.watch(fetchCitiesFx);