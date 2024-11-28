import { memo } from 'react';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { profileApi } from 'features/editableProfileCard/model/api/profileApi';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

export const EditableProfileCard = memo(({ id }: EditableProfileCardProps) => {
    // todo доделать и выпилить комменты лишние
    const { data } = profileApi.useGetUserDataQuery(id as string, {
        skip: !id
    })

    return (
        <>
            <EditableProfileCardHeader />
            {/*{validateErrors?.length && validateErrors.map((err) => (*/}
            {/*    <Text*/}
            {/*        key={err}*/}
            {/*        theme={TextTheme.ERROR}*/}
            {/*        text={validateErrorTranslates[err]}*/}
            {/*        data-testid="EditableProfileCard.Error"*/}
            {/*    />*/}
            {/*))}*/}
            {/*<ProfileCard*/}
            {/*    data={formData}*/}
            {/*    isLoading={isLoading}*/}
            {/*    error={error}*/}
            {/*    readonly={readonly}*/}
            {/*    onChangeFirstname={onChangeFirstname}*/}
            {/*    onChangeLastname={onChangeLastname}*/}
            {/*    onChangeAge={onChangeAge}*/}
            {/*    onChangeCity={onChangeCity}*/}
            {/*    onChangeUsername={onChangeUsername}*/}
            {/*    onChangeAvatar={onChangeAvatar}*/}
            {/*/>*/}
        </>
    );
});
