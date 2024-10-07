import { useUnit } from "effector-react";
import { Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { $isViewAsMap, onChangeIsViewAsMap } from "../model";

export const FiltersToggle: FC = () => {
  const isViewAsMap = useUnit($isViewAsMap);
  const { platform } = useLaunchParams();
  const isIos = platform === 'ios';

  const onClickToggle = () => {
    onChangeIsViewAsMap(!isViewAsMap);
  }

  return (
    <div
      style={{
        margin: '10px',
        zIndex: 50,
        position: 'fixed',
        right: 0,
        bottom: isIos ? '80px' : '60px',
      }}
    >
      <Button
        mode="filled"
        size="m"
        style={{
          gap: 0,
          // backgroundColor: 'grey',
          opacity: isViewAsMap ? 1 : 0.7,
          borderRadius: '12px 0 0 12px'
        }}
        // onClick={onClick}
        onClick={onClickToggle}
      >
        Карта
      </Button>

      <Button
        mode="filled"
        size="m"
        style={{
          gap: 0,
          // backgroundColor: 'grey',
          opacity: !isViewAsMap ? 1 : 0.7,
          borderRadius: '0 12px 12px 0'
        }}
        onClick={onClickToggle}
      >
        Список
      </Button>
    </div>
  );
};
