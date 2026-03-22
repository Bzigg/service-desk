import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData, isAdminSelector, isUserSelector } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import BuildingIcon from 'shared/assets/icons/building-20-20.svg';
import PlusIcon from 'shared/assets/icons/plus-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    isUserSelector,
    isAdminSelector,
    (userData, isUserSelector, isUserAdmin) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
        ];

        if (isUserSelector) {
            sidebarItemsList.push({
                path: RoutePath.ticket_create,
                Icon: PlusIcon,
                text: 'Создать заявку',
                authOnly: true,
            });
        }

        if (userData) {
            sidebarItemsList.push({
                path: RoutePath.my_tickets,
                Icon: ArticleIcon,
                text: 'Мои заявки',
                authOnly: true,
            });
        }

        if (isUserAdmin) {
            sidebarItemsList.push({
                path: RoutePath.all_tickets,
                Icon: AboutIcon,
                text: 'Все заявки',
            });
        }

        if (isUserAdmin) {
            sidebarItemsList.push({
                path: RoutePath.admin_panel,
                Icon: BuildingIcon,
                text: 'Корпуса',
            });
        }

        return sidebarItemsList;
    },
);
