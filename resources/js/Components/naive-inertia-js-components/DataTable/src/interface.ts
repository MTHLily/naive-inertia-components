import { DataTableColumn } from "naive-ui";
import { SortState } from "naive-ui/lib/data-table/src/interface";

/**
 * Wrapper around the Laravel pagination object.
 * Specify the model using <Model>
 */
export type LaravelDataTableColumn<T = unknown> = {
  key: string;
  sortOrder?: "ascend" | "descend" | null;
  children?: LaravelDataTableColumn<T>[];
  sorter?: boolean;
  filterValue?: string | string[] | number | number[] | null;
  filterTextValue?: string | null;
  filterDateRangeValue?: [number, number] | null;
  filterType: "text" | "daterange" | "check";
  filter?: boolean;
  title?: string;
} & DataTableColumn;

export type LaravelDataTableColumns<T = unknown> = LaravelDataTableColumn<T>[];

export type OnFilterText = (filterColumn: LaravelDataTableColumn) => void;
export type OnFilterDateRange = (filterColumn: LaravelDataTableColumn) => void;
export type OnHandleSort = (sortState: SortState) => void;
