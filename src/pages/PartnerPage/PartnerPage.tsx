import { useEffect, useState, type FC } from 'react';
import { Cell, Input, List, Multiselectable, Section, Tappable } from '@telegram-apps/telegram-ui';
import { Icon24Close } from '@telegram-apps/telegram-ui/dist/icons/24/close';
import { initMainButton } from '@telegram-apps/sdk-react';

export const PartnerPage: FC = () => {
  const [mainButton] = initMainButton();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    mainButton.setParams({
      text: 'Отправить',
      isVisible: true,
    });

    return () => {
      mainButton.hide();
    }
  }, []);

  return (
    <List>
      <Section
        header="Как вас зовут"
      >
        <Input
          value={name}
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          after={(
            <Tappable
              Component="div"
              style={{ display: 'flex' }}
              onClick={() => setName('')}
            >
              <Icon24Close />
            </Tappable>
          )}
        />
      </Section>

      <Section
        header="Какая партнерская программа вам интересна?"
      >
        <form>
          <Cell
            Component="label"
            before={<Multiselectable name="multiselect" value="1" />}
            description="Выделение в каталоге и банеры"
            multiline
          >
            Реклама и продвижение
          </Cell>
          <Cell
            Component="label"
            before={<Multiselectable name="multiselect" value="2" />}
            description="Наш менеджер расскажет вам про все возможности"
            multiline
          >
            Комплексный проект
          </Cell>
        </form>
      </Section>

      <Section
        header="Куда прислать презентацию?"
      >
        <Input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          after={(
            <Tappable
              Component="div"
              style={{ display: 'flex' }}
              onClick={() => setEmail('')}
            >
              <Icon24Close />
            </Tappable>
          )}
        />
      </Section>
    </List>
  );
};
