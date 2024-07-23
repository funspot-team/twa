import { useUnit } from "effector-react";
import { Button, Cell, Chip, Divider, List, Modal, Section, Slider, Switch, Text } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';
import { $filters, onChangeFilters, onResetFilters } from '../model';
import { ModalHeader } from '../../ModalHeader/ModalHeader';
import { FiltersButton } from './FiltersButton';
import { Icon20ChevronDown } from '@telegram-apps/telegram-ui/dist/icons/20/chevron_down';
import { Icon16Cancel } from '@telegram-apps/telegram-ui/dist/icons/16/cancel';
import TAGS from '@/mocks/categories.json';

const FILTER_OPTIONS: MultiselectOption[] = TAGS.data.map((value) => {
  const label = value.charAt(0).toUpperCase() + value.slice(1);
  return { value, label }
});

export const Filters: FC = () => {
  const filters = useUnit($filters);
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
      {!isOpen && <FiltersButton
        onClick={() => setIsOpen(true)}
      />}

      <Modal
        style={{ zIndex: 30, background: 'var(--tg-theme-secondary-bg-color, white)' }}
        header={
          <ModalHeader
            title="Фильтры"
            titleAction='Очистить'
            onAction={onResetFilters}
            onClose={() => setIsOpen(false)}
          />
        }
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <List>
          <Section>
            {filters.length > 0 && (
              <div style={{
                display: 'flex',
                padding: '16px 20px',
                gap: '8px',
                flexWrap: 'wrap',
              }}>
                {filters.map(({ value, label }) => {
                  return (
                    <Chip
                      key={value}
                      mode="elevated"
                      after={<Icon16Cancel />}
                      onClick={() => onChangeFilters({ value, label })}
                    >
                      {label}
                    </Chip>
                  );
                })}
              </div>
            )}

            <Cell after={<Icon20ChevronDown />} onClick={() => expandHandler('1')}>
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
                        onClick={() => onChangeFilters(filter)}
                      >
                        {filter.label}
                      </Button>
                    );
                  })}
                </div>
              </>
            )}

            <Divider />

            <Cell after={<Icon20ChevronDown />} onClick={() => expandHandler('2')}>
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
                        onClick={() => onChangeFilters(filter)}
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
              after={<Switch defaultChecked={false} />}
              multiline
            >
              Отдых с детьми
            </Cell>
          </Section>

          <Section
            header='Ценовой диапазон'
          >
            <Slider
              multiple
              min={500}
              max={15000}
              before={<Text weight="3">500</Text>}
              after={<Text weight="3">15000</Text>}
              defaultValue={[500, 15000]}
            />
          </Section>
        </List>

        <div style={{ width: '100%', height: '106px' }}></div>
      </Modal>
    </>
  );
};
