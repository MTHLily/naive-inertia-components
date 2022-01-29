import { VisitOptions, Method, Inertia } from "@inertiajs/inertia";
import { InertiaForm, useForm } from "@inertiajs/inertia-vue3";
import _ from "lodash";
import { Ref, ref } from "vue";

type ToModelForm<T> = (model: T | null) => InertiaForm<Partial<T>>;

type ModelFormSetter<T> = {
  get: () => T[keyof T];
  set?: (model: T) => T[keyof T] | null;
};

type ComplexFormKeys<T> = Partial<Record<keyof T, ModelFormSetter<T>>>;

interface ModelFormGeneratorArguments<T> {
  simpleKeys?: Readonly<(keyof T)[]>;
  complexKeys?: Readonly<ComplexFormKeys<T>>;
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

  function generateModelForm<T>(
    args: ModelFormGeneratorArguments<T>
  ): ToModelForm<T> {
    const toModelForm: ToModelForm<T> = (model = null) => {
      if (model === null) {
        const values = {} as T;
        args.simpleKeys?.forEach((key) => {
          Object.assign(values, {
            [key]: null,
          });
        });
        if (args.complexKeys)
          Object.entries(args.complexKeys).forEach(([key, getters]) => {
            Object.assign(values, {
              [key]: (getters as ModelFormSetter<T>).get(),
            });
          });
        return useForm(values);
      }

      const values = args.simpleKeys
        ? _.pick(model, args.simpleKeys)
        : ({} as T);

      if (args.complexKeys)
        for (const [key, getters] of Object.entries(args.complexKeys)) {
          if ((getters as ModelFormSetter<T>).set)
            values[key] = (getters as Required<ModelFormSetter<T>>).set(model);
          else model[key];
        }

      return useForm(values);
    };

    return toModelForm;
  }

  return {
    generateModelForm,
    generateFormSubmssionEvent,
  };
};
