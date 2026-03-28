import { useMemo } from 'react';

export const useGetPhoto = (photo?: string): string => {
    return useMemo(() => {
        if (!photo) {
            return '';
        }
        const base = __API__.replace(/\/$/, '');
        const path = photo.startsWith('/') ? photo : `/${photo}`;
        return `${base}${path}`;
    }, [photo]);
};
