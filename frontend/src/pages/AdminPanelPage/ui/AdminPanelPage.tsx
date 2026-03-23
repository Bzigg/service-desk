import React, { useState } from 'react';
import { Page } from 'widgets/Page/Page';
import { BuildingCard, buildingsApi } from 'entities/Building';
import { BuildingModal } from 'features/BuildingModal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './AdminPanelPage.module.scss';
import { Empty } from 'shared/ui/Empty/Empty';

const AdminPanelPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data } = buildingsApi.useGetBuildingsQuery();

    const [addBuilding] = buildingsApi.useAddBuildingMutation();

    const onSubmit = async (values: any) => {
        try {
            await addBuilding(values).unwrap();
            setIsOpen(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Page>
            <div className={cls.header}>
                <Text
                    title="Администрирование корпусов"
                    text="Настройки и управление строениями"
                />
                <div>
                    <Button onClick={() => setIsOpen(true)}>
                        Добавить корпус
                    </Button>
                </div>
            </div>
            {data?.length ? (
                <div className={cls.list}>
                    {data?.map((building: any) => {
                        return <BuildingCard key={building.id} {...building} />;
                    })}
                </div>
            ) : (
                <Empty description="Вы еще не добавили ни одного строения">
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={() => setIsOpen(true)}
                    >
                        Добавить корпус
                    </Button>
                </Empty>
            )}

            <BuildingModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={onSubmit}
            />
        </Page>
    );
};

export default AdminPanelPage;
