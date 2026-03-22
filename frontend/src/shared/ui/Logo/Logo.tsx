import React from 'react'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import logoIcon from 'shared/icons/Logo.png'
import cls from './Logo.module.scss';

export const Logo = () => (
	<AppLink to="/" className={cls.Brand}>
		<img className={cls.LogoIcon} src={logoIcon} alt="БГПУ Поддержка" />
		<span className={cls.BrandText}>БГПУ Поддержка</span>
	</AppLink>
)
