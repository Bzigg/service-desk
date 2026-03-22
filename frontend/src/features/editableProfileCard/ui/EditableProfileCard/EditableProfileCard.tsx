import { memo } from 'react';

import { useGetUserDataQuery } from '../../model/api/profileApi';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

export const EditableProfileCard = memo(({ id }: EditableProfileCardProps) => {
    // todo доделать и выпилить комменты лишние
    const { data } = useGetUserDataQuery(id as string, {
        skip: !id,
    });

    return (
        <>
        {/* карточка */}
        </>
    );
});
