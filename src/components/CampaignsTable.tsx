import { ICampaign } from "../types";
import { Avatar, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { getCampaigns } from "../firebase/service";
import { formattingToCLPNumber } from "../helpers/formatCurrency";

const PAGE_SIZE = 10;

const CampaignsTable = () => {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);

    useEffect(() => {

        const chargedFoundations = async () => {
            try {
                const response = await getCampaigns();
                return response;
            } catch (error) {
                console.error("Error getting documents: ", error);
                throw error; // Re-lanza el error para que pueda ser capturado por el caller
            }
        };

        const fetchData = async () => {
            try {
                const campaigns = await chargedFoundations();
                setRecords(campaigns);
            } catch (error) {
                // Manejar errores aquí, por ejemplo, establecer un estado de error
                console.error("Failed to fetch foundations: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataTable
            columns={[
                {
                    accessor: 'createdBy',
                    render: ({ createdBy, createdByImage }: ICampaign) =>
                        <Group>
                            <Avatar src={createdByImage} alt={`${createdBy} profile avatar`} size="sm" radius="xl" />
                            <Text>{createdBy}</Text>
                        </Group>
                },
                // { accessor: 'name', title: 'Título' },
                { accessor: 'name', title: 'Título' },
                { accessor: 'description', title: 'Descripción' },
                {
                    accessor: 'cumulativeAmount', title: 'Monto acumulado',
                    render: ({ cumulativeAmount }) => formattingToCLPNumber(cumulativeAmount)
                },
                {
                    accessor: 'requestAmount', title: 'Monto solicitado',
                    render: ({ requestAmount }) => formattingToCLPNumber(requestAmount)
                },
                {
                    accessor: 'initDate', title: 'Fecha de inicio',
                    render: ({ initDate }) => new Date(initDate.seconds * 1000).toLocaleDateString(),
                },
                {
                    accessor: 'endDate', title: 'Fecha de término',
                    render: ({ endDate }) => new Date(endDate.seconds * 1000).toLocaleDateString(),
                }

            ]}
            records={records}
            totalRecords={records.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
            highlightOnHover
            verticalSpacing="sm"
        />
    );
};

export default CampaignsTable;
