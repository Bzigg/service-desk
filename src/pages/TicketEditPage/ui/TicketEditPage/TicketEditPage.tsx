import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page/Page'
import { useParams } from 'react-router-dom'
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
            <h2 className={cls.title}>{isEdit ? 'Редактирование заявки' : 'Создание новой заявки'}</h2>
            <TicketEditForm id={id as string} />
        </Page>
    );
});

export default TicketEditPage;
