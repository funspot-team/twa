import { useEffect, useState, type FC } from 'react';
import { Tabbar } from '../Tabbar/Tabbar';
import { routes } from '@/navigation/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { YandexMetrika } from '../YandexMetrika/YandexMetrika';
import { SpinnerList } from '../SpinnerList/SpinnerList';

export const Layout: FC = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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

          <Tabbar />
        </>
      )}
    </>
  );
};
