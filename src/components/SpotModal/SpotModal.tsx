/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FC } from 'react';
import { useUnit } from 'effector-react';
import { $isLoadingSpot, $spot, $spotVisible, onChangeSpotVisible } from '@/pages/ItemPage/model';
import { ItemPage } from '@/pages/ItemPage/ItemPage';
import { Modal } from '@telegram-apps/telegram-ui';

import './SpotModal.css';
import { SpinnerList } from '../SpinnerList/SpinnerList';

// const useHandleBackButton = (handleBack: any) => {
//   useEffect(() => {
//     const onPopState = (event: any) => {
//       handleBack(event);
//     };
//     window.addEventListener('popstate', onPopState);
//     return () => {
//       window.removeEventListener('popstate', onPopState);
//     };
//   }, [handleBack]);
// };

export const SpotModal: FC = () => {
  const spotVisible = useUnit($spotVisible);
  const [isShowMap, setIsShowMap] = useState(false);
  const isLoadingSpot = useUnit($isLoadingSpot);
  const spot = useUnit($spot);

  // useHandleBackButton((event: any) => {
  //   if (spotVisible) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     onChangeSpotVisible(null);
  //   }
  // });
  const renderSpotPage = () => {
    if (!spot || !spotVisible) return null;

    if (isLoadingSpot) {
      return <div style={{
        height: '800px'
      }}>
        <SpinnerList />
      </div>;
    }
    
    return <ItemPage spot={spot} isShowMap={isShowMap} onShowMap={setIsShowMap} />;
  }

  return (
    <Modal
      open={!!spotVisible}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onChangeSpotVisible(null);
        }
      }}
      style={{ zIndex: 91 }} // 70
      className="spot-modal"
      dismissible={false}
    > 
      {renderSpotPage()}
    </Modal>
  );
};
