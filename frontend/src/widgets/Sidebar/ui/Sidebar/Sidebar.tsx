import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useMemo, useState } from 'react'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import cls from './Sidebar.module.scss'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const sidebarItemsList = useSelector(getSidebarItems);


    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            key={item.path}
        />
    )), [sidebarItemsList]);

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, {} , [className])}
        >
            <div className={cls.items}>
                {itemsList}
            </div>
        </aside>
    );
});
