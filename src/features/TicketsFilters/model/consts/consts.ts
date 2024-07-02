export enum statusEnum {
	ALL = 'ALL',
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	REJECTED = 'REJECTED',
}

export const STATUS_OPTIONS = [
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