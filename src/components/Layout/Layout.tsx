import { type FC } from 'react';
import { Tabbar } from '../Tabbar/Tabbar';
import { routes } from '@/navigation/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { YandexMetrika } from '../YandexMetrika/YandexMetrika';
import { SpinnerList } from '../SpinnerList/SpinnerList';
import { useFakeLoading } from '@/hooks/useFakeLoading';

export const Layout: FC = () => {
  const { loading } = useFakeLoading(1000);

  return (
    <>
      <YandexMetrika />

      {loading ? (
        <SpinnerList />
      ) : (
        <>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
              <Route path='*' element={<Navigate to='/'/>}/>
          </Routes>

          <Tabbar />
        </>
      )}
    </>
  );
};
