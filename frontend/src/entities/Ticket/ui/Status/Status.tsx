import { Tag, TType } from 'shared/ui/Tag/Tag';
import { TStatus, statusMapper } from '../../const';

type TProps = {
    status: TStatus;
};

const type: Record<TStatus, TType> = {
    OPEN: 'accent',
    IN_PROGRESS: 'secondary',
    COMPLETED: 'disabled',
    REJECTED: 'error',
};

export const Status = ({ status }: TProps) => {
    return <Tag type={type[status]} title={statusMapper[status]} />;
};
