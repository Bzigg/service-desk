import React, { useCallback } from 'react';
import { Modal, ModalProps } from 'shared/ui/Modal/Modal';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './RejectTicketModal.module.scss';

type RejectTicketModalProps = Omit<ModalProps, 'children'> & {
    onReject: () => void;
    isLoading?: boolean;
};

export const RejectTicketModal = (props: RejectTicketModalProps) => {
    const { isOpen, onClose, onReject, isLoading, className, lazy } = props;

    const onRejectClick = useCallback(() => {
        onReject();
    }, [onReject]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={className}
            lazy={lazy}
        >
            <div className={cls.modal}>
                <Text title="Отклонить заявку?" />
                <Text
                    theme={TextTheme.TERTIARY}
                    text="Заявка будет помечена как отклонённая. Действие нельзя отменить."
                />

                <div className={cls.actions}>
                    <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                    <Button
                        theme={ButtonTheme.BACKGROUND}
                        onClick={onRejectClick}
                        disabled={isLoading}
                    >
                        Отклонить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
