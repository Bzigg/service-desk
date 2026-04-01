import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { TicketForm } from 'features/tickets/ui/TicketForm/TicketForm';
import { Text, TextAlign } from 'shared/ui/Text/Text';

import cls from './TicketPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const TicketPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.TicketPage, {}, [className])}>
            <Text
                title={
                    isEdit ? 'Редактирование заявки' : 'Создание новой заявки'
                }
                align={TextAlign.CENTER}
            />
            <TicketForm id={id as string} />
        </Page>
    );
});

export default TicketPage;
