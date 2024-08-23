import React from 'react'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink } from 'shared/ui/AppLink/AppLink'

export const Logo = () => (
	<AppLink to="/">
		<Text
			title="Service-Desk"
			theme={TextTheme.INVERTED}
		/>
	</AppLink>
)
