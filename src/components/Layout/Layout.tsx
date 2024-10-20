/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { $spotVisible, onChangeSpotVisible } from '@/pages/ItemPage/model';
import { ItemPage } from '@/pages/ItemPage/ItemPage';
import { Modal } from '@telegram-apps/telegram-ui';

const useHandleBackButton = (handleBack: any) => {
  useEffect(() => {
    const onPopState = (event: any) => {
      handleBack(event);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [handleBack]);
};

export const Layout: FC = () => {
  const redirectAllow = useRef(true);
  const navigate = useNavigate();
  const initData = useInitData();

  const isShowGuide = useUnit($isShowStepperGuide);
  const spotVisible = useUnit($spotVisible);
  // const restoreScroll = useUnit($restoreScroll);

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

  // useEffect(() => {
  //   if (!spotVisible) {
  //       window.scrollTo(0, restoreScroll);
  //   }
  // }, [spotVisible]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 500);
  // }, []);

  useHandleBackButton((event: any) => {
    if (spotVisible) {
      event.preventDefault();
      event.stopPropagation();

      onChangeSpotVisible(null);
    }
  });

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

      {/* {spotVisible && 
        <div
          style={{
            position: 'fixed',
            top: 0,
            background: 'var(--tg-theme-secondary-bg-color, white)',
            zIndex: 1,
            overflowY: 'auto',
            height: '100vh',
            width: '100%',
            opacity: 0.4,
          }}
        >
          <ItemPage />
        </div>
      } */}
      <Modal
        // header={<ModalHeader />}
        open={!!spotVisible}
        // onOpenChange={() => onChangeSpotVisible(null)}
        onOpenChange={(isOpen) => {
          if (!isOpen) onChangeSpotVisible(null);
        }}
        style={{ zIndex: 70 }}
      >
        <ItemPage />
      </Modal>

      <AddFavouriteModal />

      <Snackbar />
      
      <Tabbar />
    </>
  );
};
