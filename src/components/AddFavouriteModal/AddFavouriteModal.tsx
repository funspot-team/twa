/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonCell, Cell, List, Modal, Section } from '@telegram-apps/telegram-ui';
import { useEffect, type FC } from 'react';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { useUnit } from 'effector-react';
import { $favouriteSnakbar, $isShowFavouriteModal, onChangeFavouriteModal, onChangeFavouriteSnackbar } from './model';
import { Icon16ChevronRight } from '@/icons/chevronRight';
import { Icon28Add } from '@/icons/add';
import { FavouriteSnackbarNew } from './components/FavouriteSnackbarNew';
import { useNavigate } from 'react-router-dom';
import { $groups, $isLoadingGroups, fetchGroups } from '../FavoriteGroups/model';
import { addFavourite } from '../Favourites/model';
import { SpinnerList } from '../SpinnerList/SpinnerList';

const FavoriteDefaultState = { isShow: false, spotId: null, title: '' };

export const AddFavouriteModal: FC = () => {
  const navigate = useNavigate();
  const { isShow: isShowModal, spotId, title } = useUnit($isShowFavouriteModal);
  const { isShow: isShowSnackbar, title: titleSnackbar, isDelete, spotId: spotIdSnackbar } = useUnit($favouriteSnakbar);
  const groups = useUnit($groups);
  const isLoadingGroups = useUnit($isLoadingGroups);

  useEffect(() => {
    fetchGroups();
  }, []);

  const undoHandler = () => {
    console.log('add spot ', spotIdSnackbar, ' ', titleSnackbar );
  }
  
  return (
    <>
      <Modal
        style={{ zIndex: 50, background: 'var(--tg-theme-secondary-bg-color, white)' }}
        header={
          <ModalHeader
            title="Добавить в подборку"
            onClose={() => onChangeFavouriteModal(FavoriteDefaultState)}
          />
        }
        open={isShowModal}
      >
        {isLoadingGroups ? (
          <SpinnerList />
        ) : (
          <List>
            <Section header='Мои подборки'>
              {groups && groups.length > 0 && groups.map((group: any) => (
                <Cell
                  key={group.id}
                  after={<Icon16ChevronRight />}
                  onClick={() => {
                    // @ts-ignore
                    addFavourite({ spot: spotId, group: Number(group.id) });

                    onChangeFavouriteModal(FavoriteDefaultState);

                    onChangeFavouriteSnackbar({
                      isShow: true,
                      title,
                      spotId,
                      isDelete: false,
                    });
                  }}
                >
                  {group.name}
                </Cell>
              ))}

              <ButtonCell
                before={<Icon28Add />}
                interactiveAnimation="opacity"
                mode="default"
                onClick={() => {
                  onChangeFavouriteModal(FavoriteDefaultState);
                  navigate('/selections/favorite-groups');
                }}
              >
                Добавить новую подборку
              </ButtonCell>
            </Section>
          </List>
        )}

        <div style={{ width: '100%', height: '40px' }}></div>
      </Modal>

      <FavouriteSnackbarNew
        isShowSnackbar={isShowSnackbar}
        title={titleSnackbar}
        isDelete={isDelete}
        onChangeFavouriteSnackbar={onChangeFavouriteSnackbar}
        undoHandler={undoHandler}
      />
    </>
  );
};
