import { createEvent, createStore } from "effector";
import { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';

export const onChangeMainFilters = createEvent<MultiselectOption>();
export const onChangeChildrenFilter = createEvent<boolean>();
export const onChangePriceFilters = createEvent<number>();

export const onResetFilters = createEvent();

export const $mainFilters = createStore<MultiselectOption[]>([]);
export const $childrenFilter = createStore<boolean>(false);
export const $priceFilter = createStore<number>(35000);

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