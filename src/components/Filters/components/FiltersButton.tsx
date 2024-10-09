import { useUnit } from "effector-react";
import { Badge, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { $childrenFilter, $mainFilters, $priceFilter } from '../model';
import { Icon28Filter } from "@/icons/filter";

interface IFiltersButtonProps {
  onClick: () => void;
  isMap?: boolean;
}

export const FiltersButton: FC<IFiltersButtonProps> = ({ onClick }) => {
  const filters = useUnit($mainFilters);
  const childrenFilter = useUnit($childrenFilter);
  const priceFilter = useUnit($priceFilter);

  let filtersLength = filters.length;

  if (childrenFilter) {
    filtersLength += 1;
  }

  if (priceFilter < 35000) {
    filtersLength += 1;
  }

  return (
    <Button
      before={<Icon28Filter />}
      mode="filled"
      size="m"
      style={{
        gap: 0,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      }}
      onClick={onClick}
      after={
        filtersLength > 0 && <Badge
          mode="white"
          type="number"
        >
          {filtersLength}
        </Badge>
      }
    />
  );
};
