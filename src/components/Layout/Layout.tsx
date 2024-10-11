/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useMemo, useRef, type FC } from 'react';
import { $isShowStepperGuide, onChangeUserData } from './model';
import { Tabbar } from '../Tabbar/Tabbar';
import { routes } from '@/navigation/routes';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { YandexMetrika } from '../YandexMetrika/YandexMetrika';
import { AddFavouriteModal } from '../AddFavouriteModal/AddFavouriteModal';
import { useInitData } from '@telegram-apps/sdk-react';
import { StepperGuide } from '../StepperGuide /StepperGuide';
import { useUnit } from 'effector-react';
import { Snackbar } from '../Snackbar/Snackbar';
import { fetchCatalog } from '@/pages/CatalogPage/model';

export const Layout: FC = () => {
  const redirectAllow = useRef(true);
  const navigate = useNavigate();
  const initData = useInitData();
  const isShowGuide = useUnit($isShowStepperGuide);

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
          navigate('/item/' + right);
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

      <Routes>
        {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>

      <AddFavouriteModal />

      <Snackbar />
      
      <Tabbar />
    </>
  );
};
