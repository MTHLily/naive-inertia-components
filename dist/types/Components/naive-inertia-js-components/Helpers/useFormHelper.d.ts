import { InertiaForm } from "@inertiajs/inertia-vue3";
import { Ref } from "vue";
declare type ToModelForm<T = any> = (model?: T | null) => InertiaForm<T>;
export declare type ModelFormGenerator<T = unknown> = (args: ModelFormGeneratorArguments<T>) => ToModelForm<T>;
declare type ModelFormSetter<T = unknown> = {
    get: () => unknown;
    set?: (model: T) => unknown | null;
};
declare type ComplexFormKeys<T = unknown> = Partial<Record<keyof Partial<T>, ModelFormSetter<T>>>;
interface ModelFormGeneratorArguments<T = unknown> {
    simpleKeys?: (keyof T)[];
    complexKeys?: ComplexFormKeys<T>;
}
export declare const useInertiaFormHelper: () => {
    generateModelForm: ModelFormGenerator<unknown>;
    generateFormSubmssionEvent: (form: Ref<InertiaForm<unknown>> | null, submitRoute: string, processing?: Ref<boolean>, patch?: boolean, cb?: (() => void) | null) => () => void;
};
export {};
