import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { Logo } from 'shared/ui/Logo/Logo';
import { useGetUserDataQuery } from 'features/editableProfileCard';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useGetPhoto } from 'shared/lib/hooks/useGetPhoto/useGetPhoto'

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = useCallback(() => {
        navigate(RoutePath.main);
        dispatch(userActions.logout());
    }, [dispatch, navigate]);

    const { data } = useGetUserDataQuery(authData?.id || '', {
        skip: !authData?.id,
    });

    const photoSrc = useGetPhoto(data?.photo || '');

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Logo />

                <Dropdown
                    direction="bottom left"
                    className={cls.dropdown}
                    items={[
                        {
                            content: 'Профиль',
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: 'Выйти',
                            onClick: onLogout,
                        },
                    ]}
                    trigger={
                        <div className={cls.trigger}>
                            {data && (
                                <Text
                                    size={TextSize.S}
                                    title={`${data?.firstName} ${data?.lastName?.[0]}.`}
                                    text={
                                        data?.isUser
                                            ? 'Пользователь'
                                            : 'Администратор'
                                    }
                                />
                            )}
                            <Avatar size={30} src={photoSrc} />
                        </div>
                    }
                />
            </header>
        );
    }

    return null;
});
