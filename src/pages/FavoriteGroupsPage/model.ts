/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { $userData } from '@/components/Layout/model';
import { createEvent, createStore, createEffect, attach, sample } from 'effector';

export const SYSTEM_GROUP = 'funspot_system_all';

export const fetchGroups = createEvent();
export const createGroup = createEvent();
export const deleteGroup = createEvent();

export const fetchGroupsFx = attach({
  source: $userData,
  effect: createEffect(async (user: number) => {
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({ method: 'getGroups', user: user.id })
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

const createGroupFx = attach({
  source: $userData,
  mapParams: (name: string, user) => ({ name, user }),
  effect: createEffect(async ({ user, name }: any) => { 
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      body: JSON.stringify({ method: 'addGroup', user: user.id, name })
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to create group');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

const deleteGroupFx = attach({
  source: $userData,
  mapParams: (group: number, user) => ({ group, user }),
  effect: createEffect(async ({ user, group }: any) => { 
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      body: JSON.stringify({ method: 'delGroup', user: user.id, group })
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to delete group');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

export const $groups = createStore([])
  .on(fetchGroupsFx.doneData, (_, result) => {
    if (!result?.data) return [];
    return result.data.filter((group: any) => {
      return group.name !== SYSTEM_GROUP;
    });
  });

export const $commonGroup = createStore([])
  .on(fetchGroupsFx.doneData, (_, result) => {
    if (!result?.data) return [];
    return result.data.find((group: any) => {
      return group.name === SYSTEM_GROUP;
    });
  });

export const $isLoadingGroups = fetchGroupsFx.pending || createGroupFx.pending || deleteGroupFx.pending;

sample({
  clock: createGroupFx.done,
  target: fetchGroups,
});

sample({
  clock: deleteGroupFx.done,
  target: fetchGroups,
});

fetchGroups.watch(fetchGroupsFx);
createGroup.watch((name) => {
  // @ts-ignore
  createGroupFx(name);
});
deleteGroup.watch((group) => {
  // @ts-ignore
  deleteGroupFx(group);
});

sample({
  clock: $userData,
  target: fetchGroupsFx
})

sample({
  clock: fetchGroupsFx.doneData,
  filter: ({ message, data }: any) => {
    if (message === 'success' && data && data.length > 0) {
        return data.find((group: any) => group.name === SYSTEM_GROUP)
          ? false : true;
    } else if (message === 'no groups found') {
      return true;
    }
    return false;
  },
  fn: () => SYSTEM_GROUP,
  target: createGroup,
});