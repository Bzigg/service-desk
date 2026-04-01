import React from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { dateHelpers } from 'shared/lib/helpers/dateHelpers/dateHelpers';
import { Avatar } from 'shared/ui/Avatar/Avatar';

import cls from './HistoryItem.module.scss';

type HistoryItemProps = {
    title: string;
    description?: string;
    dateTime: string;
    user?: {
        photoSrc: string;
        name: string;
    };
};

export const HistoryItem = ({
    title,
    description,
    dateTime,
    user,
}: HistoryItemProps) => {
    return (
        <div className={cls.HistoryItem}>
            <div className={cls.HistoryInfo}>
                <Text
                    theme={TextTheme.PRIMARY}
                    title={title}
                    size={TextSize.M}
                />
                {description && (
                    <div className={cls.HistoryDescription}>
                        <Text
                            theme={TextTheme.PRIMARY}
                            text={description}
                            size={TextSize.M}
                        />
                        {user && (
                            <div className={cls.HistoryAvatar}>
                                <Avatar size={32} src={user.photoSrc} />
                                <Text text={user.name} />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={cls.HistoryDate}>
                <Text
                    theme={TextTheme.TERTIARY}
                    text={dateHelpers.getDate(dateTime)}
                />
                <Text
                    theme={TextTheme.TERTIARY}
                    text={dateHelpers.getTime(dateTime)}
                />
            </div>
        </div>
    );
};
