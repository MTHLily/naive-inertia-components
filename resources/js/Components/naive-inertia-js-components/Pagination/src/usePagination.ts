import { RouteAdaptor } from "../../Adaptors";
import { PaginationProps } from "naive-ui";
import { computed, Ref } from "vue";
import { LaravelPagination } from "./interface";

export const useLaravelPagination = (
  paginationData: LaravelPagination,
  adaptor: RouteAdaptor,
  loading?: Ref<boolean>,
  overrides?: {
    handlePageChangeOverride?: (page: number) => void;
    handlePerPageChangeOverride?: (perPage: number) => void;
  }
) => {
  const handlePageChange = overrides?.handlePageChangeOverride
    ? overrides.handlePageChangeOverride
    : (page: number) => {
        const query = adaptor.getQuery();
        query.page = page;
        adaptor.visit(paginationData.path, query, {
          resetPage: false,
          preserveScroll: true,
          preserveState: true,
        });
      };

  const handlePageSizeChange = overrides?.handlePerPageChangeOverride
    ? overrides.handlePerPageChangeOverride
    : (perPage: number) => {
        const query = adaptor.getQuery();
        query["page.perPage"] = perPage;
        adaptor.visit(paginationData.path, query);
      };

  const paginationProps = computed(() => {
    return <PaginationProps>{
      page: paginationData.current_page,
      showSizePicker: true,
      pageSizes: [5, 10, 15],
      pageSize: parseInt(<string>paginationData.per_page),
      itemCount: paginationData.total,
      "onUpdate:page": handlePageChange,
      "onUpdate:pageSize": handlePageSizeChange,
    };
  });

  return {
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
    loading,
  };
};
