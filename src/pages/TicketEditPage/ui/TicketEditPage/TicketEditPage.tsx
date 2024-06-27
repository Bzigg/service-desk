import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Page } from 'widgets/Page/Page';
import { useNavigate, useParams } from 'react-router-dom';
import cls from './TicketEditPage.module.scss';
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'

interface ArticleEditPageProps {
    className?: string;
}

const TicketEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit && (
                <AppLink to={`${RoutePath.ticket_details}${id}`}>
                    <Button theme={ButtonTheme.OUTLINE}>
                        Отмена
                    </Button>
                </AppLink>
            )}
            {isEdit
                ? t('Редактирование заявки с ID = ') + id
                : t('Создание новой заявки')}
        </Page>
    );
});

export default TicketEditPage;
