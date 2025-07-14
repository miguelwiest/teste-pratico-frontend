import React, {useState} from 'react';
import arrowIcon from '../../../assets/icons/arrow.svg'; // Adjust the path as necessary
import * as S from './style.ts'
import {useMediaQuery} from "../../hooks/useMediaQuery.ts";

export interface Column<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[] | undefined;
    columns: Column<T>[];
}

export const Table = <T extends object>({data, columns}: TableProps<T>) => {
    const [expandedRowId, setExpandedRowId] = useState<number | string | null>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const handleRowClick = (id: number | string) => {
        setExpandedRowId(currentId => (currentId === id ? null : id));
    };

    const detailColumns = columns.slice(2);

    return (
        <S.TableContainer>
            <S.THead style={{
                display: isMobile ? 'none' : 'grid',
            }}>
                {columns.map((col) => <S.Th key={String(col.key)}>{col.header}</S.Th>)}
            </S.THead>

            <S.THead style={{
                display: !isMobile ? 'none' : 'flex',
            }}>
                <S.Th>{columns[0].header}</S.Th>
                <S.Th>{columns[1].header}</S.Th>
            </S.THead>

            <S.TBody>
                {data?.map((item, index) => {
                    const isExpanded = expandedRowId === index;
                    return (
                        <S.Row key={index} isExpanded={isExpanded}>
                            <div className="mobile-only">
                                <S.RowHeader onClick={() => handleRowClick(index)}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                        }}
                                    >
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
    );
};