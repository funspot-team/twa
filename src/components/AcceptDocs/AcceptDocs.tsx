/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, List, Placeholder } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Icon28Docs } from '@/icons/docs';
import { AcceptDoscType, onChangeAcceptDocs } from './model';
import { Link } from '../Link/Link';

import './AcceptDocs.css';

const Docs = ({ name }: { name: string }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div>
          <Icon28Docs />
      </div>

      <Link to="https://funspot.ru">{name}</Link>
    </div>
  );
}
export const AcceptDocs: FC<{ type: AcceptDoscType }> = ({ type }) => {
  const { platform } = useLaunchParams();
  const isIos = platform === 'ios';

  const [checked, setChecked] = useState(false);

  const names = [
    'Политика конфеденциальности',
    'Условия использования',
    'Обработка персональных данных',
  ];

  const isNotAccept = type === AcceptDoscType.SHOW_FULL;

  return (
    <>
      <div style={{
        backgroundColor: '#e8e8f1',
        borderRadius: '0 0 16px 16px',
        height: '40vh',
        width: '100%',
        backgroundImage: `url(/twa/images/step1.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
      }} />

      <List style={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 1 }}>
          <Placeholder
            header="Конфеденциальность превыше всего"
            description={
              <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', marginTop: 40 }}>
                <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                  {names.map((name) => <Docs key={name} name={name} />)}
                </div>

                {isNotAccept && (
                  <div style={{ display: 'flex', gap: '16px', marginLeft: 4 }}>
                    <Checkbox
                      checked={checked}
                      onChange={() => {
                        setChecked(!checked);
                      }}
                    />
                    
                    <div
                      style={{ marginBottom: 12 }}
                      onClick={() => {
                        setChecked(!checked);
                      }}
                    >
                      Я прочитал и согласен
                    </div>
                  </div>
                )}
              </div>
            }
            className="accept-docs-placeholder"
          />
        </div>

        <div style={{
          gap: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
          padding: '12px',
          paddingBottom: isIos ? '20px' : '12px',
        }}>
          {<Button
            mode="filled"
            size="m"
            disabled={isNotAccept && !checked}
            onClick={() => {
              onChangeAcceptDocs(AcceptDoscType.HIDE)
            }}
          >
            {isNotAccept ? 'Принимаю' : 'Закрыть'}
          </Button>}
        </div>
      </List>
    </>
  );
};