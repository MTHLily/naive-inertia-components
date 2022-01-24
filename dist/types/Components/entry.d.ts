import * as all from "@/Components/naive-inertia-js-components/index";
declare const exports: {
    useDefaultAdaptor: all.RouteAdaptorComposition;
    useInertiaAdaptor: (loading?: import("vue").Ref<boolean>) => all.RouteAdaptor;
    NLaravelDataTable: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    NInertiaDataTable: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    NInertiaFormItem: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    useInertiaFormItem: () => {
        getFormErrors: (form: import("@inertiajs/inertia-vue3").InertiaFormProps<unknown>, primaryKey: string, secondaryKeys: string[]) => all.ValidationErrors;
    };
    useInertiaFormHelper: () => {
        generateModelForm: all.ModelFormGenerator<unknown>;
        generateFormSubmssionEvent: (form: import("vue").Ref<import("@inertiajs/inertia-vue3").InertiaFormProps<unknown>> | null, submitRoute: string, processing?: import("vue").Ref<boolean>, patch?: boolean, cb?: (() => void) | null) => () => void;
    };
    NLaravelPagination: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    NInertiaPagination: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    useLaravelPagination: (paginationData: all.LaravelPagination<any>, adaptor: all.RouteAdaptor, loading?: import("vue").Ref<boolean> | undefined, overrides?: {
        handlePageChangeOverride?: ((page: number) => void) | undefined;
        handlePerPageChangeOverride?: ((perPage: number) => void) | undefined;
    } | undefined) => {
        handlePageChange: (page: number) => void;
        handlePageSizeChange: (perPage: number) => void;
        paginationProps: import("vue").ComputedRef<import("naive-ui").PaginationProps>;
        loading: import("vue").Ref<boolean> | undefined;
    };
    plugin: (app: import("vue").App<any>, ...options: any[]) => any;
};
export default exports;
