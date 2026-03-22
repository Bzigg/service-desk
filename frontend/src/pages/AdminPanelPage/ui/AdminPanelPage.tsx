import React, { useCallback, useState } from 'react';
import { Page } from 'widgets/Page/Page';
import { buildingsApi } from 'entities/Building/model/buildingsApi';
import { BuildingModal } from 'features/BuildingModal'
import { Button } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import cls from './AdminPanelPage.module.scss';

const AdminPanelPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { data } = buildingsApi.useGetBuildingsQuery();

    const [addBuilding] = buildingsApi.useAddBuildingMutation();

    return (
        <Page>
            <div className={cls.header}>
                <Text title="Администрирование корпусов" text="Настройки и управление строениями" />
                <Button onClick={() => setIsOpen(true)}>
                    Добавить корпус
                </Button>
            </div>
            {data?.map((building: any) => {
                return (
                    <div key={building.id}>
                        {`ул. ${building.street}, дом ${building.building} - ${building.name}`}
                    </div>
                );
            })}
            <BuildingModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={addBuilding} />
        </Page>
    );
};

export default AdminPanelPage;
