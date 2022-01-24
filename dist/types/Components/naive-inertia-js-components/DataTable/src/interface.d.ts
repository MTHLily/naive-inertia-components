import { DataTableColumn } from "naive-ui";
import { SortState } from "naive-ui/lib/data-table/src/interface";
export declare type LaravelDataTableColumn<T = unknown> = {
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
export declare type OnFilterText = (filterColumn: LaravelDataTableColumn) => void;
export declare type OnFilterDateRange = (filterColumn: LaravelDataTableColumn) => void;
export declare type OnHandleSort = (sortState: SortState) => void;
