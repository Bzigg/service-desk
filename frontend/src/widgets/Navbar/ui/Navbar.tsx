import { classNames } from 'shared/lib/classNames/classNames'
import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getUserAuthData, userActions, isUserSelector
} from 'entities/User'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import cls from './Navbar.module.scss'
import { useNavigate } from 'react-router-dom'
import { Logo } from 'shared/ui/Logo/Logo'

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isUser = useSelector(isUserSelector);
    const navigate = useNavigate();

    const onLogout = useCallback(() => {
        navigate(RoutePath.main)
        dispatch(userActions.logout());
    }, [dispatch, navigate]);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Logo/>
                {isUser ?
                    <AppLink
                        to={RoutePath.ticket_create}
                        theme={AppLinkTheme.SECONDARY}
                        className={cls.headerButton}
                    >
                        Создать заявку
                    </AppLink>
                    :
                    <AppLink
                        to={RoutePath.admin_panel}
                        theme={AppLinkTheme.SECONDARY}
                        className={cls.headerButton}
                    >
                        Администрирование корпусов
                    </AppLink>
                }
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
                    trigger={<Avatar size={30} src={authData.avatar} />}
                />
            </header>
        );
    }

    return null;
});
