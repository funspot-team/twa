/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonCell, Cell, IconContainer, List, Modal, Section } from '@telegram-apps/telegram-ui';
import { useEffect, type FC } from 'react';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { useUnit } from 'effector-react';
import { $isShowFavouriteModal, onChangeFavouriteModal } from './model';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Add } from '@/icons/add';
import { useNavigate } from 'react-router-dom';
import { SpinnerList } from '../SpinnerList/SpinnerList';
import { $groups, $isLoadingGroups, fetchGroups } from '@/pages/FavoriteGroupsPage/model';
import { addFavourite } from '@/pages/FavouritesPage/model';
import { ROUTE_NAMES } from '@/navigation/routes';
import { $userData } from '../Layout/model';
import { onChangeSnackbar } from '../Snackbar/model';
import { Icon24Folder } from '@/icons/folder';
import { onChangeSpotVisible } from '@/pages/ItemPage/model';

const FavoriteDefaultState = { isShow: false, spotId: null, title: '' };

export const AddFavouriteModal: FC = () => {
  const navigate = useNavigate();
  const { isShow: isShowModal, spotId, title } = useUnit($isShowFavouriteModal);
  const { id: userId } = useUnit($userData);
  const groups = useUnit($groups);
  const isLoadingGroups = useUnit($isLoadingGroups);

  useEffect(() => {
    if (userId) {
      fetchGroups();
    }
  }, [userId]);
  
  return (
    <>
      <Modal
        style={{ zIndex: 95, background: 'var(--tg-theme-secondary-bg-color, white)' }}
        header={
          <ModalHeader
            title="Добавить в подборку"
            onClose={() => onChangeFavouriteModal(FavoriteDefaultState)}
          />
        }
        open={isShowModal}
        onOpenChange={(isOpen) => {
          if (!isOpen) onChangeFavouriteModal(FavoriteDefaultState);
        }}
      >
        {isLoadingGroups ? (
          <SpinnerList />
        ) : (
          <List>
            {groups && groups.length > 0 && (
              <Section header='Мои подборки'>
                {groups.map((group: any) => (
                  <Cell
                    before={<IconContainer><Icon28Add /></IconContainer>}
                    key={group.id}
                    after={<Icon16ChevronRight />}
                    onClick={() => {
                      // @ts-ignore
                      addFavourite({ spot: spotId, group: Number(group.id) });

                      onChangeFavouriteModal(FavoriteDefaultState);

                      onChangeSnackbar({
                        isShow: true,
                        title,
                        description: 'Добавлено в подборку',
                        spotId,
                        isDelete: false,
                      });
                    }}
                  >
                    {group.name}
                  </Cell>
                ))}
              </Section>
            )}

            <Section>
              <ButtonCell
                before={<Icon24Folder />}
                interactiveAnimation="opacity"
                mode="default"
                onClick={() => {
                  onChangeFavouriteModal(FavoriteDefaultState);
                  onChangeSpotVisible(null);
                  navigate(ROUTE_NAMES.FAVOURITE_GROUPS_ROUTE);
                }}
              >
                Добавить новую подборку
              </ButtonCell>
            </Section>
          </List>
        )}

        <div style={{ width: '100%', height: '40px' }}></div>
      </Modal>
    </>
  );
};
