import { Controller } from 'react-hook-form'
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

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

export const Input = memo((props: InputProps) => {
    const {
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
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    const isCaretVisible = isFocused && !readonly;

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    if (control && name) {
        return (
            <Controller
                control={control}
                defaultValue={''}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
                    <div className={classNames(cls.Input, {}, [className])}>
                        {label && (
                            <div className={cls.placeholder}>
                                {`${label}:`}
                            </div>
                        )}
                        {fieldState?.error?.message && <div className={cls.errorTooltip}>{(fieldState?.error?.message)}</div>}
                        <div className={cls.inputWrapper}>
                            <input
                                placeholder={placeholder}
                                ref={ref}
                                type={type}
                                value={value}
                                onChange={(...values) => {
                                    onChangeHandler && onChangeHandler(...values);
                                    onChange && onChange(...values);
                                }}
                                className={classNames(cls.input, {[cls.error]: Boolean(fieldState?.error?.message)})}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSelect={onSelect}
                                readOnly={readonly}
                                {...otherProps}
                            />
                            {isCaretVisible && (
                                <span
                                    className={cls.caret}
                                    style={{ left: `${caretPosition * 9}px` }}
                                />
                            )}
                        </div>
                    </div>
                )}
            />
        )
    }

    return (
        <div className={classNames(cls.Input, {}, [className])}>
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
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
            </div>
        </div>
    );
});
