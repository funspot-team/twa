import { createEvent, createStore } from 'effector';

export enum AcceptDoscType {
  HIDE = 'hide',
  SHOW_DOCS = 'show-docs',
  SHOW_FULL = 'show-full',
}

// accept docs
export const onChangeAcceptDocs = createEvent<AcceptDoscType>();

export const $isShowAcceptDocs = createStore<AcceptDoscType>(AcceptDoscType.HIDE);

$isShowAcceptDocs
  .on(onChangeAcceptDocs, (_, value) => {
    return value;
  });