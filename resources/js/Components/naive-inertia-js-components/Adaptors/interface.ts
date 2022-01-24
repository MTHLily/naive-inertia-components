import { VisitOptions } from "@inertiajs/inertia";
import { Ref } from "vue";
import { RouteParams } from "ziggy-js";
export type Query = RouteParams & {
  filter?: string | null | undefined | Record<string, string | null>;
  sort?: string | null;
  page?: string | number | null;
};

export interface VisitFunctionOptions extends VisitOptions {
  onFinished?: () => void;
  resetPage?: boolean;
  preserveState?: boolean;
  preserveScroll?: boolean;
}
export type VisitFunction = (
  path: string,
  query: Query,
  options?: VisitFunctionOptions
) => void;

export type GetQueryFunction = () => Query;
export interface CommonOptions {
  visit: VisitFunction;
  loading?: Ref<boolean>;
  getQuery: GetQueryFunction;
}

export interface RouteAdaptor {
  visit: VisitFunction;
  getQuery: GetQueryFunction;
}

export type RouteAdaptorComposition = (loading?: Ref<boolean>) => RouteAdaptor;
