import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Tag } from 'shared/ui/Tag/Tag';
import cls from './TicketItem.module.scss';
import statusIcon from './icons/Status.png';

interface IProps {
    ticket: any;
}

export const TicketItem: FC<IProps> = ({ ticket }) => {
    const navigate = useNavigate();

    const open = useCallback(() => {
        navigate(`${RoutePath.ticket_details}${ticket.id}`);
    }, [ticket?.id]);

    return (
        <div className={cls.Ticket}>
            <img className={cls.StatusIcon} src={statusIcon} alt="" />
            <div className={cls.Content}>
                <div className={cls.Info}>
                    <div className={cls.HeaderInfo}>
                        <div className={cls.HeaderTitle}>Сломался принтер</div>
                        <Tag />
                    </div>
                    <div>123</div>
                    <div>Принтер не печатает</div>
                </div>
                <Button
                    onClick={open}
                    theme={ButtonTheme.CLEAR}
                    className={cls.buttons}
                >
                    Перейти
                </Button>
            </div>
        </div>
    );
};
