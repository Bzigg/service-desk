import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';
import { Controller } from 'react-hook-form'

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    control?: any;
    name?: string;
    className?: string;
    placeholder?: any;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        onChange,
        value,
        readonly,
        control,
        name,
        placeholder,
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const mods: Mods = {};

    if (control && name) {
        return (
            <Controller
                control={control}
                defaultValue={''}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <div className={classNames(cls.Wrapper, mods, [className])}>
                        {label && (
                            <span className={cls.label}>
                                {`${label}:`}
                            </span>
                        )}
                        <select
                            disabled={readonly}
                            className={cls.select}
                            value={value}
                            onChange={(...values) => {
                                onChangeHandler && onChangeHandler(...values);
                                onChange && onChange(...values);
                            }}
                            placeholder={placeholder}
                            ref={ref}
                            onBlur={onBlur}
                        >
                            {optionsList}
                        </select>
                    </div>
                )}
            />
        )
    }

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}:`}
                </span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
});
