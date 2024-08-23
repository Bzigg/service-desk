export enum statusEnum {
	ALL = 'ALL',
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	REJECTED = 'REJECTED',
}

type TStatus = any

export const StatusMapper: TStatus = {
    [statusEnum.OPEN]: 'Открыто',
    [statusEnum.IN_PROGRESS]: 'В работе',
    [statusEnum.COMPLETED]: 'Выполнено',
    [statusEnum.REJECTED]: 'Отклонено',
}

export const STATUS_OPTIONS_TICKET = [
	{
		value: statusEnum.OPEN,
		content: StatusMapper[statusEnum.OPEN]
	},
	{
		value: statusEnum.IN_PROGRESS,
		content: StatusMapper[statusEnum.IN_PROGRESS]
	},
	{
		value: statusEnum.COMPLETED,
		content: StatusMapper[statusEnum.COMPLETED]
	},
	{
		value: statusEnum.REJECTED,
		content: StatusMapper[statusEnum.REJECTED]
	},
]

export const STATUS_OPTIONS_FILTER = [
	{
		value: statusEnum.ALL,
		content: 'Все заявки'
	},
	{
		value: statusEnum.OPEN,
		content: 'Открытые'
	},
	{
		value: statusEnum.IN_PROGRESS,
		content: 'В работе'
	},
	{
		value: statusEnum.COMPLETED,
		content: 'Выполненные'
	},
	{
		value: statusEnum.REJECTED,
		content: 'Отклоненные'
	}
]