/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useState } from 'react';
import { Group, Select, Text } from "@mantine/core";
import { getFoundationsSelect } from '../firebase/service';


const FoundationSelectItem = forwardRef<HTMLDivElement, any>(
    ({ name, ...others }: any, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <div>
                    <Text size="sm">{name}</Text>
                </div>
            </Group>
        </div>
    )
);


const FoundationSelect = () => {

    const [foundations, setFoundations] = useState([]);

    useEffect(() => {
        chargedCategories();
    }, []);

    const chargedCategories = async () => {
        try {
            const response = await getFoundationsSelect();
            setFoundations(response);
        } catch (error) {
            console.error('Error fetching foundations:', error);
        }
    }
    return (
        <Select
            label="Fundación"
            itemComponent={FoundationSelectItem}
            data={foundations.map(f => ({ value: f.id, label: f.name, ...f }))}
            searchable
            clearable
            maxDropdownHeight={300}
            nothingFound="No hay fundaciones"
        />
    );
};

export default FoundationSelect;
