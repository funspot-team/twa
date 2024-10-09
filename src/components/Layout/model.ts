/* eslint-disable @typescript-eslint/no-explicit-any */
import { LSgetItem, LSsetItem } from '@/helpers/helpers';
import { createEvent, createStore } from 'effector';

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
