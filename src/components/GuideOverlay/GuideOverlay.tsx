/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ROUTE_NAMES } from '@/navigation/routes';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onChangeStepperGuide } from '../Layout/model';
import { Tooltip } from '@telegram-apps/telegram-ui';
// import { addFavourite } from '@/pages/FavouritesPage/model';
// import { $commonGroup } from '@/pages/FavoriteGroupsPage/model';
// import { useUnit } from 'effector-react';
import { onChangeIsViewAsMap, onResetFilters } from '../Filters/model';

export const GuideOverlay = () => {
  const navigate = useNavigate();

  // const commonGroup = useUnit($commonGroup);

  const ref = useRef(null);

  const [step, setStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState(null);

  const steps = [
    { selector: '#catalog',
      text: `Привет!</br>
      Давай покажу основные функции.</br>
      Нажимай на "Каталог"`, 
      action: () => navigate(ROUTE_NAMES.CATALOGUE_ROUTE),
    },
    {
      selector: '#drive',
      text: 'Давай посмотрим споты в категории "Вождение".',
      action: 'click'
    },
    {
      selector: 'article:first-of-type .card-chip',
      text: 'Нажимай на сердечко,</br>чтобы сохранить в "Избранное"',
      action: 'click',
    },
    {
      selector: '#map-btn',
      text: 'А теперь давай посмотрим споты на карте',
      action: () => {
        // @ts-ignore
        // addFavourite({ spot: 13, group: Number(commonGroup.id) });
        // navigate(-1);
        onResetFilters();
        onChangeIsViewAsMap(true);
      },
    },
    {
      selector: '#filters-btn',
      text: 'Для удобства поиска можно использовать фильтры',
      action: 'click',
    },
    {
      selector: '#tb-main',
      text: 'Ура! Теперь ты знаешь основные функции. Возвращаемся на главную',
      action: () => {
        navigate(ROUTE_NAMES.MAIN_ROUTE);
      },
    }
  ];

  useEffect(() => {
    const updateTargetPosition = () => {
      const { selector } = steps[step];

      const targetElement = document.querySelector(selector);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetPosition({
          // @ts-ignore
          top: rect.top + window.scrollY - 15,
          left: rect.left + window.scrollX - 15,
          width: rect.width + 30,
          height: rect.height + 30,
        });
      }
    };

    setTimeout(() => {
      updateTargetPosition();
    }, 100);

    window.addEventListener('resize', updateTargetPosition);
    return () => window.removeEventListener('resize', updateTargetPosition);
  }, [step]);

  const handleNextStep = () => {
    const { selector, action } = steps[step];

    if (action) {
      if (typeof action === 'function') {
        action();
      } else {
        // @ts-ignore
        document.querySelector(selector)?.click();
      }
    }

    if (step === steps.length - 1) {
      // navigate(ROUTE_NAMES.MAIN_ROUTE);
      return onChangeStepperGuide(false);
    }

    if (action) {
      setTimeout(() => {
        setStep(step + 1);
      }, 500);
    } else {
      setStep(step + 1);
    }
  };

  if (!targetPosition) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      // @ts-ignore
      maskImage: `radial-gradient(circle at ${targetPosition.left + targetPosition.width / 2}px ${targetPosition.top + targetPosition.height / 2}px, transparent ${targetPosition.width / 2}px, black ${targetPosition.width / 2 + 1}px)`,
      // @ts-ignore
      WebkitMaskImage: `radial-gradient(circle at ${targetPosition.left + targetPosition.width / 2}px ${targetPosition.top + targetPosition.height / 2}px, transparent ${targetPosition.width / 2}px, black ${targetPosition.width / 2 + 1}px)`,
      zIndex: 10000,
      pointerEvents: 'auto',
    }}
      onClick={handleNextStep}
    >
      <div
        ref={ref}
        style={{
          // @ts-ignore
          top: `${targetPosition.top}px`,
          // @ts-ignore
          left: `${targetPosition.left}px`,
          borderRadius: '50%',
          // @ts-ignore
          width: `${targetPosition.width}px`,
          // @ts-ignore
          height: `${targetPosition.height}px`,
          zIndex: 100001,
          // backgroundColor: 'red',
          position: 'absolute',
        }}
      />

      <Tooltip targetRef={ref} style={{ zIndex: 10002, maxWidth: '70vw' }}>
        <span dangerouslySetInnerHTML={{ __html: steps[step]?.text }} />
      </Tooltip>

      {/* <div style={{
        position: 'absolute',
        // @ts-ignore
        top: targetPosition.top + targetPosition.height + 20,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        textAlign: 'center',
        maxWidth: '300px',
      }}>
        {steps[step]?.text}
      </div> */}
    </div>
  );
};