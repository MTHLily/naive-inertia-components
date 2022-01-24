<template>
  <n-laravel-data-table
    :columns="columns"
    :pagination-data="paginationData"
    :adaptor="adaptor"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { LaravelDataTableColumn } from "./interface";
import { LaravelPagination } from "../../Pagination/src/interface";
import { useInertiaAdaptor } from "../../Adaptors";
import NLaravelDataTable from "./NLaravelDataTable.vue";

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
  },
  components: {
    NLaravelDataTable,
  },
  setup() {
    const adaptor = useInertiaAdaptor;

    return {
      adaptor,
    };
  },
});
</script>
