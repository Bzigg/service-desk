import { Controller } from 'react-hook-form';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    label?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    name?: string;
    control?: any;
    [key: string]: any;
}

export const Input = memo(
    ({
        className,
        label,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        name,
        control,
        rules,
        ...otherProps
    }: InputProps) => {
        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        if (control && name) {
            return (
                <Controller
                    control={control}
                    defaultValue={''}
                    name={name}
                    rules={rules}
                    render={({
                        field: { onChange, onBlur, value, ref },
                        fieldState,
                    }) => (
                        <div
                            className={classNames(cls.InputField, {}, [
                                className,
                            ])}
                        >
                            {label && (
                                <div className={cls.placeholder}>
                                    {`${label}:`}
                                </div>
                            )}
                            <div className={cls.inputWrapper}>
                                <input
                                    placeholder={placeholder}
                                    ref={ref}
                                    type={type}
                                    value={value}
                                    onChange={(...values) => {
                                        onChangeHandler &&
                                            onChangeHandler(...values);
                                        onChange && onChange(...values);
                                    }}
                                    className={classNames(cls.input, {
                                        [cls.error]: Boolean(
                                            fieldState?.error?.message,
                                        ),
                                    })}
                                    onBlur={onBlur}
                                    readOnly={readonly}
                                    {...otherProps}
                                />
                            </div>
                            {fieldState?.error?.message && (
                                <div className={cls.errorMessage}>
                                    {fieldState?.error?.message}
                                </div>
                            )}
                        </div>
                    )}
                />
            );
        }

        return (
            <div className={classNames(cls.InputField, {}, [className])}>
                {label && <div className={cls.placeholder}>{`${label}:`}</div>}
                <div className={cls.inputWrapper}>
                    <input
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        onChange={onChangeHandler}
                        className={cls.input}
                        readOnly={readonly}
                        {...otherProps}
                    />
                </div>
            </div>
        );
    },
);
