import { PropType } from "vue";
import { RouteAdaptorComposition } from "../../Adaptors";
import { LaravelPagination } from "../../Pagination";
import { LaravelDataTableColumns } from "./interface";
declare const _default: import("vue").DefineComponent<{
    columns: {
        type: PropType<LaravelDataTableColumns<unknown>>;
        required: true;
    };
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
    adaptor: {
        type: PropType<RouteAdaptorComposition>;
        default: () => RouteAdaptorComposition;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    handleTextFilterUpdate: (value: any) => void;
    pagination: import("vue").ComputedRef<{
        handlePageChange: (page: number) => void;
        handlePageSizeChange: (perPage: number) => void;
        paginationProps: import("vue").ComputedRef<import("naive-ui").PaginationProps>;
        loading: import("vue").Ref<boolean> | undefined;
    }>;
    datatable: {
        columns: import("vue").Ref<import("./interface").LaravelDataTableColumn<unknown>[]>;
        filterColumns: import("./interface").LaravelDataTableColumn<unknown>[];
        handleCheckFilter: import("naive-ui/lib/data-table/src/interface").OnUpdateFilters;
        handleTextFilter: import("./interface").OnFilterText;
        handleDateRangeFilter: import("./interface").OnFilterDateRange;
        handleSort: import("./interface").OnHandleSort;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {
        type: PropType<LaravelDataTableColumns<unknown>>;
        required: true;
    };
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
    adaptor: {
        type: PropType<RouteAdaptorComposition>;
        default: () => RouteAdaptorComposition;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    adaptor: RouteAdaptorComposition;
    loading: boolean;
}>;
export default _default;
