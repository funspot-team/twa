import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect } from 'react';
import { Router } from '@/navigation/router';

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    miniApp.ready();
  }, []);

  return (
    <AppRoot
      appearance={miniApp.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <Router />
    </AppRoot>
  );
};
