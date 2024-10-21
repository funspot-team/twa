import { useState, type FC } from 'react';
import { useUnit } from 'effector-react';
import { $spotVisible, onChangeSpotVisible } from '@/pages/ItemPage/model';
import { ItemPage } from '@/pages/ItemPage/ItemPage';
import { Modal } from '@telegram-apps/telegram-ui';

import './SpotModal.css';

export const SpotModal: FC = () => {
  const spotVisible = useUnit($spotVisible);
  const [isShowMap, setIsShowMap] = useState(false);

  return (
    <Modal
      open={!!spotVisible}
      onOpenChange={(isOpen) => {
        if (!isOpen) onChangeSpotVisible(null);
      }}
      style={{ zIndex: 70 }}
      className="spot-modal"
      dismissible={!isShowMap}
    >
      <ItemPage isShowMap={isShowMap} onShowMap={setIsShowMap} />
    </Modal>
  );
};
