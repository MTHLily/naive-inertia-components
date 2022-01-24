import { PropType } from "vue";
import route from "ziggy-js";
import { LaravelPagination } from "../../Pagination";
import { LaravelDataTableColumns } from "..";
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
        default: () => import("../../Adaptors/interface").RouteAdaptorComposition;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    handleTextFilterUpdate: (value: any) => void;
    pagination: import("vue").ComputedRef<any>;
    datatable: any;
    route: typeof route;
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
        default: () => import("../../Adaptors/interface").RouteAdaptorComposition;
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
