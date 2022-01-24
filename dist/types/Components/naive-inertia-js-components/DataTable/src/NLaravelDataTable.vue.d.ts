import { PropType, Ref } from "vue";
import route from "ziggy-js";
import { RouteAdaptorComposition } from "../../Adaptors/interface";
import { LaravelPagination } from "../../Pagination/src/interface";
import { LaravelDataTableColumn } from "./interface";
declare const _default: import("vue").DefineComponent<{
    columns: {
        type: PropType<LaravelDataTableColumn<unknown>[]>;
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
        loading: Ref<boolean> | undefined;
    }>;
    datatable: {
        columns: Ref<LaravelDataTableColumn<unknown>[]>;
        filterColumns: LaravelDataTableColumn<unknown>[];
        handleCheckFilter: import("naive-ui/lib/data-table/src/interface").OnUpdateFilters;
        handleTextFilter: import("./interface").OnFilterText;
        handleDateRangeFilter: import("./interface").OnFilterDateRange;
        handleSort: import("./interface").OnHandleSort;
    };
    route: typeof route;
    loading: Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {
        type: PropType<LaravelDataTableColumn<unknown>[]>;
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
    loading: boolean;
    adaptor: RouteAdaptorComposition;
}>;
export default _default;
