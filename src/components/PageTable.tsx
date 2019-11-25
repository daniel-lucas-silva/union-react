import React, {CSSProperties, useState} from 'react';
import { Table } from 'antd';
import {ColumnProps, PaginationConfig, SelectionItem, TableRowSelection} from "antd/es/table";

type TableClick<T> = (event: React.MouseEvent<Element, MouseEvent>, record: T, index: string|number) => void;

export interface PageTableProps<T> {
  selections?: false|SelectionItem[];
  onSelect?: (keys: string[]|number[], rows: T[]) => void;
  size?: "small"|"default"|"middle";
  tableLayout?: CSSProperties['tableLayout'];
  pagination?: false|PaginationConfig;
  columns: ColumnProps<T>[];
  dataSource: T[];
  onClick?: TableClick<T>;
  onDoubleClick?: TableClick<T>;
  onContextMenu?: TableClick<T>;
  rowKey?: string | ((record: T, index: number) => string);
}
export default function PageTable<T>(props: PageTableProps<T>) {
  const [ selectedRowKeys, setRowKeys] = useState<string[]|number[]>([]);

  const onSelectChange = (selectedRowKeys: string[] | number[], selectedRows: T[]) => {
    props.onSelect && props.onSelect(selectedRowKeys, selectedRows);
    setRowKeys(selectedRowKeys);
  };

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: !!props.selections ? onSelectChange : undefined,
    hideDefaultSelections: true,
    selections: props.selections,
  };
  return (
    <Table
      rowSelection={!!props.selections ? rowSelection : undefined}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => props.onClick && props.onClick(event, record, rowIndex),
          onDoubleClick: event => props.onDoubleClick && props.onDoubleClick(event, record, rowIndex),
          onContextMenu: event => props.onContextMenu && props.onContextMenu(event, record, rowIndex),
        };
      }}
      size={props.size}
      tableLayout={props.tableLayout}
      scroll={{ y: '100%', scrollToFirstRowOnChange: true }}
      pagination={props.pagination}
      useFixedHeader={true}
      columns={props.columns}
      dataSource={props.dataSource}
      rowKey={props.rowKey}
      locale={{
        emptyText: "Não há dados",
        filterReset: "Resetar"
      }}
    />
  );
}
