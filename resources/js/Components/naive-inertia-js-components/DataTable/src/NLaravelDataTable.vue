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
      :on-update:filters="datatable.handleCheckFilter"
    />
  </n-space>
</template>

<script lang="ts">
import { NDataTable, NDatePicker, NInput, NInputGroup, NSpace } from "naive-ui";
import { computed, defineComponent, PropType, ref } from "vue";
import { RouteAdaptorComposition, useDefaultAdaptor } from "../../Adaptors";
import { LaravelPagination, useLaravelPagination } from "../../Pagination";
import { LaravelDataTableColumns } from "./interface";
import { useLaravelDataTable } from "./useDataTable";

export default defineComponent({
  name: "NLaravelDataTable",
  components: {
    NDataTable,
    NSpace,
    NInputGroup,
    NInput,
    NDatePicker,
  },
  props: {
    columns: {
      type: Array as PropType<LaravelDataTableColumns>,
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

    return {
      pagination,
      datatable,
    };
  },
});
</script>
