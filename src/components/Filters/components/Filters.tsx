import { useUnit } from "effector-react";
import { Button, Cell, Chip, Divider, IconContainer, List, Modal, Section, Slider, Switch, Text } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';
import { $mainFilters, onChangeMainFilters, onChangePriceFilters, onChangeChildrenFilter, onResetFilters, $childrenFilter, $priceFilter } from '../model';
import { ModalHeader } from '../../ModalHeader/ModalHeader';
import { FiltersButton } from './FiltersButton';
import { Icon20ChevronDown } from '@telegram-apps/telegram-ui/dist/icons/20/chevron_down';
import { Icon16Cancel } from '@telegram-apps/telegram-ui/dist/icons/16/cancel';
import SPOTS from '@/mocks/catalog.json';
import { LastItem } from "@/components/LastItem/LastItem";

const allTags = SPOTS.data.reduce((acc: string[], { tags }) => {
  return [...acc, ...tags];
}, []);
const tags = [...new Set(allTags)]
  .filter((tag) => !['в городе', 'за городом', 'плохая погода'].includes(tag));
const FILTER_OPTIONS: MultiselectOption[] = tags.map((value) => {
  const label = value.charAt(0).toUpperCase() + value.slice(1);
  return { value, label }
});

interface IFiltersProps {
  isMap?: boolean;
}

export const Filters: FC<IFiltersProps> = ({ isMap }) => {
  const filters = useUnit($mainFilters);
  const childrenFilter = useUnit($childrenFilter);
  const priceFilter = useUnit($priceFilter);

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState('');

  const expandHandler = (id: string) => {
    if (expanded === id) {
      setExpanded('');
    } else {
      setExpanded(id);
    }
  }

  return (
    <>
      {(!isOpen || !isMap) && (
        <FiltersButton
          isMap={isMap}
          onClick={() => setIsOpen(true)}
        />
      )}

      <Modal
        style={{ zIndex: 30, background: 'var(--tg-theme-secondary-bg-color, white)' }}
        header={
          <ModalHeader
            title="Фильтры"
            titleAction='Очистить'
            onAction={onResetFilters}
            onClose={() => {
              setIsOpen(false);
              setExpanded('');
            }}
          />
        }
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        {filters.length > 0 && !expanded && (
          <div style={{
            display: 'flex',
            padding: '10px 18px',
            gap: '8px',
            flexWrap: 'wrap',
          }}>
            {filters.map(({ value, label }) => {
              return (
                <Chip
                  key={value}
                  mode="elevated"
                  after={<Icon16Cancel />}
                  onClick={() => onChangeMainFilters({ value, label })}
                >
                  {label}
                </Chip>
              );
            })}
          </div>
        )}

        <List>
          <Section>
            <Cell after={<IconContainer><Icon20ChevronDown /></IconContainer>} onClick={() => expandHandler('1')}>
              Направление активности
            </Cell>

            {expanded === '1' && (
              <>
                <Divider />

                <div style={{
                  display: 'flex',
                  padding: '16px 20px',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}>
                  {FILTER_OPTIONS.map((filter) => {
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
              </>
            )}

            <Divider />

            <Cell after={<IconContainer><Icon20ChevronDown /></IconContainer>} onClick={() => expandHandler('2')}>
              Расположение
            </Cell>

            {expanded === '2' && (
              <>
                <Divider />

                <div style={{
                  display: 'flex',
                  padding: '16px 20px',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}>
                  {[
                    { value: 'в городе', label: 'В городе' },
                    { value: 'за городом', label: 'За городом' },
                    { value: 'плохая погода', label: 'Плохая погода' },
                  ].map((filter) => {
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
              </>
            )}

            <Divider />

            <Cell
              Component="label"
              after={
                <Switch
                  checked={childrenFilter}
                  onChange={() => onChangeChildrenFilter(!childrenFilter)}
                />
              }
              multiline
            >
              Отдых с детьми
            </Cell>
          </Section>

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
