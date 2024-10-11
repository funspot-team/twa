/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUnit } from "effector-react";
import { Button, List, Modal, Section, Slider, Text } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';
import { $mainFilters, onChangeMainFilters, onChangePriceFilters, onResetFilters, $priceFilter, onChangeSearch } from '../model';
import { ModalHeader } from '../../ModalHeader/ModalHeader';
import { FiltersButton } from './FiltersButton';
// import { Icon20ChevronDown } from '@telegram-apps/telegram-ui/dist/icons/20/chevron_down';
// import { Icon16Cancel } from '@telegram-apps/telegram-ui/dist/icons/16/cancel';
import { LastItem } from "@/components/LastItem/LastItem";
import { FiltersSearch } from "./FiltersSearch";
import { FiltersToggle } from "./FiltersToggle";
import { FiltersQuick } from "./FiltersQuick";
import { $catalog } from "@/pages/CatalogPage/model";
import { useLaunchParams } from "@telegram-apps/sdk-react";

interface IFiltersProps {
  isMap?: boolean;
}

export const Filters: FC<IFiltersProps> = ({ isMap }) => {
  const { platform } = useLaunchParams();
  const isIos = platform === 'ios';

  const filters = useUnit($mainFilters);
  const priceFilter = useUnit($priceFilter);
  const spots = useUnit($catalog);

  const [isOpen, setIsOpen] = useState(false);

  const allTags: string[] = spots.reduce((acc, spot: any) => {
    // if (spot.tags.some((tag) => tag === null)) {
    //   console.log(spot.name);
    // }
    return acc.concat(spot.tags);
  }, []);
  const uniqueTags = [...new Set(allTags)]
    .filter(tag => tag && !['активно', 'еда', 'прогулка', 'жилье'].includes(tag));
  uniqueTags.sort();
  const importantTags = ['в городе', 'за городом'];
  importantTags.forEach((tag: any) => {
    const index = uniqueTags.indexOf(tag);
    if (index !== -1) {
      uniqueTags.splice(index, 1);
      uniqueTags.unshift(tag);
    }
  });
      
  const filterWithUpperCase: MultiselectOption[] = uniqueTags.map((value) => {
    const label = value.charAt(0).toUpperCase() + value.slice(1);
    return { value, label }
  });

  return (
    <>
      {(!isOpen || !isMap) && (
        <>
          <div style={{
            padding: '10px',
            zIndex: 50,
            position: 'fixed' as any,
            width: 'calc(100% - 20px)',
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            background: isMap ? 'none' : 'var(--tg-theme-secondary-bg-color, white)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
            }}>
              <FiltersSearch onSearch={(str) => onChangeSearch(str)}/>

              <FiltersButton
                isMap={isMap}
                onClick={() => setIsOpen(true)}
              />
            </div>

            <FiltersToggle />
          </div>
        </>
      )}

      <Modal
        style={{ zIndex: 55, background: 'var(--tg-theme-secondary-bg-color, white)' }}
        header={
          <ModalHeader
            title="Фильтры"
            titleAction='Очистить'
            onAction={onResetFilters}
            rightSlot={
              <Button
                size="s"
                onClick={() => setIsOpen(false)}
              >
                Готово
              </Button>
            }
          />
        }
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div style={{
            display: 'flex',
            padding: '10px 18px',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <FiltersQuick />
        </div>

        <List>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            padding: !isIos ? '0 18px' : '',
          }}>
            {filterWithUpperCase.map((filter) => {
              return (
                <Button
                  key={filter.value}
                  stretched={false}
                  size="s"
                  mode={filters.find(({ value }) => value === filter.value) ? 'filled' : 'bezeled'}
                  onClick={() => onChangeMainFilters(filter)}
                >
                  {filter.label}
                </Button>
              );
            })}
          </div>

          <Section
            header='Цена до'
          >
            <Slider
              min={100}
              max={35000}
              before={<Text weight="3">{priceFilter}</Text>}
              value={priceFilter as number}
              onChange={onChangePriceFilters}
            />
          </Section>
        </List>

        <LastItem />
      </Modal>
    </>
  );
};
