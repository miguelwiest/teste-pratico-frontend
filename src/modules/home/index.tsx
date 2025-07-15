// React
import {useState} from "react";

// Library Methods
import {useInfiniteQuery} from "@tanstack/react-query";

// Global Components
import {Input} from "../../shared/components/input";
import {type Column, Table} from "../../shared/components/table";

// Services
import {getAll} from "../../shared/services/employees.service.ts";

// Hooks
import {useMediaQuery} from "../../shared/hooks/useMediaQuery.ts";
import {useDebounce} from "../../shared/hooks/useDebounce.ts";

// Utils
import {formatDate, formatPhoneNumber} from "../../shared/utils";

// Models
import type {Employee} from "../../shared/models/employee.model.ts";

// Global Styles
import * as G from '../../shared/styles/global.ts';

// Icons
import {ProfileImage} from "../../shared/components/table/style.ts";

const employeeColumns: Column<Employee>[] = [
    {
        key: "image",
        header: "Foto",
        render: (employee) => (
            <ProfileImage
                src={employee.image}
                alt={employee.name}
                style={{width: '40px', height: '40px', borderRadius: '50%'}}
            />
        )
    },
    {
        key: 'name',
        header: 'Nome',
    },
    {
        key: 'job',
        header: 'Cargo',
    },
    {
        key: 'admission_date',
        header: 'Data de Admissão',
        render: (employee) => formatDate(new Date(employee.admission_date)),
    },
    {
        key: 'phone',
        header: 'Telefone',
        render: (employee) => formatPhoneNumber(employee.phone),
    }
];

const HomePage = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['employees', debouncedSearchTerm],
        queryFn: ({pageParam}) => getAll({pageParam, searchTerm: debouncedSearchTerm}),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        },
    });

    const employees = data?.pages.flatMap(page => page) ?? [];

    return (
        <G.Container padding="42px 30px">
            <section style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: isMobile ? '28px' : 0,
                marginBottom: '40px',
                flexDirection: isMobile ? 'column' : 'row',
            }}>
                <h1>Funcionários</h1>
                <Input
                    icon
                    placeholder={`Pesquisar`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    width={isMobile ? '100%' : 287}
                />
            </section>
            <section>
                <Table
                    columns={employeeColumns}
                    data={employees}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </section>
        </G.Container>
    );
}

export default HomePage;