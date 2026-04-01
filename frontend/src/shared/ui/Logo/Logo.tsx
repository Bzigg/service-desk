import React from 'react';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import logoIcon from 'shared/assets/logo/Logo.png';

import cls from './Logo.module.scss';

export const Logo = () => (
    <AppLink to="/" className={cls.Brand}>
        <img className={cls.LogoIcon} src={logoIcon} alt="Service-Desk" />
        <span className={cls.BrandText}>Service-Desk</span>
    </AppLink>
);
