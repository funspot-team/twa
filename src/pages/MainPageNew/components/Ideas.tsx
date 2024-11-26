/* eslint-disable @typescript-eslint/no-explicit-any */
import { onChangeMainFilters, onResetFilters } from '@/components/Filters/model';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Heart } from '@/icons/heart';
import { Icon28Navi } from '@/icons/navi';
import { Icon28Smile } from '@/icons/smile';
import { ROUTE_NAMES } from '@/navigation/routes';
import { Cell, IconContainer, Section } from '@telegram-apps/telegram-ui';
import { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const Ideas: FC = () => {
  const navigate = useNavigate();

  const onClick = (filters: MultiselectOption[]) => {
    onResetFilters();
    filters.map(onChangeMainFilters);
    navigate(ROUTE_NAMES.CATALOGUE_ROUTE);
  }

  return (
    <Section>
      <Cell
        before={<IconContainer><Icon28Heart /></IconContainer>}
        subtitle="Необычные места для свиданий"
        after={<Icon16ChevronRight />}
        onClick={() => onClick([{
          value: 'свидание',
          label: 'Свидание',
        }])}
        multiline
      >
        Куда пойти на свидание
      </Cell>

      <Cell
        before={<IconContainer><Icon28Smile /></IconContainer>}
        subtitle="Классные места для отдыха с детьми"
        after={<Icon16ChevronRight />}
        onClick={() => onClick([{
          value: 'с детьми',
          label: 'С детьми',
        }])}
        multiline
      >
        Дети будут рады
      </Cell>

      {/* <Cell
        // before={<IconContainer><Icon28Heart /></IconContainer>}
        subtitle="Идеи для плохой погоды"
        after={<Icon16ChevronRight />}
        onClick={() => onClick([{
          value: 'плохая погода',
          label: 'Плохая погода',
        }])}
        multiline
      >
        Плохая погода
      </Cell> */}

      {/* <Cell
        before={<IconContainer><Icon28Heart /></IconContainer>}
        subtitle="Идеи для экстримальных эмоций"
        after={<Icon16ChevronRight />}
        onClick={() => onClick([{
          value: 'экстрим',
          label: 'Экстрим',
        }])}
        multiline
      >
        Хочу адреналина
      </Cell> */}

      <Cell
        before={<IconContainer><Icon28Navi /></IconContainer>}
        subtitle="Идеи для поездок на природу"
        after={<Icon16ChevronRight />}
        onClick={() => onClick([{
          value: 'за городом',
          label: 'За городом',
        }, {
          value: 'природа',
          label: 'Природа',
        }])}
        multiline
      >
        Авто путешествие
      </Cell>
    </Section>
  );
}
