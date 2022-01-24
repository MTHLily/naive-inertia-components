import { InertiaForm } from "@inertiajs/inertia-vue3";
import { ValidationErrors } from "./interface";
export declare const useInertiaFormItem: () => {
    getFormErrors: (form: InertiaForm<unknown>, primaryKey: string, secondaryKeys: string[]) => ValidationErrors;
};
