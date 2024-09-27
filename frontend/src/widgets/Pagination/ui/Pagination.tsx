import React, { FC } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface IProps {
    count: number,
    limit: number,
    currentPage: number,
    setCurrentPage: (value: number) => void,
}
//todo верстка
const Pagination: FC<IProps> = ({ count, limit, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(count / limit);

    return (
        <>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    theme={currentPage === index + 1 ? ButtonTheme.OUTLINE : ButtonTheme.CLEAR}
                >
                    {index + 1}
                </Button>
            ))}
        </>
    )
}

export default Pagination
