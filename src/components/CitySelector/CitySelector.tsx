/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, List, Placeholder, Select } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';
import { $userSettings, updateUserSettings } from '../Layout/model';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useUnit } from 'effector-react';
import { $cities } from './model';

import './CitySelector.css';

export const CitySelector: FC = () => {
  const { platform } = useLaunchParams();
  const isIos = platform === 'ios';

  const cities = useUnit($cities);
  const { city } = useUnit($userSettings);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    if (cities.length > 0) {
      // @ts-ignore
      setSelectedCity(city || cities[0].id);
    }
  }, [cities]);

  const onSaveCity = () => {
    // @ts-ignore
    updateUserSettings({ city: selectedCity });
  }

  return (
    <>
      <div style={{
        backgroundColor: '#e8e8f1',
        borderRadius: '0 0 16px 16px',
        height: '40vh',
        width: '100%',
        backgroundImage: `url(/twa/images/step4.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
      }} />

      <List style={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 1 }}>
          <Placeholder
            header="Выберете город"
            description="Выберете город в котором живете или планируете отдыхать.
              Если вы подете в отпуск, то город можно будет сменить в настройках"
            className="city-selector-placeholder"
          />

          <Select
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
            value={selectedCity}
          >
            {cities.map((city: any) => (
              <option value={city.id} key={city.id}>{city.link}</option>
            ))}
          </Select>
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
            onClick={onSaveCity}
          >
            Сохранить
          </Button>}
        </div>
      </List>
    </>
  );
};