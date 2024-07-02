import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page/Page'
import { useParams } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { TicketEditForm } from 'features/tickets/ui/TicketEditForm/TicketEditForm'
import cls from './TicketEditPage.module.scss'

interface ArticleEditPageProps {
    className?: string;
}

const TicketEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.TicketEditPage, {}, [className])}>
            {isEdit && (
                <AppLink to={`${RoutePath.ticket_details}${id}`}>
                    <Button theme={ButtonTheme.OUTLINE}>
                        Отмена
                    </Button>
                </AppLink>
            )}
            <span>{isEdit ? 'Редактирование заявки' : 'Создание новой заявки'}</span>
            <TicketEditForm id={id as string} />
        </Page>
    );
});

export default TicketEditPage;
