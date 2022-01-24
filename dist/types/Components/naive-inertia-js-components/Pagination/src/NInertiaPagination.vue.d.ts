import { PropType } from "vue";
import { LaravelPagination } from "./interface";
declare const _default: import("vue").DefineComponent<{
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
}, {
    adaptor: (loading?: import("vue").Ref<boolean>) => import("../../Adaptors").RouteAdaptor;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
}>>, {}>;
export default _default;
