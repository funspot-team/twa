/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Section, Cell, List, } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { IconContainer } from '@telegram-apps/telegram-ui/dist/components/Blocks';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Question } from '@/icons/question';
import { onChangeStepperGuide } from '../Layout/model';
import { initUtils } from '@telegram-apps/sdk';
import { useInitData, useMiniApp } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';
import { onResetFilters } from '../Filters/model';
import { Icon28Chat } from '@/icons/chat';
import { Icon28Docs } from '@/icons/docs';
import { AcceptDoscType, onChangeAcceptDocs } from '../AcceptDocs/model';

import './UserMenu.css';

export const UserMenu: FC = () => {
  const navigate = useNavigate();

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
            before={<IconContainer><Icon28Chat /></IconContainer>}
            subtitle="Поделитесь с нами идеей, сообщите о проблеме или узнайте о нашей партнерской программе"
            after={<Icon16ChevronRight />}
            onClick={onClick}
            multiline
          >
            Свяжитесь с нами через бот
          </Cell>
        </Section>

        <Section header='Другие сервисы'>
          <Cell
            before={<IconContainer><Icon28Question /></IconContainer>}
            subtitle="Узнайте как эффективно использовать приложение"
            after={<Icon16ChevronRight />}
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                onResetFilters();
                onChangeStepperGuide(true);
              }, 500);
            }}
            multiline
          >
            Как пользоваться приложением
          </Cell>

          <Cell
            before={<IconContainer><Icon28Docs /></IconContainer>}
            subtitle="Политика конфеденциальности, условия использования и персональные данные"
            after={<Icon16ChevronRight />}
            onClick={() => {
              onChangeAcceptDocs(AcceptDoscType.SHOW_DOCS);
            }}
            multiline
          >
            Документы
          </Cell>
        </Section>
      </List>
    );
};
