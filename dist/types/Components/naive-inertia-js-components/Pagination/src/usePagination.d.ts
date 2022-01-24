import { RouteAdaptor } from "../../Adaptors";
import { PaginationProps } from "naive-ui";
import { Ref } from "vue";
import { LaravelPagination } from "./interface";
export declare const useLaravelPagination: (paginationData: LaravelPagination, adaptor: RouteAdaptor, loading?: Ref<boolean> | undefined, overrides?: {
    handlePageChangeOverride?: ((page: number) => void) | undefined;
    handlePerPageChangeOverride?: ((perPage: number) => void) | undefined;
} | undefined) => {
    handlePageChange: (page: number) => void;
    handlePageSizeChange: (perPage: number) => void;
    paginationProps: import("vue").ComputedRef<PaginationProps>;
    loading: Ref<boolean> | undefined;
};
