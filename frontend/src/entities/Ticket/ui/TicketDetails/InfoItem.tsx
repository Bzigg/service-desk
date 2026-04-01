import React, { ReactElement } from 'react';
import { Text } from 'shared/ui/Text/Text';
import cls from './InfoItem.module.scss';

type InfoItemProps = {
    Icon: ReactElement;
    text: string;
};

export const InfoItem = ({ Icon, text }: InfoItemProps) => {
    return (
        <div className={cls.InfoItem}>
            {Icon}
            <Text text={text} />
        </div>
    );
};
