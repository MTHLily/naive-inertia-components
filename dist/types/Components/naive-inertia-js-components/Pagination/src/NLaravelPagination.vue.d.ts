import { PropType, Ref } from "vue";
import { RouteAdaptorComposition } from "../../Adaptors";
import { LaravelPagination } from "./interface";
declare const _default: import("vue").DefineComponent<{
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
    adaptor: {
        type: PropType<RouteAdaptorComposition>;
        required: true;
    };
    loading: {
        type: PropType<Ref<boolean>>;
        default: () => Ref<boolean>;
    };
}, {
    paginationProps: import("vue").ComputedRef<import("naive-ui").PaginationProps>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
    adaptor: {
        type: PropType<RouteAdaptorComposition>;
        required: true;
    };
    loading: {
        type: PropType<Ref<boolean>>;
        default: () => Ref<boolean>;
    };
}>>, {
    loading: Ref<boolean>;
}>;
export default _default;
