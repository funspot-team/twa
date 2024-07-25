import { useUnit } from "effector-react";
import { Badge, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { $filters } from '../model';
import { Icon28Filters } from '@/icons/filters';

interface IFiltersButtonProps {
  onClick: () => void;
  isMap?: boolean;
}

export const FiltersButton: FC<IFiltersButtonProps> = ({
  onClick,
  isMap = false,
}) => {
  const filters = useUnit($filters);

  return (
    <>
      {isMap && <Button
        before={<Icon28Filters />}
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
      </Button>}

      {/* gray secondary */}
      {!isMap && <Button
        before={<Icon28Filters />}
        mode="filled"
        size="s"
        style={{ margin: '16px 18px 10px 18px' }}
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
      </Button>}
    </>
  );
};
