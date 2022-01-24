import { InertiaForm } from "@inertiajs/inertia-vue3";
import { ValidationErrors } from "./interface";

export const useInertiaFormItem = () => {
  const getFormErrors = (
    form: InertiaForm<unknown>,
    primaryKey: string,
    secondaryKeys: string[]
  ): ValidationErrors => {
    const status: ValidationErrors = {};
    if (form.errors[primaryKey]) {
      status.status = "error";
      status.message = form.errors[primaryKey];
      return status;
    }

    if (!Array.isArray(form[primaryKey])) return status;

    const length = form[primaryKey]?.length;
    for (let x = 0; x < length; x++)
      for (let y = 0; y < secondaryKeys.length; y++)
        if (form.errors[`${primaryKey}.${x}.${secondaryKeys[y]}`]) {
          status.status = "error";
          status.message =
            form.errors[`${primaryKey}.${x}.${secondaryKeys[y]}`];
          status.index = x;
          return status;
        }
    return status;
  };

  return {
    getFormErrors,
  };
};
