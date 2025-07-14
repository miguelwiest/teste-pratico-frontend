import React, {useState} from 'react';
import arrowIcon from '../../../assets/icons/arrow.svg'; // Adjust the path as necessary
import * as S from './style.ts'
import {useMediaQuery} from "../../hooks/useMediaQuery.ts";
import InfiniteScroll from "../infinite-scroll";

export interface Column<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[] | undefined;
    columns: Column<T>[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
}

export const Table = <T extends { id: number | string }>(
    {
        data,
        columns,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }: TableProps<T>) => {
    const [expandedRowId, setExpandedRowId] = useState<number | string | null>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const handleRowClick = (id: number | string) => {
        setExpandedRowId(currentId => (currentId === id ? null : id));
    };

    const detailColumns = columns.slice(2);

    return (
        <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
            loader={<div style={{textAlign: 'center', padding: '20px'}}>Carregando mais...</div>}
        >
            <S.TableContainer>
                <S.THead style={{display: isMobile ? 'none' : 'grid'}}>
                    {columns.map((col) => <S.Th key={String(col.key)}>{col.header}</S.Th>)}
                </S.THead>
                <S.THead style={{display: !isMobile ? 'none' : 'flex'}}>
                    <S.Th>{columns[0].header}</S.Th>
                    <S.Th>{columns[1].header}</S.Th>
                </S.THead>

                <S.TBody>
                    {data?.map((item) => {
                        const isExpanded = expandedRowId === item.id;
                        return (
                            <S.Row key={item.id} isExpanded={isExpanded}>
                                <div className="mobile-only">
                                    <S.RowHeader onClick={() => handleRowClick(item.id)}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                            {columns[0].render ? columns[0].render(item) : String(item[columns[0].key])}
                                            {columns[1].render ? columns[1].render(item) : String(item[columns[1].key])}
                                        </div>
                                        <S.ExpandIcon width={24} src={arrowIcon} isExpanded={isExpanded}/>
                                    </S.RowHeader>
                                    <S.RowDetails isExpanded={isExpanded}>
                                        {detailColumns.map(col => (
                                            <S.Cell key={String(col.key)} data-label={col.header}>
                                                {col.render ? col.render(item) : String(item[col.key])}
                                            </S.Cell>
                                        ))}
                                    </S.RowDetails>
                                </div>
                                <div className="desktop-only">
                                    {columns.map(col => (
                                        <S.Cell key={String(col.key)}>
                                            {col.render ? col.render(item) : String(item[col.key])}
                                        </S.Cell>
                                    ))}
                                </div>
                            </S.Row>
                        );
                    })}
                </S.TBody>
            </S.TableContainer>
        </InfiniteScroll>
    );
};