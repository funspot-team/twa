/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState, type FC } from 'react';
import { LastItem } from '@/components/LastItem/LastItem';
import { Button, Cell, IconButton, Input, List, Section, Tappable } from '@telegram-apps/telegram-ui';
import { Icon24Close } from '@telegram-apps/telegram-ui/dist/icons/24/close';
import { $groups, $isLoadingGroups, createGroup, deleteGroup, fetchGroups } from './model';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { Icon28Remove } from '@/icons/remove';
import { SpinnerList } from '@/components/SpinnerList/SpinnerList';

export const FavoriteGroupsPage: FC = () => {
  const navigate = useNavigate();

  const groups = useUnit($groups);
  const isLoading = useUnit($isLoadingGroups);
  const [name, setName] = useState('');

  const onCreateGroup = async () => {
    // @ts-ignore
    createGroup(name);
    setName('');
  };

  const onRemoveGroup = (e: SyntheticEvent, id: number) => {
    // @ts-ignore
    deleteGroup(id);
    e.stopPropagation();
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  if (isLoading) return <SpinnerList />;

  return (
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
                  onClick={(e) => onRemoveGroup(e, group.id)}
                >
                  <Icon28Remove />
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
          value={name}
          placeholder="Название подборки"
          onChange={(e) => setName(e.target.value)}
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
  );
};
