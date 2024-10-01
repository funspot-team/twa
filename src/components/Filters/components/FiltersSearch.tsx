import { useUnit } from "effector-react";
import { Input, Tappable } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';
import { Icon24Close } from "@telegram-apps/telegram-ui/dist/icons/24/close";
import { useDebounce } from "use-debounce";
import { $searchFilter } from "../model";

import './FiltersSearch.css';

interface IFiltersSearchProps {
  onSearch: (searchStr: string) => void;
}

export const FiltersSearch: FC<IFiltersSearchProps> = ({
  onSearch,
}) => {
  const search = useUnit($searchFilter);
  const [searchStr, setSearchStr] = useState(search);
  const [debouncedSearchStr] = useDebounce(searchStr, 300);

  useEffect(() => {
    onSearch(debouncedSearchStr);
  }, [debouncedSearchStr]);

  return (
    <div style={{ width: 'inherit' }} className="filters-search">
      <Input
        value={searchStr}
        placeholder="Поиск"
        onChange={(e) => setSearchStr(e.target.value)}
        after={(
          <Tappable
            Component="div"
            style={{ display: 'flex' }}
            onClick={() => setSearchStr('')}
          >
            <Icon24Close />
          </Tappable>
        )}
      />
    </div>
  );
};
