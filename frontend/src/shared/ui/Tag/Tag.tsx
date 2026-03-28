import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Tag.module.scss';

export type TType = 'success' | 'secondary' | 'error' | 'disabled' | 'accent';

type TProps = {
    type: TType;
    title?: string;
};

export const Tag = ({ type, title }: TProps) => {
    const mods: Mods = {
        [cls.Success]: type === 'success',
        [cls.Accent]: type === 'accent',
        [cls.Secondary]: type === 'secondary',
        [cls.Disabled]: type === 'disabled',
        [cls.Error]: type === 'error',
    };

    return <div className={classNames(cls.Tag, mods)}>{title}</div>;
};
