import React from 'react'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import cls from './Logo.scss'

export const Logo = () => (
	<AppLink to="/">
		<Text
			className={cls.appName}
			title="Service-Desk"
			theme={TextTheme.INVERTED}
		/>
	</AppLink>
)
