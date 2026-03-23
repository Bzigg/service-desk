import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';
import UserIcon from '../../assets/icons/user-20-20.svg';

interface AvatarProps {
    className?: string;
    src?: string | null;
    size?: number;
    alt?: string;
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 48,
            height: size || 48,
        }),
        [size],
    );

    return (
        <div className={classNames(cls.Avatar, mods, [className])}>
            {src ? <img src={src} alt={alt} style={styles} /> : <UserIcon className={cls.icon} />}
        </div>
    );
};
