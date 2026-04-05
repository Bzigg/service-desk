import React from 'react';
import { Modal, ModalProps } from 'shared/ui/Modal/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './DeleteBuildingModal.module.scss';

type DeleteBuildingModalProps = ModalProps & {
    onConfirm: () => void;
    buildingName?: string;
};

export const DeleteBuildingModal = ({
    onConfirm,
    onClose,
    buildingName,
    ...props
}: DeleteBuildingModalProps) => {
    return (
        <Modal onClose={onClose} {...props}>
            <div className={cls.content}>
                <Text title={`Удалить строение${buildingName ? ` "${buildingName}"` : ''}?`} />
                <Text text="Это действие нельзя отменить." />
                <div className={cls.buttons}>
                    <Button theme={ButtonTheme.OUTLINE} onClick={onClose}>
                        Отмена
                    </Button>
                    <Button onClick={onConfirm}>
                        Удалить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
