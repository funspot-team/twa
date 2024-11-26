/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { LSgetItem, LSsetItem } from '@/helpers/helpers';
import { fetchAppDataFx } from '@/pages/CatalogPage/model';
import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { $cities, fetchCitiesFx, onChangeShowCity } from '../CitySelector/model';
import { $mapCenter, $mapZoom } from '../Map/model';
import { AcceptDoscType, onChangeAcceptDocs } from '../AcceptDocs/model';

// userData
export const onChangeUserData = createEvent<any>();
export const $userData = createStore<any>({});

$userData
  .on(onChangeUserData, (_, value) => {
    return value;
  });

// stepper guide
export const onChangeStepperGuide = createEvent<boolean>();

export const $isShowStepperGuide = createStore<boolean>(false);

$isShowStepperGuide
  .on(onChangeStepperGuide, (_, value) => {
    return value;
  });

// User Settings
export const $userSettings = createStore({ city: '' });

const getUserSettingsFx = attach({
  source: $userData,
  mapParams: (user) => ({ user }),
  effect: createEffect(async ({ user }: any) => { 
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      body: JSON.stringify({ method: 'newUser', user: user.id })
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

export const updateUserSettings = createEvent();

const updateUserSettingsFx = attach({
  source: $userData,
  mapParams: ({ city }, user) => ({ city, user }),
  effect: createEffect(async ({ user, city }: any) => {
    const response = await fetch('https://funspot.ru/api/', {
      method: 'POST',
      body: JSON.stringify({ method: 'updateUser', user: user.id, city, username: user.username })
    }); 

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    try {
      const result = await response.json();
      return result.message === 'success' ? { city } : response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  }),
});

updateUserSettings.watch((city) => {
  // @ts-ignore
  updateUserSettingsFx(city);
});

sample({
  clock: updateUserSettingsFx.doneData,
  fn: () => false,
  target: onChangeShowCity,
});

const fetchSettingsDataFx = attach({
  source: $userData,
  mapParams: (user) => ({ user }),
  effect: createEffect(async ({ user }: any) => { 
    const [cities, userSettings] = await Promise.all([fetchCitiesFx(), getUserSettingsFx(user)]);
    return { cities, userSettings };
  }),
});

export const $isLoadingSettingsData = fetchSettingsDataFx.pending;
export const $isLoadingUser = updateUserSettingsFx.pending;

sample({
  clock: $userData,
  target: fetchSettingsDataFx,
});

sample({
  clock: fetchSettingsDataFx.doneData,
  fn: ({ userSettings }: any) => {
    if (userSettings.message === 'user already exists') {
      return { city: userSettings.city };
    }
    return { city: '' }
  },
  target: $userSettings,
});

sample({
  clock: updateUserSettingsFx.doneData,
  target: $userSettings,
});

sample({
  clock: $userSettings,
  source: $cities,
  fn: (cities, { city }) => {
    return (cities.find(({ id }) => id === city) as any).zoom;
  },
  target: $mapZoom,
});

sample({
  clock: $userSettings,
  source: $cities,
  fn: (cities, { city }) => {
    return (cities.find(({ id }) => id === city) as any).coords;
  },
  target: $mapCenter,
});

export const $isNewUser = createStore(false)
  .on(getUserSettingsFx.doneData, (_, response) => {
    // fix me - replace to ===
    return response.message !== 'success';
  });

sample({
  clock: $isNewUser,
  filter: (isNewUser: any) => isNewUser,
  fn: () => AcceptDoscType.SHOW_FULL,
  target: onChangeAcceptDocs,
});

sample({
  clock: $isNewUser,
  filter: (isNewUser: any) => isNewUser,
  fn: () => true,
  target: onChangeShowCity,
});

sample({
  clock: $isNewUser,
  filter: (isNewUser: any) => isNewUser,
  fn: () => true,
  target: onChangeStepperGuide,
});

sample({
  clock: $userSettings,
  filter: ({ city }: any) => !!city,
  fn: ({ city }) => city,
  target: fetchAppDataFx,
});