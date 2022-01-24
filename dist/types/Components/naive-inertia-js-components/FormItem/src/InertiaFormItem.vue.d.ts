import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    form: {
        type: PropType<import("@inertiajs/inertia-vue3").InertiaFormProps<unknown>>;
        required: true;
    };
    formKey: {
        type: StringConstructor;
        required: true;
    };
    secondaryKeys: {
        type: PropType<string[]>;
        default: () => string[];
    };
}, {
    errors: import("vue").ComputedRef<import("./interface").ValidationErrors>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    form: {
        type: PropType<import("@inertiajs/inertia-vue3").InertiaFormProps<unknown>>;
        required: true;
    };
    formKey: {
        type: StringConstructor;
        required: true;
    };
    secondaryKeys: {
        type: PropType<string[]>;
        default: () => string[];
    };
}>>, {
    secondaryKeys: string[];
}>;
export default _default;
