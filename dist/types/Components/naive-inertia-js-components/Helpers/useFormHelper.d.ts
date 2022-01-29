import { InertiaForm } from "@inertiajs/inertia-vue3";
import { Ref } from "vue";
declare type ToModelForm<T> = (model: T | null) => InertiaForm<Partial<T>>;
declare type ModelFormSetter<T> = {
    get: () => T[keyof T];
    set?: (model: T) => T[keyof T] | null;
};
declare type ComplexFormKeys<T> = Partial<Record<keyof T, ModelFormSetter<T>>>;
interface ModelFormGeneratorArguments<T> {
    simpleKeys?: Readonly<(keyof T)[]>;
    complexKeys?: Readonly<ComplexFormKeys<T>>;
}
export declare const useInertiaFormHelper: () => {
    generateModelForm: <T>(args: ModelFormGeneratorArguments<T>) => ToModelForm<T>;
    generateFormSubmssionEvent: (form: Ref<InertiaForm<unknown>> | null, submitRoute: string, processing?: Ref<boolean>, patch?: boolean, cb?: (() => void) | null) => () => void;
};
export {};
