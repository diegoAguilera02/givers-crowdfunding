import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { getFoundations } from "../firebase/service";

const PAGE_SIZE = 10;

const FoundationsTable = () => {
    const [page, setPage] = useState(1);
    // const [records, setRecords] = useState(campaignsData.data.slice(0, PAGE_SIZE));
    const [records, setRecords] = useState([]);
    // useEffect(() => {

    //     // const foundations = chargedFoundations();

    //     // const from = (page - 1) * PAGE_SIZE;
    //     // const to = from + PAGE_SIZE;
    //     // setRecords(foundations.slice(from, to));
    // }, [page]);

    useEffect(() => {

        const chargedFoundations = async () => {
            try {
                const response = await getFoundations();
                return response;
            } catch (error) {
                console.error("Error getting documents: ", error);
                throw error; // Re-lanza el error para que pueda ser capturado por el caller
            }
        };

        const fetchData = async () => {
            try {
                const foundations = await chargedFoundations();
                console.log(foundations);
                setRecords(foundations);
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
                { accessor: 'name', title: 'Nombre' },
                { accessor: 'city', title: 'Ciudad' },
                { accessor: 'address', title: 'Dirección' },
                // { accessor: 'responsible', title: 'Responsable' },
                { accessor: 'fono', title: 'Teléfono' },
            ]}
            records={records}
            totalRecords={records.length}
            noRecordsText="No hay registros"
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
            highlightOnHover
            verticalSpacing="sm"
        />
    );
};

export default FoundationsTable;
