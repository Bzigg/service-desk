import cls from './BuildingCard.module.scss';
import { Text } from 'shared/ui/Text/Text';
import BuildingIcon from 'shared/assets/icons/building-20-20.svg';
import LocationIcon from 'shared/assets/icons/location-20-20.svg';
import CrossIcon from 'shared/assets/icons/cross-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { BuildingModal } from 'features/BuildingModal';
import React, { useState } from 'react';
import { buildingsApi } from '../../model/buildingsApi';

export const BuildingCard = ({ id, street, building, name }: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [changeBuilding] = buildingsApi.useChangeBuildingMutation();
    const [deleteBuilding] = buildingsApi.useDeleteBuildingMutation();

    const onSubmit = async (values: any) => {
        try {
            await changeBuilding({
                id: String(id),
                data: values,
            }).unwrap();
            setIsOpen(false);
        } catch (e) {
            console.error('Не удалось обновить строение', e);
            throw e;
        }
    };

    const onDeleteBuilding = async (id: string) => {
        try {
            await deleteBuilding(String(id)).unwrap();
        } catch (e) {
            console.error('Не удалось удалить строение', e);
        }
    };

    return (
        <div className={cls.BuildingCard}>
            <div className={cls.info}>
                <BuildingIcon className={cls.icon} />
                <div>
                    <Text title={name} />
                    <Text
                        text={
                            <div className={cls.location}>
                                <LocationIcon />
                                <div>
                                    ул. {street}, дом {building}
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
            <div className={cls.buttonWrapper}>
                <Button
                    onClick={() => setIsOpen(true)}
                    theme={ButtonTheme.OUTLINE}
                >
                    Редактировать
                </Button>

                <Button
                    onClick={() => onDeleteBuilding(id)}
                    theme={ButtonTheme.OUTLINE}
                >
                    <CrossIcon />
                </Button>
            </div>
            <BuildingModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={onSubmit}
                defaultValues={{
                    street,
                    building,
                    name,
                }}
            />
        </div>
    );
};
