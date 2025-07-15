import React from 'react';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../styles/theme';
import {Table, type Column} from './index';

const mockUseMediaQuery = jest.fn();
jest.mock('../../hooks/useMediaQuery.ts', () => ({
    useMediaQuery: (query: string) => mockUseMediaQuery(query),
}));

jest.mock('../infinite-scroll', () => {
    return ({children, loader, isLoading}: {
        children: React.ReactNode;
        loader: React.ReactNode;
        isLoading: boolean
    }) => (
        <div data-testid="infinite-scroll">
            {children}
            {isLoading && loader}
        </div>
    );
});

jest.mock('../../../assets/icons/arrow.svg', () => 'arrow-icon-stub');

const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
};


interface MockData {
    id: number;
    name: string;
    role: string;
    status: string;
}

const mockData: MockData[] = [
    {id: 1, name: 'Alice', role: 'Developer', status: 'Active'},
    {id: 2, name: 'Bob', role: 'Designer', status: 'Inactive'},
];

const mockColumns: Column<MockData>[] = [
    {key: 'name', header: 'Nome'},
    {key: 'role', header: 'Cargo'},
    {key: 'status', header: 'Status'},
];

const defaultProps = {
    data: mockData,
    columns: mockColumns,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
};

describe('Componente Table', () => {
    beforeEach(() => {
        (defaultProps.fetchNextPage as jest.Mock).mockClear();
        mockUseMediaQuery.mockClear();
    });

    describe('Visão Desktop', () => {
        beforeEach(() => {
            mockUseMediaQuery.mockReturnValue(false);
        });

        it('deve renderizar os cabeçalhos corretos', () => {
            renderWithTheme(<Table {...defaultProps} />);

            const desktopHeaderContainer = screen.getByText('Status').parentElement;
            expect(desktopHeaderContainer).toBeInTheDocument();

            expect(within(desktopHeaderContainer!).getByText('Nome')).toBeInTheDocument();
            expect(within(desktopHeaderContainer!).getByText('Cargo')).toBeInTheDocument();
        });

        it('deve renderizar os dados corretamente nas células', () => {
            const {container} = renderWithTheme(<Table {...defaultProps} />);

            const rows = Array.from(container.querySelectorAll<HTMLElement>('.desktop-only'));
            expect(rows.length).toBe(2);

            const firstRow = within(rows[0]);
            expect(firstRow.getByText('Alice')).toBeInTheDocument();
            expect(firstRow.getByText('Developer')).toBeInTheDocument();
            expect(firstRow.getByText('Active')).toBeInTheDocument();

            const secondRow = within(rows[1]);
            expect(secondRow.getByText('Bob')).toBeInTheDocument();
            expect(secondRow.getByText('Designer')).toBeInTheDocument();
            expect(secondRow.getByText('Inactive')).toBeInTheDocument();
        });
    });

    describe('Visão Mobile', () => {
        beforeEach(() => {
            mockUseMediaQuery.mockReturnValue(true);
        });

        it('deve renderizar os cabeçalhos específicos para mobile', () => {
            renderWithTheme(<Table {...defaultProps} />);

            const allHeaders = screen.getAllByText(/Nome|Cargo/);
            const visibleHeaders = allHeaders.filter(el => el.parentElement?.style.display !== 'none');

            const visibleHeadersText = visibleHeaders.map(h => h.textContent);
            expect(visibleHeadersText).toContain('Nome');
            expect(visibleHeadersText).toContain('Cargo');

            const statusHeader = screen.queryByText('Status');
            if (statusHeader && statusHeader.parentElement?.style.display !== 'none') {
                expect(statusHeader).not.toBeVisible();
            }
        });

        it('deve expandir e recolher uma linha ao ser clicada', async () => {
            renderWithTheme(<Table {...defaultProps} />);

            const firstRowHeader = screen.getByText('Alice').closest('div');
            expect(firstRowHeader).toBeInTheDocument();

            await userEvent.click(firstRowHeader!);
            await userEvent.click(firstRowHeader!);
        });
    });
});