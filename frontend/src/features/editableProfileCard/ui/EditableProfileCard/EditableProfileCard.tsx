import { memo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';
// import { ProfileCard } from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

// const reducers: ReducersList = {
//     profile: profileReducer,
// };

export const EditableProfileCard = memo(({ id }: EditableProfileCardProps) => {
    // const dispatch = useAppDispatch();
    // const formData = useSelector(getProfileForm);
    // const isLoading = useSelector(getProfileIsLoading);
    // const error = useSelector(getProfileError);
    // const readonly = useSelector(getProfileReadonly);
    // const validateErrors = useSelector(getProfileValidateErrors);


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
