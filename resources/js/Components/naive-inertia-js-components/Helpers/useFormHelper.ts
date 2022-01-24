import { VisitOptions, Method, Inertia } from "@inertiajs/inertia";
import { InertiaForm, useForm } from "@inertiajs/inertia-vue3";
import _ from "lodash";
import { Ref, ref } from "vue";

type ToModelForm<T = any> = (model?: T | null) => InertiaForm<T>;

export type ModelFormGenerator<T = unknown> = (
  args: ModelFormGeneratorArguments<T>
) => ToModelForm<T>;

type ModelFormSetter<T = unknown> = {
  get: () => unknown;
  set?: (model: T) => unknown | null;
};

type ComplexFormKeys<T = unknown> = Partial<
  Record<keyof Partial<T>, ModelFormSetter<T>>
>;

interface ModelFormGeneratorArguments<T = unknown> {
  simpleKeys?: (keyof T)[];
  complexKeys?: ComplexFormKeys<T>;
}

export const useInertiaFormHelper = () => {
  const generateFormSubmssionEvent = (
    form: Ref<InertiaForm<unknown>> | null,
    submitRoute: string,
    processing: Ref<boolean> = ref(false),
    patch = false,
    cb: (() => void) | null = null
  ) => {
    const requestOpts: VisitOptions = {
      method: patch ? Method.PATCH : Method.POST,
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        if (cb instanceof Function) cb();
        processing.value = false;
      },
    };

    const sendRequest =
      form === null
        ? () => {
            Inertia.visit(submitRoute, requestOpts);
          }
        : patch
        ? () => {
            form.value.patch(submitRoute, requestOpts);
          }
        : () => {
            form.value.post(submitRoute, requestOpts);
          };

    const handleSubmit = () => {
      processing.value = true;
      sendRequest();
    };

    return handleSubmit;
  };

  const generateModelForm: ModelFormGenerator = (args) => {
    const toModelForm: ToModelForm = (model = null) => {
      if (model === null) {
        const values = {};
        args.simpleKeys?.forEach((key) => {
          Object.assign(values, {
            [key]: null,
          });
        });
        if (args.complexKeys)
          for (const [key, getters] of Object.entries<ModelFormSetter>(
            args.complexKeys
          )) {
            Object.assign(values, {
              [key]: getters?.get(),
            });
          }
        return useForm(values);
      }

      const values = args.simpleKeys ? _.pick(model, args.simpleKeys) : {};

      if (args.complexKeys)
        for (const [key, getters] of Object.entries<ModelFormSetter>(
          args.complexKeys
        )) {
          values[key] = getters.set ? getters.set(model) : model[key];
        }

      return useForm(values);
    };

    return toModelForm;
  };

  return {
    generateModelForm,
    generateFormSubmssionEvent,
  };
};
