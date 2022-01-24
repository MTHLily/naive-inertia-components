import { Inertia, RequestPayload } from "@inertiajs/inertia";
import { ref, Ref } from "vue";
import route from "ziggy-js";
import {
  GetQueryFunction,
  Query,
  RouteAdaptor,
  VisitFunction,
} from "./interface";

export const useInertiaAdaptor = (
  loading: Ref<boolean> = ref(false)
): RouteAdaptor => {
  const visit: VisitFunction = (
    path,
    query,
    options = {
      resetPage: true,
      preserveScroll: true,
      preserveState: true,
    }
  ) => {
    if (options.resetPage && query.page) query.page = 1;
    Inertia.visit(path, {
      data: query as RequestPayload,
      preserveScroll: options.preserveScroll,
      preserveState: options.preserveState,
      replace: true,
      onFinish: () => {
        loading.value = false;
      },
    });
  };

  const getQuery: GetQueryFunction = () => {
    return route().params as Query;
  };

  return {
    visit,
    getQuery,
  };
};
