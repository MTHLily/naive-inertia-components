import { OnUpdateFilters } from "naive-ui/lib/data-table/src/interface";
import { Ref } from "vue";
import { RouteAdaptor } from "../../Adaptors";
import { LaravelPagination } from "../../Pagination";
import { LaravelDataTableColumn, OnFilterDateRange, OnFilterText, OnHandleSort } from "./interface";
declare type LaravelDataTableComposable = (paginationData: LaravelPagination, unprocessedColumns: LaravelDataTableColumn[], adaptor: RouteAdaptor, loading: Ref<boolean>) => {
    columns: Ref<LaravelDataTableColumn[]>;
    filterColumns: LaravelDataTableColumn[];
    handleCheckFilter: OnUpdateFilters;
    handleTextFilter: OnFilterText;
    handleDateRangeFilter: OnFilterDateRange;
    handleSort: OnHandleSort;
};
export declare const useLaravelDataTable: LaravelDataTableComposable;
export {};
