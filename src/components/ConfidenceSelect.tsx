import { forwardRef } from 'react';
import { Group, Select, Text } from "@mantine/core";

const CategorySelectItem = forwardRef<HTMLDivElement, any>(
    ({ title, ...others }: any, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <others.icon size={18} />

                <div>
                    <Text size="sm">{title}</Text>
                </div>
            </Group>
        </div>
    )
);


interface Props {
    updateSelectedConfidence: (value: string) => void;
    errorConfidence: string;
}

const ConfidenceSelect = ({ updateSelectedConfidence, errorConfidence }: Props) => {

    return (
        <Select
            label="Nivel de confianza"
            placeholder='Selecciona un nivel de confianza'
            itemComponent={CategorySelectItem}
            data={mockdata.map(c => ({ value: c.id, label: c.title, ...c }))}
            searchable
            clearable
            maxDropdownHeight={300}
            nothingFound="Nothing found"
            filter={(value, item) =>
                item?.title?.toLowerCase().includes(value?.toLowerCase().trim())
            }
            onChange={updateSelectedConfidence}
            error={errorConfidence}
        />
    );
};

export default ConfidenceSelect;
