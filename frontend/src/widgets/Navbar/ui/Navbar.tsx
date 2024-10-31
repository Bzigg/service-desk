import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, userActions, isUserSelector
} from 'entities/User';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';
import { RegistrationModal } from 'features/RegistrationUser/ui/RegistrationModal/RegistrationModal'
import { useNavigate } from 'react-router-dom'
import { Logo } from 'shared/ui/Logo/Logo'

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isRegistrationModal, setIsRegistrationModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isUser = useSelector(isUserSelector);
    const navigate = useNavigate();

    const onCloseAuthModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onCloseRegistrationModal = useCallback(() => {
        setIsRegistrationModal(false);
    }, []);

    const onShowAuthModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onShowRegistrationModal = useCallback(() => {
        setIsRegistrationModal(true);
    }, []);

    const onLogout = useCallback(() => {
        navigate(RoutePath.main)
        dispatch(userActions.logout());
    }, [dispatch]);

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
                            content: t('Профиль'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('Выйти'),
                            onClick: onLogout,
                        },
                    ]}
                    trigger={<Avatar size={30} src={authData.avatar} />}
                />
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Logo/>
            <div className="buttons">
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onShowAuthModal}
                >
                    {t('Войти')}
                </Button>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={`${cls.links} ml8`}
                    onClick={onShowRegistrationModal}
                >
                    {t('Регистрация')}
                </Button>
            </div>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseAuthModal}
                />
            )}
            {isRegistrationModal && (
                <RegistrationModal
                    isOpen={isRegistrationModal}
                    onClose={onCloseRegistrationModal}
                />
            )}
        </header>
    );
});
