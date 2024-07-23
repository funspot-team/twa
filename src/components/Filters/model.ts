import { createEvent, createStore } from "effector";
import { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';

export const onChangeFilters = createEvent<MultiselectOption>();
export const onResetFilters = createEvent();

export const $filters = createStore<MultiselectOption[]>([]);

$filters
  .on(onChangeFilters, (filters, filter) => {
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