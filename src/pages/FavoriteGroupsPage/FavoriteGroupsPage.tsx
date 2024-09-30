/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FC } from 'react';
import { LastItem } from '@/components/LastItem/LastItem';
import { Button, Cell, IconButton, Input, List, Modal, Section, Tappable } from '@telegram-apps/telegram-ui';
import { Icon24Close } from '@telegram-apps/telegram-ui/dist/icons/24/close';
import { $groups, $isLoadingGroups, createGroup, deleteGroup, fetchGroups } from './model';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { onChangeSnackbar } from '@/components/Snackbar/model';
import { Icon28Ellipsis } from '@/icons/ellipsis';
import { ModalHeader } from '@/components/ModalHeader/ModalHeader';

export const FavoriteGroupsPage: FC = () => {
  const navigate = useNavigate();

  const groups = useUnit($groups);
  const isLoading = useUnit($isLoadingGroups);
  const [name, setName] = useState('');
  const [isError, setError] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [idToRemove, setIdToRemove] = useState(null);

  const onCreateGroup = async () => {
    if (!name) {
      document.querySelector('input')?.focus();
      setError(true);

      return;
      // onChangeSnackbar({
      //   isShow: true,
      //   title: 'Добавьте название подборки',
      //   description: '',
      //   spotId: null,
      //   isDelete: false,
      // });
    }
    // @ts-ignore
    createGroup(name);
    setName('');
  };

  const onRemoveGroup = () => {
    // @ts-ignore
    deleteGroup(idToRemove);
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  if (isLoading) return <SpinnerList />;

  return (
    <>
      <List>
        {groups && groups.length > 0 && (
          <Section header="Мои подборки">
            {groups.map((group: any) => (
              <Cell
                key={group.id}
                onClick={() => {
                  navigate('/favourite-groups/' + group.id);
                }}
                after={
                  <IconButton
                    mode="plain"
                    size="l"
                    onClick={(e) => {
                      setIdToRemove(group.id);
                      setIsShowModal(true);
                      e.stopPropagation();
                    }}
                  >
                    <Icon28Ellipsis />
                  </IconButton>
                }
                multiline
              >
                {group.name}
              </Cell>
            ))}
          </Section>
        )}

        <Section header="Добавить новую подборку">
          <Input
            autoFocus
            id="favorite-groups-input"
            value={name}
            placeholder="Название подборки"
            status={isError ? 'error' : undefined}
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
            }}
            after={(
              <Tappable
                Component="div"
                style={{ display: 'flex' }}
                onClick={() => setName('')}
              >
                <Icon24Close />
              </Tappable>
            )}
          />
        </Section>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            mode="filled"
            size="m"
            onClick={onCreateGroup}
          >
            Создать
          </Button>
        </div>

        <LastItem />
      </List>

      <Modal
        header={<ModalHeader
          title="Удалить подборку?"
          onClose={() => setIsShowModal(false)}
        />}
        open={isShowModal}
        onOpenChange={setIsShowModal}
        style={{ zIndex: 30 }}
      >
        <div
          style={{
            gap: '16px',
            display: 'flex',
            justifyContent: 'center',

          }}
        >
          <Button
            mode="gray"
            size="m"
            onClick={() => {
              onRemoveGroup();
              setIsShowModal(false);
              setIdToRemove(null);
            }}
          >
            Удалить
          </Button>

          <Button
            mode="filled"
            size="m"
            onClick={() => setIsShowModal(false)}
          >
            Отменить
          </Button>
        </div>

        <LastItem />
      </Modal>
    </>
  );
};
