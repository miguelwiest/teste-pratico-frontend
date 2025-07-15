import React from 'react';
import {render, screen, act, waitFor, fireEvent} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../shared/styles/theme';
import HomePage from './index'; // Ajuste o caminho conforme necessário

jest.mock('../../shared/services/employees.service.ts');
import {getAll} from '../../shared/services/employees.service.ts';

const mockedGetAll = getAll as jest.Mock;

jest.mock('../../shared/hooks/useMediaQuery.ts');
import {useMediaQuery} from '../../shared/hooks/useMediaQuery.ts';

const mockedUseMediaQuery = useMediaQuery as jest.Mock;

jest.mock('../../shared/utils', () => ({
    formatDate: (date: Date) => date.toISOString(),
    formatPhoneNumber: (phone: string) => `formatted-${phone}`,
}));

interface MockInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

jest.mock('../../shared/components/input', () => ({
    Input: (props: MockInputProps) => (
        <input
            data-testid="mock-input"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    ),
}));

interface MockColumn<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
}

interface MockTableProps<T> {
    data: T[] | undefined;
    columns: MockColumn<T>[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
}

jest.mock('../../shared/components/table', () => ({
    Table: <T extends object>(props: MockTableProps<T>) => (
        <div data-testid="mock-table">
            <p>Items: {props.data?.length ?? 0}</p>
            <button
                data-testid="fetch-next"
                onClick={props.fetchNextPage}
                disabled={!props.hasNextPage || props.isFetchingNextPage}
            >
                Carregar Mais
            </button>
        </div>
    ),
}));

jest.useFakeTimers();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Desabilita retentativas para os testes
        },
    },
});

const renderHomePage = () => {
    return render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={defaultTheme}>
                <HomePage/>
            </ThemeProvider>
        </QueryClientProvider>
    );
};


describe('Componente HomePage', () => {
    beforeEach(() => {
        mockedGetAll.mockClear();
        mockedUseMediaQuery.mockClear();
        queryClient.clear();
    });

    it('deve renderizar o título e buscar os funcionários iniciais', async () => {
        mockedUseMediaQuery.mockReturnValue(false); // Visão de desktop
        mockedGetAll.mockResolvedValue([]); // Retorna uma lista vazia inicialmente

        renderHomePage();

        expect(screen.getByRole('heading', {name: /funcionários/i})).toBeInTheDocument();
        expect(screen.getByTestId('mock-input')).toBeInTheDocument();

        await waitFor(() => {
            expect(mockedGetAll).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText('Items: 0')).toBeInTheDocument();
    });

    it('deve filtrar os funcionários quando o utilizador digita no campo de busca (com debounce)', async () => {
        mockedUseMediaQuery.mockReturnValue(false);
        mockedGetAll.mockResolvedValueOnce([{id: 1, name: 'Carlos'}, {id: 2, name: 'Charles'}]);
        mockedGetAll.mockResolvedValueOnce([{id: 3, name: 'Carla'}]);

        renderHomePage();

        await screen.findByText('Items: 2');
        expect(mockedGetAll).toHaveBeenCalledWith(expect.objectContaining({searchTerm: ''}));

        const searchInput = screen.getByTestId('mock-input');
        fireEvent.change(searchInput, {target: {value: 'Carla'}});

        expect(mockedGetAll).toHaveBeenCalledTimes(1);

        act(() => {
            jest.advanceTimersByTime(500);
        });

        await screen.findByText('Items: 1');

        expect(mockedGetAll).toHaveBeenCalledTimes(2);
        expect(mockedGetAll).toHaveBeenCalledWith(expect.objectContaining({searchTerm: 'Carla'}));
    });
});
