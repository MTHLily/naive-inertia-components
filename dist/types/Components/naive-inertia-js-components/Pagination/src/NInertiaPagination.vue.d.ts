import { PropType } from "vue";
import { LaravelPagination } from "..";
declare const _default: import("vue").DefineComponent<{
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
}, {
    adaptor: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    paginationData: {
        type: PropType<LaravelPagination<any>>;
        required: true;
    };
}>>, {}>;
export default _default;
