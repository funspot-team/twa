import { Button, List, Placeholder, Steps } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { onChangeStepperGuide } from '../Layout/model';
import { useLaunchParams } from '@telegram-apps/sdk-react';

const stepsData = [
  {
    title: 'Добро пожаловать в Funspot!',
    description: 'Откройте для себя самые интересные места для отдыха и развлечений в вашем регионе! Наше приложение поможет вам найти лучшие локации для активного досуга, семейного отдыха, свиданий и многого другого. Начнем путешествие вместе!',
  },
  {
    title: 'Ищите места быстро и удобно',
    description: 'На главной странице вы найдете галерею рекомендаций и мест, которые могут вас заинтересовать. Листайте, выбирайте и открывайте для себя новые локации каждый день!',
  },
  {
    title: 'Фильтры для быстрого поиска',
    description: 'Перейдите в каталог, чтобы воспользоваться расширенными фильтрами. Вы можете сортировать места по типу отдыха, активности, популярности и многим другим параметрам, чтобы найти то, что вам нужно!',
  },
  {
    title: 'Вся карта в ваших руках',
    description: 'Используйте карту, чтобы увидеть все доступные места в вашем регионе. Маркеры помогут быстро найти локации рядом с вами, а встроенные фильтры позволят сузить поиск по интересам.',
  },
  {
    title: 'Идеи и избранные места',
    description: 'В разделе "Идеи" мы подготовили подборки самых интересных мест и статей, которые вдохновят вас на новые открытия. Сохраняйте понравившиеся места в "Избранное" и создавайте свои собственные группы для удобного доступа к ним в будущем.',
  }
]

export const StepperGuide: FC = () => {
  const { platform } = useLaunchParams();

  const [step, setStep] = useState(1);
  const isIos = platform === 'ios';
  
  return (
    <>
      <div style={{
        backgroundColor: 'grey',
        borderRadius: '0 0 16px 16px',
        height: '50vh',
        width: '100%'
      }}></div>

      <List style={{ height: '50vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 1 }}>
          <Steps
            count={5}
            progress={step}
          />

          <Placeholder
            header={stepsData[step - 1].title}
            description={stepsData[step - 1].description}
            style={{ padding: '12px' }}
          />
        </div>

        <div style={{
          gap: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: isIos ? '20px' : '0',
        }}>
          {step !== 1 && <Button
            mode="gray"
            size="m"
            onClick={() => setStep(step - 1)}
          >
            Назад
          </Button>}

          {step !== 5 && <Button
            mode="filled"
            size="m"
            onClick={() => setStep(step + 1)}
          >
            Вперед
          </Button>}

          {step === 5 && <Button
            mode="filled"
            size="m"
            onClick={() => onChangeStepperGuide(false)}
          >
            Закрыть
          </Button>}
        </div>
      </List>
    </>
  );
};
