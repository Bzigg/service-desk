import React, { FC } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './Pagination.module.scss'

interface IProps {
    count: number,
    limit: number,
    currentPage: number,
    setCurrentPage: (value: number) => void,
}

const Pagination: FC<IProps> = ({ count, limit, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(count / limit);

    return (
        <div className={cls.Pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    theme={currentPage === index + 1 ? ButtonTheme.OUTLINE : ButtonTheme.BACKGROUND}
                >
                    {index + 1}
                </Button>
            ))}
        </div>
    )
}

export default Pagination
