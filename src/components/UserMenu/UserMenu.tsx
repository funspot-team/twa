import { Section, Cell, List, } from '@telegram-apps/telegram-ui';
import { ButtonCell } from '@telegram-apps/telegram-ui/dist/components/Blocks';
import { type FC } from 'react';
import { IconContainer } from '@telegram-apps/telegram-ui/dist/components/Blocks';

import { Link } from '@/components/Link/Link.tsx';

import { Icon28Add } from '@/icons/add';
import { Icon28Lightbulb } from '@/icons/lightbulb';
import { Icon28Person } from '@/icons/person';
import { Icon28Theme } from '@/icons/theme';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Question } from '@/icons/question';

import { useNavigate } from 'react-router-dom';

import './UserMenu.css';

export const UserMenu: FC = () => {
  const navigate = useNavigate();

  return (
      <List>
        {/* <div className="index-page__user-section">
          <Avatar
            size={48}
            src="/twa/images/user-avatar.png"
          />
          <Title
            level="3"
            weight="2"
          >
            Alexey Belousov
          </Title>
        </div> */}

        {/* <InlineButtons mode="plain">
          <InlineButtonsItem text="Избранное" onClick={() => navigate('/favourites')}>
            <Icon28Heart />
          </InlineButtonsItem>
          <InlineButtonsItem text="Карта" onClick={() => navigate('/map')}>
            <Icon28Globe />
          </InlineButtonsItem>
          <InlineButtonsItem text="Кабинет">
            <Icon28Smile />
          </InlineButtonsItem>
        </InlineButtons> */}

        <Section>
          {/* <Link to='/catalog'>
            <Cell
              before={<IconContainer><Icon28Search /></IconContainer>}
              subtitle="Каталог услуг и развлечений"
              after={<Icon16ChevronRight />}
            >
              Поиск
            </Cell>
          </Link> */}

          <Link to='/catalog'>
            <Cell
              before={<IconContainer><Icon28Lightbulb /></IconContainer>}
              subtitle="Ищите вдохновение в нашем блоге"
              after={<Icon16ChevronRight />}
            >
              Идеи
            </Cell>
          </Link>
          <ButtonCell
            before={<Icon28Add />}
            interactiveAnimation="opacity"
            mode="default"
            onClick={() => navigate('/map')}
          >
            Добавить место
          </ButtonCell>
        </Section>

        <Section
          header='Другие сервисы'
        >
          <Link to='/default'>
            <Cell
              before={<IconContainer><Icon28Person /></IconContainer>}
              subtitle="Расширяйте свои возможности"
              after={<Icon16ChevronRight />}
            >
              Пригласить друга
            </Cell>
          </Link>
          <Link to='/default'>
            <Cell
              before={<IconContainer><Icon28Question /></IconContainer>}
              subtitle="Узнайте подробности в разделе информации"
              after={<Icon16ChevronRight />}
            >
              Вопросы и ответы
            </Cell>
          </Link>
          <Link to='/partner'>
            <Cell
              before={<IconContainer><Icon28Theme /></IconContainer>}
              subtitle="Мы расскажем вам про наши партнерские программы"
              after={<Icon16ChevronRight />}
            >
              Стать партнером
            </Cell>
          </Link>
          {/* <Link to='/new-index'>
            <Cell
              after={<Icon16ChevronRight />}
            >
              Пример меню
            </Cell>
          </Link> */}
        </Section>
      </List>
    );
};
