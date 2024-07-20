/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useState } from 'react';
import { Group, Select, Text } from "@mantine/core";
import { getCategories } from '../firebase/service';

// const mockdata = [
//     {
//         icon: IconClipboardHeart,
//         title: 'Medical',
//     },
//     {
//         icon: IconSos,
//         title: 'Emergency',
//     },
//     {
//         icon: IconLeaf,
//         title: 'Environment',
//     },
//     {
//         icon: IconHeartHandshake,
//         title: 'Nonprofit',
//     },
//     {
//         icon: IconReportMoney,
//         title: 'Financial emergency',
//     },
//     {
//         icon: IconCat,
//         title: 'Animals',
//     },
//     {
//         icon: IconFireHydrant,
//         title: 'Crisis Relief',
//     },
//     {
//         icon: IconAugmentedReality,
//         title: 'Technology',
//     },
//     {
//         icon: IconDeviceTv,
//         title: 'Film & Videos',
//     },
// ];

const CategorySelectItem = forwardRef<HTMLDivElement, any>(
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


const CategorySelect = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        chargedCategories();
    }, []);

    const chargedCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    return (
        <Select
            label="Categoría"
            itemComponent={CategorySelectItem}
            data={categories.map(c => ({ value: c.id, label: c.name, ...c }))}
            searchable
            clearable
            maxDropdownHeight={300}
            nothingFound="No hay categorías"
        />
    );
};

export default CategorySelect;
