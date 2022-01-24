<template>
  <n-laravel-data-table
    :columns="columns"
    :pagination-data="paginationData"
    :adaptor="adaptor"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LaravelPagination } from "../../Pagination";
import { useInertiaAdaptor } from "../../Adaptors";
import { LaravelDataTableColumns } from "./interface";
import NLaravelDataTable from "./NLaravelDataTable.vue";

export default defineComponent({
  name: "NInertiaDataTable",
  components: {
    NLaravelDataTable,
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
  },
  setup() {
    const adaptor = useInertiaAdaptor;

    return {
      adaptor,
    };
  },
});
</script>
