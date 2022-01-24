<template>
  <n-laravel-pagination :pagination-data="paginationData" :adaptor="adaptor" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LaravelPagination } from "./interface";
import { useInertiaAdaptor } from "../../Adaptors";
import NLaravelPagination from "./NLaravelPagination.vue";

export default defineComponent({
  components: {
    NLaravelPagination,
  },
  props: {
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
