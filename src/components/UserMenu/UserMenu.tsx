/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Section, Cell, List, } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { IconContainer } from '@telegram-apps/telegram-ui/dist/components/Blocks';
import { Icon28Add } from '@/icons/add';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Question } from '@/icons/question';
import { onChangeStepperGuide } from '../Layout/model';
import { Icon28Person } from '@/icons/person';
import { initUtils } from '@telegram-apps/sdk';
import { useInitData, useMiniApp } from '@telegram-apps/sdk-react';

import './UserMenu.css';

export const UserMenu: FC = () => {
  const utils = initUtils();
  const initData = useInitData();
  const miniApp = useMiniApp();

  const onClick = () => {
    // @ts-ignore
    ym(97751698,'reachGoal','btn-click-go-feedback');
    
    if (initData?.chatInstance) {
      utils.openTelegramLink('https://t.me/fun_spot_official_bot');
    }
    miniApp.close();
  }

  return (
      <List>
        <Section header='Связаться с нами'>
          <Cell
            before={<IconContainer><Icon28Add /></IconContainer>}
            subtitle="Поделитесь с нами классными местами"
            after={<Icon16ChevronRight />}
            onClick={onClick}
            multiline
          >
            Рекомендовать место
          </Cell>

          <Cell
            before={<IconContainer><Icon28Question /></IconContainer>}
            subtitle="Расскажите нам о проблеме или задайте вопрос"
            onClick={onClick}
            after={<Icon16ChevronRight />}
            multiline
          >
            Обратная связь и поддержка
          </Cell>

          <Cell
            before={<IconContainer><Icon28Person /></IconContainer>}
            subtitle="Напишите нам если вы владелец спота или хотите участвовать в партнерской программе"
            after={<Icon16ChevronRight />}
            onClick={onClick}
            multiline
          >
            Стать партнером
          </Cell>
        </Section>

        <Section header='Другие сервисы'>
          <Cell
            before={<IconContainer><Icon28Question /></IconContainer>}
            subtitle="Узнайте как эффективно использовать приложение"
            after={<Icon16ChevronRight />}
            onClick={() => onChangeStepperGuide(true)}
            multiline
          >
            Как пользоваться приложением
          </Cell>
        </Section>
      </List>
    );
};
