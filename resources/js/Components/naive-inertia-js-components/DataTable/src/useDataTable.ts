import _ from "lodash";
import {
  FilterOptionValue,
  OnUpdateFilters,
} from "naive-ui/lib/data-table/src/interface";
import { onUnmounted, ref, Ref, watch, WatchStopHandle } from "vue";
import { RouteAdaptor } from "../../Adaptors";
import { LaravelPagination } from "../../Pagination";
import {
  LaravelDataTableColumn,
  OnFilterDateRange,
  OnFilterText,
  OnHandleSort,
} from "./interface";

type LaravelDataTableComposable = (
  paginationData: LaravelPagination,
  unprocessedColumns: LaravelDataTableColumn[],
  adaptor: RouteAdaptor,
  loading: Ref<boolean>
) => {
  columns: Ref<LaravelDataTableColumn[]>;
  filterColumns: LaravelDataTableColumn[];
  handleCheckFilter: OnUpdateFilters;
  handleTextFilter: OnFilterText;
  handleDateRangeFilter: OnFilterDateRange;
  handleSort: OnHandleSort;
};

export const useLaravelDataTable: LaravelDataTableComposable = (
  paginationData: LaravelPagination,
  unprocessedColumns: LaravelDataTableColumn[],
  adaptor: RouteAdaptor,
  loading: Ref<boolean> = ref(false)
) => {
  const tableColumnMap = (
    column: LaravelDataTableColumn
  ): LaravelDataTableColumn => {
    const values: LaravelDataTableColumn = { ...column };
    if (column.children) values.children = column.children.map(tableColumnMap);

    if (column.sorter) {
      const query = adaptor.getQuery();
      if (query.sort?.split("-").includes(column.key)) {
        if (query.sort.charAt(0) == "-") values.sortOrder = "descend";
        else values.sortOrder = "ascend";
      }
    }

    if (column.filterType === "check") {
      values.filter = true;
    }

    if (column.filterType === "text") {
      const query = adaptor.getQuery();
      if (query.filter && query.filter[column.key])
        values.filterTextValue = query.filter[column.key];
      else values.filterTextValue = null;
    }

    if (column.filterType === "daterange") {
      const query = adaptor.getQuery();
      if (query.filter && query.filter[column.key]) {
        values.filterDateRangeValue = query.filter[`${column.key}`]
          .split(",")
          .map((date) => new Date(date).getTime());
      } else values.filterDateRangeValue = null;
    }

    return values;
  };

  const columns = ref(unprocessedColumns.map(tableColumnMap));
  const filterColumns = columns.value.filter(
    (column) =>
      column.filterType === "text" || column.filterType === "daterange"
  );

  const handleCheckFilter: OnUpdateFilters = (filters, column) => {
    const query = adaptor.getQuery();
    if (column?.key) {
      const columnFilters = filters[column.key];
      const filterValue = (columnFilters as FilterOptionValue[]).join(",");

      if (!query.filter) query.filter = {};

      query.filter[column.key] = filterValue;
      adaptor.visit(paginationData.path, query);
    }
  };

  const handleTextFilter: OnFilterText = (column) => {
    loading.value = true;
    const query = adaptor.getQuery();
    const filterValue = column.filterTextValue;

    if (!query.filter) query.filter = {};

    if (query.filter[column.key] == filterValue) return;

    query.filter[column.key] = filterValue;
    adaptor.visit(paginationData.path, query);
  };

  const handleDateRangeFilter: OnFilterDateRange = (value) => {
    const query = adaptor.getQuery();
    const filterValue = (value.filterDateRangeValue as number[])
      .map((date) => new Date(date).toISOString().split("T")[0])
      .join(",");

    const filter = query.filter ?? {};

    if (filter[`${value.key}`] == filterValue) return;

    filter[`${value.key}`] = filterValue;
    Object.assign(query, { filter });
    adaptor.visit(paginationData.path, query);
  };

  const handleSort: OnHandleSort = (option) => {
    loading.value = true;
    const query = adaptor.getQuery();

    if (option.order)
      query.sort = `${option.order == "descend" ? "-" : ""}${option.columnKey}`;
    else query.sort = null;

    adaptor.visit(paginationData.path, query, {
      preserveState: false,
    });
  };

  const unsubscribe: WatchStopHandle[] = [];

  filterColumns.forEach((column) => {
    if (column.filterType === "text") {
      unsubscribe.push(watch(column, _.throttle(handleTextFilter, 1000)));
    }
    if (column.filterType === "daterange")
      unsubscribe.push(watch(column, handleDateRangeFilter));
  });

  onUnmounted(() => {
    unsubscribe.forEach((unsub) => unsub());
  });

  return {
    columns,
    filterColumns,
    handleCheckFilter,
    handleTextFilter,
    handleDateRangeFilter,
    handleSort,
  };
};
