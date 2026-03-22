import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import { SidebarItemType } from '../../model/types/sidebar'
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
    item: SidebarItemType;
}

export const SidebarItem = memo(({ item }: SidebarItemProps) => {
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item)}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {item.text}
            </span>
        </AppLink>
    );
});
