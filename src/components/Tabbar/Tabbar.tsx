import { Modal, Tabbar as UITabbar } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Icon28Burger } from '@/icons/burger';
import { Icon28Heart } from '@/icons/heart';
import { Icon28Catalogue } from '@/icons/catalogue';
import { ROUTE_NAMES } from '@/navigation/routes';
import { useHapticFeedback, useLaunchParams } from '@telegram-apps/sdk-react';
import { UserMenu } from '../UserMenu/UserMenu';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { Icon28Lightbulb } from '@/icons/lightbulb';
import { $userData } from '../Layout/model';
import { useUnit } from 'effector-react';

const tabs = [
  {
    path: ROUTE_NAMES.MAIN_ROUTE,
    Icon: Icon28Lightbulb,
    text: 'Главная',
  },
  {
    path: ROUTE_NAMES.CATALOGUE_ROUTE,
    Icon: Icon28Catalogue,
    text: 'Каталог',
  },
  {
    path: ROUTE_NAMES.FAVOURITE_GROUPS_ROUTE,
    Icon: Icon28Heart,
    text: 'Избранное',
  },
  {
    path: ROUTE_NAMES.USER_ROUTE,
    Icon: Icon28Burger,
    text: 'Меню',
  },
];

export const Tabbar: FC = () => {
  const haptic = useHapticFeedback();
  const { platform } = useLaunchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [isShowUserMenu, setIsShowUserMenu] = useState(false);
  const { username } = useUnit($userData);

  const clickHandler = (path: string) => {
    if (path === ROUTE_NAMES.USER_ROUTE) {
      setIsShowUserMenu(true);
    } else {
      navigate(path);
    }

    haptic.selectionChanged();
  }

  useEffect(() => {
    setIsShowUserMenu(false);
  }, [location]);

  const isIos = platform === 'ios';

  return (
    <>
      <UITabbar
        style={{
          zIndex: 90,
          paddingBottom: isIos ? '20px' : '0',
          pointerEvents: 'all'
        }}
      >
        {tabs.map(({
          path,
          text,
          Icon
        }) => {
          const match = useMatch(path);
          const contained = location.pathname.startsWith(path);
          const isMainPage = path === ROUTE_NAMES.MAIN_ROUTE;

          return (
            <UITabbar.Item
              key={path}
              text={text}
              selected={!!match || (contained && !isMainPage)}
              onClick={() => clickHandler(path)}
            >
                <Icon />
            </UITabbar.Item>
          );
        })}
      </UITabbar>

      <Modal
        style={{ zIndex: 100, background: 'var(--tg-theme-secondary-bg-color, white)' }}
        header={<ModalHeader
          title={username}
          onClose={() => setIsShowUserMenu(false)}
        />}
        open={isShowUserMenu}
        onOpenChange={setIsShowUserMenu}
        >
        <UserMenu />

        <div style={{ width: '100%', height: '40px' }}></div>
      </Modal>
    </>
  );
};
