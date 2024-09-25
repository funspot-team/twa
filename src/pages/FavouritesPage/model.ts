/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { $userData } from '@/components/Layout/model';
import { createEvent, createStore, createEffect, attach, sample } from 'effector';

export const fetchFavourites = createEvent();
export const addFavourite = createEvent();
export const deleteFavourite = createEvent();

const fetchFavouritesFx = attach({
  source: $userData,
  mapParams: (group: string, user) => ({ group, user }),
  effect: createEffect(async ({ user, group }: any) => { 
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      body: JSON.stringify({ method: 'getSpots', user: user.id, group })
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to fetch favourites');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

const addFavouriteFx = attach({
  source: $userData,
  mapParams: ({ group, spot }, user) => ({ group, spot, user }),
  effect: createEffect(async ({ user, spot, group }: any) => { 
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      body: JSON.stringify({ method: 'addSpot', user: user.id, group, spot })
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to add favourite');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

const deleteFavouriteFx = attach({
  source: $userData,
  mapParams: ({ group, spot }, user) => ({ group, spot, user }),
  effect: createEffect(async ({ user, spot, group }: any) => { 
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      body: JSON.stringify({ method: 'delSpot', user: user.id, group, spot })
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to add favourite');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

export const $favourites = createStore([])
  .on(fetchFavouritesFx.doneData, (_, result) => {
    if (!result?.data) return [];
    return JSON.parse(result.data);
  });

export const $isLoadingFavourites = fetchFavouritesFx.pending; // || addFavouriteFx.pending || deleteFavouriteFx.pending;

sample({
  clock: addFavouriteFx.done,
  fn: ({ params }) => params.group,
  target: fetchFavourites,
});

// sample({
//   clock: deleteFavouriteFx.done,
//   fn: ({ params }) => params.group,
//   target: fetchFavourites,
// });

fetchFavourites.watch((group) => {
  // @ts-ignore
  fetchFavouritesFx(group);
});
addFavourite.watch((params) => {
  // @ts-ignore
  addFavouriteFx(params);
});
deleteFavourite.watch((params) => {
  // @ts-ignore
  deleteFavouriteFx(params);
});