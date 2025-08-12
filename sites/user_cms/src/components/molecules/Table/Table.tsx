import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types';

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface TableProps extends BaseComponentProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onRowClick?: (record: any, index: number) => void;
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading = false,
  striped = false,
  bordered = false,
  hover = false,
  size = 'md',
  className,
  onRowClick,
  onSort,
  ...props
}) => {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (columnKey: string) => {
    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);
    onSort?.(columnKey, newDirection);
  };

  return (
    <div className={clsx('table-wrapper', className)} {...props}>
      <table
        className={clsx(
          'table',
          `table--${size}`,
          {
            'table--striped': striped,
            'table--bordered': bordered,
            'table--hover': hover,
            'table--loading': loading,
          }
        )}
      >
        <thead className="table__head">
          <tr className="table__row">
            {columns.map((column) => (
              <th
                key={column.key}
                className={clsx(
                  'table__header',
                  `table__header--${column.align || 'left'}`,
                  {
                    'table__header--sortable': column.sortable,
                    'table__header--sorted': sortColumn === column.key,
                  }
                )}
                style={{ width: column.width }}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <span className="table__header-content">
                  {column.title}
                  {column.sortable && (
                    <span className="table__sort-icon">
                      {sortColumn === column.key ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {loading ? (
            <tr className="table__row table__row--loading">
              <td colSpan={columns.length} className="table__cell table__cell--loading">
                <div className="loading-spinner" />
                読み込み中...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr className="table__row table__row--empty">
              <td colSpan={columns.length} className="table__cell table__cell--empty">
                データがありません
              </td>
            </tr>
          ) : (
            data.map((record, index) => (
              <tr
                key={index}
                className={clsx('table__row', {
                  'table__row--clickable': onRowClick,
                })}
                onClick={onRowClick ? () => onRowClick(record, index) : undefined}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx(
                      'table__cell',
                      `table__cell--${column.align || 'left'}`
                    )}
                  >
                    {column.render
                      ? column.render(record[column.key], record, index)
                      : record[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};