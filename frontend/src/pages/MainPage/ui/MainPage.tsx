import React, { useState } from 'react'
import { Page } from 'widgets/Page/Page'

const MainPage = () => {
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page>
            <h1>Главная страница</h1>
            <p>тут будет описание продукта, описание ролей, функционала и что то еще</p>
        </Page>
    );
};

export default MainPage;
