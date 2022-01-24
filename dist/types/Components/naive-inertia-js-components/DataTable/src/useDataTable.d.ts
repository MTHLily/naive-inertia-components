import { Ref } from "vue";
import { LaravelDataTableColumn, OnFilterDateRange, OnFilterText, OnHandleSort } from "..";
import { LaravelPagination, RouteAdaptor } from "../..";
import { OnUpdateFilters } from "naive-ui/lib/data-table/src/interface";
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
