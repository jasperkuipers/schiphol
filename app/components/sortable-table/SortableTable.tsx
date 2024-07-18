import React, { useCallback, useMemo, useState } from 'react';
import styles from './SortableTable.module.scss';

type Column = {
    name: string;
    field: keyof Row;
};

type Row = {
    [key: string]: string;
};

type SortableTableProps = {
    columns: Column[];
    rows: Row[];
};

const SortableTable: React.FC<SortableTableProps> = ({ columns, rows }) => {
    const [sortType, setSortType] = useState<'ascending' | 'descending'>('ascending');
    const [sortColumnName, setSortColumnName] = useState<string>('');

    const sortByColumnName = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const field = e.currentTarget.getAttribute('data-field');

            if (!field) return;

            setSortColumnName(field);
            setSortType(sortType === 'ascending' ? 'descending' : 'ascending');
        },
        [sortType],
    );

    const sortedRows = useMemo(() => {
        if (!sortColumnName) {
            return rows;
        }

        return [...rows].sort((a, b) => {
            if (sortType === 'ascending') {
                return a[sortColumnName] > b[sortColumnName] ? 1 : -1;
            } else {
                return a[sortColumnName] < b[sortColumnName] ? 1 : -1;
            }
        });
    }, [rows, sortColumnName, sortType]);

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[575px] text-sm text-left rtl:text-right">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th className="py-3" key={index}>
                                <button className={styles.button} data-field={column.field} onClick={sortByColumnName}>
                                    {column.name}
                                    <svg
                                        className="w-3 h-3 ms-1.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((sortedRow, index) => (
                        <tr key={index}>
                            {columns.map(column => (
                                <td className="py-3 border border-x-0 border-t-0 border-gray-100" key={column.field}>
                                    {sortedRow[column.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SortableTable;
