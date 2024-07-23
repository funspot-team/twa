import { Modal, Tabbar as UITabbar } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Icon28Burger } from '@/icons/burger';
import { Icon28Heart } from '@/icons/heart';
import { Icon28Globe } from '@/icons/globe';
import { Icon28Catalogue } from '@/icons/catalogue';
import { ROUTE_NAMES } from '@/navigation/routes';
import { useHapticFeedback, useLaunchParams } from '@telegram-apps/sdk-react';
import { UserMenu } from '../UserMenu/UserMenu';
import { ModalHeader } from '../ModalHeader/ModalHeader';

const tabs = [
  {
    path: ROUTE_NAMES.MAIN_ROUTE,
    Icon: Icon28Catalogue,
    text: 'Каталог',
  },
  {
    path: ROUTE_NAMES.MAP_ROUTE,
    Icon: Icon28Globe,
    text: 'Карта',
  },
  {
    path: ROUTE_NAMES.FAVOURITES_ROUTE,
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
          zIndex: 40,
          paddingBottom: isIos ? '20px' : '0',
          pointerEvents: 'all'
        }}
      >
        {tabs.map(({
          path,
          text,
          Icon
        }) => <UITabbar.Item
            key={path}
            text={text}
            selected={location.pathname === path}
            onClick={() => clickHandler(path)}
          >
              <Icon />
          </UITabbar.Item>)}
      </UITabbar>

      <Modal
        style={{ zIndex: 50, background: 'var(--tg-theme-secondary-bg-color, white)' }}
        header={<ModalHeader
          title="Меню"
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
