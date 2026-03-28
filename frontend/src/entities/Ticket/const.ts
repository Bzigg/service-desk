export type TStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

export const statusMapper: Record<TStatus, string> = {
    OPEN: 'Ожидает',
    IN_PROGRESS: 'В работе',
    COMPLETED: 'Завершена',
    REJECTED: 'Отклонена',
};
