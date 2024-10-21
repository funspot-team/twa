/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useMemo, useRef, type FC } from 'react';
import { $isShowStepperGuide, onChangeUserData } from './model';
import { Tabbar } from '../Tabbar/Tabbar';
import { routes } from '@/navigation/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { YandexMetrika } from '../YandexMetrika/YandexMetrika';
import { AddFavouriteModal } from '../AddFavouriteModal/AddFavouriteModal';
import { useInitData } from '@telegram-apps/sdk-react';
import { StepperGuide } from '../StepperGuide /StepperGuide';
import { useUnit } from 'effector-react';
import { Snackbar } from '../Snackbar/Snackbar';
import { fetchCatalog } from '@/pages/CatalogPage/model';
import { $spotVisible, onChangeSpotVisible } from '@/pages/ItemPage/model';
import { SpotModal } from '../SpotModal/SpotModal';

import './Layout.css';

export const Layout: FC = () => {
  const redirectAllow = useRef(true);
  const initData = useInitData();

  const isShowGuide = useUnit($isShowStepperGuide);
  const spotVisible = useUnit($spotVisible);

  const userData = useMemo(() => {
    return initData && initData.user ? initData.user : undefined;
  }, [initData]);

  const startParam = useMemo(() => {
    return initData && initData.startParam ? initData.startParam : undefined;
  }, [initData]);

  useEffect(() => {
    onChangeUserData(userData);
    
    fetchCatalog();

    if (startParam) {
      const parsedParam = startParam.split('_');
      const left = parsedParam[0];
      const right = parsedParam[1];
      const isSpotPage = left === 'spotId';

      if (isSpotPage && right && redirectAllow.current) {
        redirectAllow.current = false;
        
        setTimeout(() => {
          onChangeSpotVisible(right);
        }, 0);
      }
    }
  }, []);

  if (isShowGuide) {
    return <StepperGuide />;
  }

  return (
    <>
      <YandexMetrika />

      <div
        style={{ overflow: spotVisible ? 'hidden' : 'initial' }}
      >
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </div>

      <SpotModal />

      <AddFavouriteModal />

      <Snackbar />
      
      <Tabbar />
    </>
  );
};
