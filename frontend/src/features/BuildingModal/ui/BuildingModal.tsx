import React, { useCallback } from 'react';
import { Modal, ModalProps } from 'shared/ui/Modal/Modal';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { useForm } from 'react-hook-form';
import cls from './BuildingModal.module.scss';

type BuildingModalProps = ModalProps & { onSubmit: any; defaultValues?: any };

export const BuildingModal = ({
    onSubmit,
    defaultValues,
    ...props
}: BuildingModalProps) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues,
    });

    const save = useCallback(
        (values: any) => {
            onSubmit(values)
                .then(() => {
                    reset();
                });
        },
        [onSubmit],
    );

    return (
        <Modal {...props}>
            <form className={cls.form} onSubmit={handleSubmit(save)}>
                <Input
                    label="Улица"
                    rules={{
                        required: 'Введите улицу',
                    }}
                    control={control}
                    name="street"
                    type="text"
                    className="mt8"
                    placeholder="Введите улицу"
                />
                <Input
                    label="Номер строения"
                    rules={{
                        required: 'Введите номер строения',
                    }}
                    control={control}
                    name="building"
                    type="text"
                    className="mt8"
                    placeholder="Введите номер строения"
                />
                <Input
                    label="Название строения"
                    rules={{
                        required: 'Введите название строения',
                    }}
                    control={control}
                    name="name"
                    type="text"
                    className="mt8"
                    placeholder="Корпус, административное здание и тд"
                />
                <Button className="mt8" type="submit">
                    {defaultValues ? 'Сохранить' : 'Добавить'}
                </Button>
            </form>
        </Modal>
    );
};
