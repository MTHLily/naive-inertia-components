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
    const query = window.location.search
      .substring(1)
      .split("&")
      .map((queryPart) => queryPart.split("="))
      .reduce((carry, queryPart) => {
        const queryPair = {};
        queryPair[queryPart[0]] = queryPart[1];
        return Object.assign(carry, queryPair);
      }, {} as Query);
    console.log(route().params, query);
    return route().params as Query;
  };

  return {
    visit,
    getQuery,
  };
};
