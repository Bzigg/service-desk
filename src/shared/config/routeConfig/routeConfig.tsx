import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AllTicketsPage } from 'pages/AllTicketsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { TicketDetailsPage } from 'pages/TicketDetailsPage';
import { TicketEditPage } from 'pages/TicketEditPage';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { UserRole } from 'entities/User';
import { ForbiddenPage } from 'pages/ForbiddenPage';
import { MyTicketsPage } from 'pages/MyTicketsPage'

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
}

export enum AppRoutes {
    MAIN = 'main',
    // ABOUT = 'about',
    MY_TICKETS = 'my_tickets',
    ALL_TICKETS = 'all_tickets',
    TICKET_DETAILS = 'ticket_details',
    TICKET_CREATE = 'ticket_create',
    TICKET_EDIT = 'ticket_edit',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    // ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    // [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MY_TICKETS]: '/tickets/my',
    [AppRoutes.ALL_TICKETS]: '/tickets/all',
    [AppRoutes.TICKET_DETAILS]: '/tickets/', // + :id
    [AppRoutes.TICKET_CREATE]: '/tickets/create',
    [AppRoutes.TICKET_EDIT]: '/tickets/my/:id/edit',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    // [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
    [AppRoutes.ARTICLE_CREATE]: '/articles/new',
    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/forbidden',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.MY_TICKETS]: {
        path: RoutePath.my_tickets,
        element: <MyTicketsPage />,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.ALL_TICKETS]: {
        path: RoutePath.all_tickets,
        element: <AllTicketsPage />,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.TICKET_DETAILS]: {
        path: `${RoutePath.ticket_details}:id`,
        element: <TicketDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.TICKET_CREATE]: {
        path: `${RoutePath.ticket_create}`,
        element: <TicketEditPage />,
        authOnly: true,
        roles: [UserRole.USER],
    },
    [AppRoutes.TICKET_EDIT]: {
        path: `${RoutePath.ticket_edit}`,
        element: <TicketEditPage />,
        authOnly: true,
        roles: [UserRole.USER],
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    // [AppRoutes.ARTICLE_DETAILS]: {
    //     path: `${RoutePath.article_details}:id`,
    //     element: <TicketDetailsPage />,
    //     authOnly: true,
    // },
    [AppRoutes.ARTICLE_CREATE]: {
        path: `${RoutePath.article_create}`,
        element: <TicketEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: `${RoutePath.article_edit}`,
        element: <TicketEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: `${RoutePath.admin_panel}`,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: `${RoutePath.forbidden}`,
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
