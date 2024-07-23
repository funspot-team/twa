/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { useLocation } from 'react-router-dom';

export const YandexMetrika = () => {
  const location = useLocation();

  React.useEffect(() => {
    const url = `${location.pathname}`;
    // @ts-ignore
    ym(97751698, 'hit', url);
  }, [location]);

  return null;
}