import React, { FC } from 'react';
import { useSelector } from 'react-redux'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { isAdminSelector } from 'entities/User'

interface IProps {
	className?: string
	responsibleId: string
}

export const AssignButton: FC<IProps> = ({ className, responsibleId }) => {
	const isAdmin = useSelector(isAdminSelector)

	if (!isAdmin || !responsibleId) {
		return null
	}

	return (
		<Button className={className} theme={ButtonTheme.OUTLINE}>
			Назначить мне
		</Button>
	)
}
