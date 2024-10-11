/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LSgetItem, LSsetItem } from '@/helpers/helpers';
import { attach, createEffect, createEvent, createStore, sample } from 'effector';

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

// create user
export const createUser = createEvent();

const createUserFx = attach({
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

export const $isNewUser = createStore(false)
  .on(createUserFx.doneData, (_, response) => {
    return response.message === 'success';
  });

sample({
  clock: $userData,
  target: createUser,
});

// sample({
//   clock: createUserFx.done,
//   target: fetchGroups,
// });

createUser.watch(createUserFx);