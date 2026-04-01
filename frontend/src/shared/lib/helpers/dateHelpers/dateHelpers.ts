const pad2 = (n: number) => String(n).padStart(2, '0');

const getDate = (dateTime: string): string => {
    if (!dateTime) {
        return '';
    }

    const d = new Date(dateTime);
    return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
};

const getTime = (dateTime: string): string => {
    if (!dateTime) {
        return '';
    }

    const d = new Date(dateTime);
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

const getDateTime = (dateTime: string) => {
    if (!dateTime) {
        return '';
    }

    return `${getDate(dateTime)} ${getTime(dateTime)}`;
};

export const dateHelpers = {
    getDate,
    getTime,
    getDateTime,
};
