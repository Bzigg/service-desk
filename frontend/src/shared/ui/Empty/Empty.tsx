import { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import cls from './Empty.module.scss';

import FolderIcon from '../../assets/icons/folder-108-108.svg';

interface EmptyProps {
    className?: string;
    title?: string;
    description?: string;
    children?: ReactNode;
}

export const Empty = memo(
    ({ className, title, description, children }: EmptyProps) => {
        return (
            <div className={classNames(cls.Empty, {}, [className])}>
                <FolderIcon />
                <Text
                    title={title || 'Не найдено'}
                    text={description}
                    align={TextAlign.CENTER}
                    size={TextSize.M}
                />
                {children}
            </div>
        );
    },
);
