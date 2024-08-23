import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { getUserAuthData, isAdminSelector } from 'entities/User'
import { assignApi } from 'widgets/AssignButton/model/api/assignApi'

interface IProps {
	className?: string
	id: string
	responsibleId: string
}

export const AssignButton: FC<IProps> = ({ className, id, responsibleId }) => {
	const isAdmin = useSelector(isAdminSelector)
	const userData = useSelector(getUserAuthData)

	const [assignTicket] = assignApi.useAssignTicketMutation()

	const assignMe = useCallback(() => {
		assignTicket({ ticketId: id, responsibleId: userData?.id })
	}, [id, userData])

	if (!isAdmin || responsibleId || responsibleId === userData?.id) {
		return null
	}

	return (
		<Button
			className={className}
			theme={ButtonTheme.OUTLINE}
			onClick={assignMe}
		>
			Назначить мне
		</Button>
	)
}
