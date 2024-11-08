import React, { useCallback } from 'react'
import { Page } from 'widgets/Page/Page'
import { buildingsApi } from 'entities/Building/model/buildingsApi'
import { Input } from 'shared/ui/Input/Input'
import { useForm } from 'react-hook-form'
import { Button } from 'shared/ui/Button/Button'

const AdminPanelPage = () => {
    const { data } = buildingsApi.useGetBuildingsQuery()

    const [addBuilding] = buildingsApi.useAddBuildingMutation()

    const { control, handleSubmit} = useForm()

    const save = useCallback((values: any) => {
        addBuilding(values);
    }, [addBuilding])

    return (
        <Page>
            {/*todo распилить по компонентам*/}
            <form onSubmit={handleSubmit(save)}>
                <Input
                    label="Улица"
                    rules={{
                        required: 'Введите улицу'
                    }}
                    control={control}
                    name="street"
                    type="text"
                    className="mt8"
                    placeholder="Введите улицу"
                />
                <Input
                    label="Номер строения"
                    rules={{
                        required: 'Введите номер строения'
                    }}
                    control={control}
                    name="building"
                    type="text"
                    className="mt8"
                    placeholder="Введите номер строения"
                />
                <Input
                    label="Название строения"
                    rules={{
                        required: 'Введите название строения'
                    }}
                    control={control}
                    name="name"
                    type="text"
                    className="mt8"
                    placeholder="Корпус, административное здание и тд"
                />
                <Button
                    className="mt8"
                    type="submit"
                >
                    Добавить
                </Button>
            </form>

            {
                data?.map((building: any) => {
                    return <div key={building.id}>
                        {`ул. ${building.street}, дом ${building.building} - ${building.name}`}
                    </div>
                })
            }
        </Page>
    );
};

export default AdminPanelPage;
