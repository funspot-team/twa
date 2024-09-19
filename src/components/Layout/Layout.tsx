import { useEffect, useMemo, type FC } from 'react';
import { $isLoading, fetchCatalog, onChangeUserData } from './model';
import { Tabbar } from '../Tabbar/Tabbar';
import { routes } from '@/navigation/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { YandexMetrika } from '../YandexMetrika/YandexMetrika';
import { SpinnerList } from '../SpinnerList/SpinnerList';
import { useUnit } from 'effector-react';
import { AddFavouriteModal } from '../AddFavouriteModal/AddFavouriteModal';
import { useInitData } from '@telegram-apps/sdk-react';

export const Layout: FC = () => {
  const initData = useInitData();
  const isLoading = useUnit($isLoading);

  const userData = useMemo(() => {
    return initData && initData.user ? initData.user : undefined;
  }, [initData]);

  useEffect(() => {
    onChangeUserData(userData);
    fetchCatalog();
  }, []);

  return (
    <>
      <YandexMetrika />

      {isLoading ? (
        <SpinnerList />
      ) : (
        <>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
              <Route path='*' element={<Navigate to='/'/>}/>
          </Routes>

          <AddFavouriteModal />
          
          <Tabbar />
        </>
      )}
    </>
  );
};
