import { lazy } from 'react';

export const TicketDetailsPageAsync = lazy(
    () => import('./TicketDetailsPage'),
);
