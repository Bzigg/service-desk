import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Page } from 'widgets/Page/Page';
import { useNavigate, useParams } from 'react-router-dom';
import cls from './TicketEditPage.module.scss';
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { useForm } from 'react-hook-form'
import { Input } from 'shared/ui/Input/Input'

interface ArticleEditPageProps {
    className?: string;
}

const TicketEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);

    const { control, handleSubmit} = useForm()

    const onSubmit = useCallback((values: any) => {
        console.log(values)
    }, [])

    return (
        <Page className={classNames(cls.TicketEditPage, {}, [className])}>
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
            <form className={cls.Form} onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Заголовок"
                    rules={{
                        required: 'Введите заголовок'
                    }}
                    control={control}
                    name="title"
                    type="text"
                    placeholder="Введите заголовок"
                />
                <Input
                    label="Описание"
                    rules={{
                        required: 'Введите описание'
                    }}
                    control={control}
                    name="description"
                    type="text"
                    placeholder="Введите описание"
                />
                <Input
                    label="Здание"
                    rules={{
                        required: 'Введите номер здания'
                    }}
                    control={control}
                    name="building"
                    type="text"
                    placeholder="Введите номер здания"
                />
                <Input
                    label="Кабинет"
                    rules={{
                        required: 'Введите номер кабинета'
                    }}
                    control={control}
                    name="cabinet"
                    type="text"
                    placeholder="Введите номер кабинета"
                />
                <Input
                    label="Телефон"
                    rules={{
                        required: 'Введите телефон'
                    }}
                    control={control}
                    name="phone"
                    type="text"
                    placeholder="Введите телефон"
                />
            </form>
        </Page>
    );
});

export default TicketEditPage;
