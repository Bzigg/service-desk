import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData, isAdminSelector } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    isAdminSelector,
    (userData, isUserAdmin) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.my_tickets,
                    Icon: ArticleIcon,
                    text: 'Мои заявки',
                    authOnly: true,
                },
            );
        }

        if (isUserAdmin) {
            sidebarItemsList.push(
                {
                    path: RoutePath.all_tickets,
                    Icon: AboutIcon,
                    text: 'Все заявки',
                },
            );
        }

        return sidebarItemsList;
    },
);
