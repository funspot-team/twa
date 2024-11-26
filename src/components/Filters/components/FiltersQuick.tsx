/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Chip } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { $mainFilters, onChangeMainFilters, onResetFilters } from '../model';
import { useUnit } from 'effector-react';
import { Icon16Cancel } from '@telegram-apps/telegram-ui/dist/icons/16/cancel';

import './FiltersQuick.css';

const mapFilterToClor = {
  ['активно']: '#fb9519',
  ['еда']: '#16056b',
  ['прогулка']: '#4886eb',
  ['жилье']: '#707697',
}
const QUICK_FILTERS = ['активно', 'еда', 'прогулка', 'жилье'];
const quickFilters = QUICK_FILTERS.map((value) => {
  const label = value.charAt(0).toUpperCase() + value.slice(1);
  return { value, label }
});

export const FiltersQuick: FC = () => {
  const filters = useUnit($mainFilters);

  return (
    <div style={{ overflowX: 'scroll' }}>
      <div className="filters-quick-scroll-container">
        {quickFilters.map((filter) => {
          const selected = filters.find(({ value }) => value === filter.value);

          return (
            <Chip
              key={filter.value}
              mode="elevated"
              className={selected ? 'filters-quick-chip selected' : 'filters-quick-chip'}
              style={selected && {
                // @ts-ignore
                backgroundColor: mapFilterToClor[filter.value],
              }}
              after={!selected ? (
                <div
                  style={{
                    // @ts-ignore
                    backgroundColor: mapFilterToClor[filter.value],
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                  }}
                />
              ) : (<Icon16Cancel />)}
              onClick={() => {
                if (!selected) {
                  onResetFilters();
                }
                onChangeMainFilters(filter);
              }}
            >
              {filter.label}
            </Chip>
          );
        })}
      </div>
    </div>
  );
};
