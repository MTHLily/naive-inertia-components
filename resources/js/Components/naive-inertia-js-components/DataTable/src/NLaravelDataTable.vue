<template>
  <n-space vertical>
    <n-input-group>
      <template v-for="column in datatable.filterColumns" :key="column.key">
        <n-input
          v-if="column.filterType === 'text'"
          v-model:value="column.filterTextValue"
          :placeholder="`Filter ${column.title}...`"
        />
        <n-date-picker
          v-if="column.filterType === 'daterange'"
          v-model:value="column.filterDateRangeValue"
          type="daterange"
          :placeholder="`Filter $${column.title}...`"
          clearable
        />
      </template>
    </n-input-group>
    <n-data-table
      remote
      :loading="loading"
      :columns="datatable.columns.value"
      :data="paginationData.data"
      :pagination="pagination.paginationProps.value"
      :on-update:sorter="datatable.handleSort"
    ></n-data-table>
  </n-space>
  {{ datatable.columns }}
</template>

<script lang="ts">
import { NDataTable, NSpace, NInputGroup, NInput, NDatePicker } from "naive-ui";
import { computed, defineComponent, PropType, reactive, Ref, ref } from "vue";
import route from "ziggy-js";
import { RouteAdaptorComposition } from "../../Adaptors/interface";
import { useDefaultAdaptor } from "../../Adaptors/useDefaultAdaptor";
import { LaravelPagination } from "../../Pagination/src/interface";
import { useLaravelPagination } from "../../Pagination/src/usePagination";
import { LaravelDataTableColumn } from "./interface";
import { useLaravelDataTable } from "./useDataTable";

export default defineComponent({
  name: "LaravelDataTable",
  props: {
    columns: {
      type: Array as PropType<LaravelDataTableColumn[]>,
      required: true,
    },
    paginationData: {
      type: Object as PropType<LaravelPagination>,
      required: true,
    },
    adaptor: {
      type: Function as PropType<RouteAdaptorComposition>,
      default: () => {
        return useDefaultAdaptor;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    NDataTable,
    NSpace,
    NInputGroup,
    NInput,
    NDatePicker,
  },
  setup(props) {
    const loading = ref(props.loading);
    const adaptor = props.adaptor(loading);
    const pagination = computed(() =>
      useLaravelPagination(props.paginationData, adaptor, loading)
    );

    const datatable = useLaravelDataTable(
      props.paginationData,
      props.columns,
      adaptor,
      loading
    );

    const handleTextFilterUpdate = (value) => {
      console.log(value);
    };

    return {
      handleTextFilterUpdate,
      pagination,
      datatable,
      route,
      loading,
    };
  },
});
</script>
