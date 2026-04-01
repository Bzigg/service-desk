import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import UserIcon from 'shared/assets/icons/user-20-20.svg';
import { useGetPhoto } from 'shared/lib/hooks/useGetPhoto/useGetPhoto';
import { Loader } from 'shared/ui/Loader/Loader';

import cls from './ProfileForm.module.scss';
import {
    useGetUserDataQuery,
    useUpdateUserDataMutation,
    useUpdateUserPhotoMutation,
} from '../../model/api/profileApi';

type ProfileProps = {
    className?: string;
    id?: string;
}

type ProfileFormValues= {
    email: string;
    firstName: string;
    lastName: string;
    surname: string;
}

export const ProfileForm = memo(
    ({ className, id }: ProfileProps) => {
        const { data, isLoading, isError } = useGetUserDataQuery(id as string, {
            skip: !id,
        });

        const [updateUser, { isLoading: isSaving, isError: isSaveError }] =
            useUpdateUserDataMutation();

        const [
            updatePhoto,
            { isLoading: isPhotoUploading, isError: isPhotoError },
        ] = useUpdateUserPhotoMutation();

        const fileInputRef = useRef<HTMLInputElement | null>(null);
        const [photoClientError, setPhotoClientError] = useState<string | null>(
            null,
        );

        const { control, handleSubmit } = useForm<ProfileFormValues>({
            values: {
                email: data?.email ?? '',
                firstName: data?.firstName ?? '',
                lastName: data?.lastName ?? '',
                surname: data?.surname ?? '',
            },
        });

        const photoSrc = useGetPhoto(data?.photo || '');

        const onSubmit = useCallback(
            async (values: ProfileFormValues) => {
                if (data?.id == null) {
                    return;
                }
                try {
                    await updateUser({
                        id: data.id,
                        email: values.email.trim(),
                        firstName: values.firstName.trim(),
                        lastName: values.lastName.trim(),
                        surname: values.surname.trim(),
                    }).unwrap();
                } catch {
                    // ошибка отображается через isSaveError
                }
            },
            [data?.id, updateUser],
        );

        const openPhotoPicker = useCallback(() => {
            setPhotoClientError(null);
            fileInputRef.current?.click();
        }, []);

        const onPhotoChange = useCallback(
            async (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (!file || data?.id == null) {
                    return;
                }
                setPhotoClientError(null);
                const allowed = ['image/jpeg', 'image/png'];
                if (!allowed.includes(file.type)) {
                    setPhotoClientError('Допустимы только файлы JPG и PNG.');
                    return;
                }
                if (file.size > 5 * 1024 * 1024) {
                    setPhotoClientError('Размер файла не больше 5 МБ.');
                    return;
                }
                try {
                    await updatePhoto({ id: data.id, file }).unwrap();
                } catch {
                    // ошибка отображается через isPhotoError
                }
            },
            [data?.id, updatePhoto],
        );

        if (!id) {
            return (
                <div
                    className={classNames(cls.EditableProfileCard, {}, [
                        className,
                    ])}
                >
                    <Text
                        text="Не указан профиль для отображения."
                        theme={TextTheme.ERROR}
                    />
                </div>
            );
        }

        if (isLoading) {
            return <Loader />;
        }

        if (isError || !data) {
            return (
                <div
                    className={classNames(cls.EditableProfileCard, {}, [
                        className,
                    ])}
                >
                    <Text
                        text="Не удалось загрузить профиль. Попробуйте позже."
                        theme={TextTheme.ERROR}
                    />
                </div>
            );
        }

        return (
            <form
                className={classNames(cls.ProfileForm, {}, [className])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Text title="Профиль" />
                <div className={cls.photoBlock}>
                    {photoSrc ? (
                        <img className={cls.photo} src={photoSrc} alt="" />
                    ) : (
                        <div className={cls.photoPlaceholder} aria-hidden>
                            <UserIcon />
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        className={cls.hiddenFileInput}
                        type="file"
                        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                        onChange={onPhotoChange}
                    />
                    <Button
                        type="button"
                        theme={ButtonTheme.OUTLINE}
                        disabled={isPhotoUploading}
                        onClick={openPhotoPicker}
                    >
                        {isPhotoUploading ? 'Загрузка…' : 'Сменить фото'}
                    </Button>
                    <span className={cls.photoHint}>JPG или PNG, до 5 МБ</span>
                    {(isPhotoError || photoClientError) && (
                        <Text
                            text={
                                photoClientError ?? 'Не удалось загрузить фото.'
                            }
                            theme={TextTheme.ERROR}
                        />
                    )}
                </div>

                {isSaveError && (
                    <Text
                        className="mt8"
                        text="Не удалось сохранить изменения."
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    control={control}
                    name="email"
                    label="Email"
                    type="email"
                    className="mt8"
                    placeholder="email@example.com"
                    rules={{
                        required: 'Укажите email',
                    }}
                />
                <Input
                    control={control}
                    name="firstName"
                    label="Имя"
                    type="text"
                    className="mt8"
                    placeholder="Имя"
                    rules={{
                        required: 'Укажите имя',
                    }}
                />
                <Input
                    control={control}
                    name="lastName"
                    label="Фамилия"
                    type="text"
                    className="mt8"
                    placeholder="Фамилия"
                    rules={{
                        required: 'Укажите фамилию',
                    }}
                />
                <Input
                    control={control}
                    name="surname"
                    label="Отчество"
                    type="text"
                    className="mt8"
                    placeholder="Отчество"
                    rules={{
                        required: 'Укажите отчество',
                    }}
                />
                <div className={cls.buttons}>
                    <Button
                        theme={ButtonTheme.BACKGROUND}
                        type="submit"
                        disabled={isSaving}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        );
    },
);
