import { DataTableColumn } from "naive-ui";
import { SortState } from "naive-ui/lib/data-table/src/interface";

export type LaravelDataTableColumn<T = unknown> = {
  key: string;
  sortOrder?: "ascend" | "descend" | null;
  children?: LaravelDataTableColumn<T>[];
  sorter?: boolean;
  filterValue?: string | string[] | number | number[] | null;
  filterTextValue?: string | null;
  filterDateRangeValue?: [number, number] | null;
  filterType: "text" | "daterange";
  title?: string;
} & DataTableColumn;

export type OnFilterText = (filterColumn: LaravelDataTableColumn) => void;
export type OnFilterDateRange = (filterColumn: LaravelDataTableColumn) => void;
export type OnHandleSort = (sortState: SortState) => void;
