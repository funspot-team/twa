import { createEvent, createStore } from "effector";
import { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';

export const onChangeMainFilters = createEvent<MultiselectOption>();
export const onChangeChildrenFilter = createEvent<boolean>();
export const onChangePriceFilters = createEvent<number>();
export const onChangeSearch = createEvent<string>();
export const onChangeIsViewAsMap = createEvent<boolean>();

export const onResetFilters = createEvent();

export const $mainFilters = createStore<MultiselectOption[]>([]);
export const $childrenFilter = createStore<boolean>(false);
export const $priceFilter = createStore<number>(35000);
export const $searchFilter = createStore<string>('');
export const $isViewAsMap = createStore<boolean>(false);

$mainFilters
  .on(onChangeMainFilters, (filters, filter) => {
    const isSelected = filters.find(({ value }) => value === filter.value);

    if (!isSelected) {
      return [...filters, filter];
    } else {
      return [...filters.filter(({ value }) => value !== filter.value)];
    }
  })
  .on(onResetFilters, () => {
    return [];
  });

$childrenFilter
  .on(onChangeChildrenFilter, (_, value) => {
    return value;
  })
  .on(onResetFilters, () => {
    return false;
  });

$priceFilter
  .on(onChangePriceFilters, (_, value) => {
    return value;
  })
  .on(onResetFilters, () => {
    return 35000;
  });

$searchFilter
  .on(onChangeSearch, (_, value) => {
    return value;
  })
  .on(onResetFilters, () => {
    return '';
  });

$isViewAsMap
  .on(onChangeIsViewAsMap, (_, value) => {
    return value;
  })