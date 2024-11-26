/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useMemo, useRef, type FC } from 'react';
import { $isLoadingSettingsData, $isLoadingUser, $isShowStepperGuide, onChangeUserData } from './model';
import { Tabbar } from '../Tabbar/Tabbar';
import { routes } from '@/navigation/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { YandexMetrika } from '../YandexMetrika/YandexMetrika';
import { AddFavouriteModal } from '../AddFavouriteModal/AddFavouriteModal';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUnit } from 'effector-react';
import { Snackbar } from '../Snackbar/Snackbar';
// import { $spotVisible, onChangeSpotVisible } from '@/pages/ItemPage/model';
import { SpotModal } from '../SpotModal/SpotModal';
import { CitySelector } from '../CitySelector/CitySelector';
import { SpinnerList } from '../SpinnerList/SpinnerList';
import { $isShowCity } from '../CitySelector/model';
import { GuideOverlay } from '../GuideOverlay/GuideOverlay';
import { useOpenSpot } from '@/hooks/useOpenSpot';
import { AcceptDocs } from '../AcceptDocs/AcceptDocs';
import { $isShowAcceptDocs, AcceptDoscType } from '../AcceptDocs/model';
import { $isLoadingAppData } from '@/pages/CatalogPage/model';
import { initClosingBehavior } from '@telegram-apps/sdk';

import './Layout.css';

// const useHandleBackButton = (handleBack: any) => {
//   useEffect(() => {
//     const onPopState = (event: any) => {
//       handleBack(event);
//     };
//     window.addEventListener('popstate', onPopState);
//     return () => {
//       window.removeEventListener('popstate', onPopState);
//     };
//   }, [handleBack]);
// };

export const Layout: FC = () => {
  const redirectAllow = useRef(true);
  const initData = useInitData();
  const [closingBehavior] = initClosingBehavior();

  closingBehavior.enableConfirmation();

  const isLoadingSettingsData = useUnit($isLoadingSettingsData);
  const isLoadingAppData = useUnit($isLoadingAppData);
  const isLoadingUser = useUnit($isLoadingUser);

  const isShowAcceptDocs = useUnit($isShowAcceptDocs);
  const isShowCity = useUnit($isShowCity);
  const isShowGuide = useUnit($isShowStepperGuide);
  // const spotVisible = useUnit($spotVisible);

  const { openSpot } = useOpenSpot();

  const userData = useMemo(() => {
    return initData && initData.user ? initData.user : undefined;
  }, [initData]);

  const startParam = useMemo(() => {
    return initData && initData.startParam ? initData.startParam : undefined;
  }, [initData]);

  useEffect(() => {
    onChangeUserData(userData);
    
    if (startParam) {
      const parsedParam = startParam.split('_');
      const left = parsedParam[0];
      const right = parsedParam[1];
      const isSpotPage = left === 'spotId';

      if (isSpotPage && right && redirectAllow.current) {
        redirectAllow.current = false;
        
        setTimeout(() => {
          openSpot(right);
        }, 0);
      }
    }
  }, []);

  // useHandleBackButton((event: any) => {
  //   if (spotVisible) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     onChangeSpotVisible(null);
  //   }
  // });

  if (isLoadingSettingsData || isLoadingAppData || isLoadingUser) {
    return <SpinnerList />;
  }

  if (isShowAcceptDocs !== AcceptDoscType.HIDE) {
    return <AcceptDocs type={isShowAcceptDocs} />;
  }

  if (isShowCity) {
    return <CitySelector />;
  }

  return (
    <>
      <YandexMetrika />

      <div
        // style={{ overflow: spotVisible ? 'hidden' : 'initial' }}
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

      {isShowGuide && <GuideOverlay />}
    </>
  );
};
