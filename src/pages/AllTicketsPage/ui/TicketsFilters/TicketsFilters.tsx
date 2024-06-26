import React, { FC, useContext } from 'react'
import { Button } from 'shared/ui/Button/Button'

interface IProps {
	setFilters: any
}

const TicketsFilters: FC<IProps> = ({ setFilters }) => {

	return (
		<div>
			<Button onClick={() => setFilters(12)}>
				123
			</Button>
			{/*<div className={cls.sortWrapper}>*/}
			{/*	<ArticleSortSelector*/}
			{/*		order={order}*/}
			{/*		sort={sort}*/}
			{/*		onChangeOrder={onChangeOrder}*/}
			{/*		onChangeSort={onChangeSort}*/}
			{/*	/>*/}
			{/*	<ArticleViewSelector*/}
			{/*		view={view}*/}
			{/*		onViewClick={onChangeView}*/}
			{/*	/>*/}
			{/*</div>*/}
			{/*<Card className={cls.search}>*/}
			{/*	<Input*/}
			{/*		onChange={onChangeSearch}*/}
			{/*		value={search}*/}
			{/*		placeholder={t('Поиск')}*/}
			{/*	/>*/}
			{/*</Card>*/}
			{/*<ArticleTypeTabs*/}
			{/*	value={type}*/}
			{/*	onChangeType={onChangeType}*/}
			{/*	className={cls.tabs}*/}
			{/*/>*/}
		</div>
	);
};

export default TicketsFilters;