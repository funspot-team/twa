import { Icon28Search } from '@/icons/search';
import { useUnit } from "effector-react";
import { Badge, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { $filters } from '../model';

interface IFiltersButtonProps {
  onClick: () => void;
}

export const FiltersButton: FC<IFiltersButtonProps> = ({ onClick }) => {
  const filters = useUnit($filters);

  return (
    <Button
      before={<Icon28Search />}
      mode="filled"
      size="s"
      style={{ zIndex: 1000, position: 'fixed', margin: '5%' }}
      onClick={onClick}
      after={
        filters.length > 0 && <Badge
          mode="white"
          type="number"
        >
          {filters.length}
        </Badge>
      }
    >
      Фильтры
    </Button>
  );
};
