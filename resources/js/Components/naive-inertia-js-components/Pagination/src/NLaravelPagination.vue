<template>
  <n-pagination v-bind="paginationProps" />
</template>

<script lang="ts">
import { NPagination } from "naive-ui";
import { defineComponent, PropType, ref, Ref } from "vue";
import { RouteAdaptorComposition } from "../../Adaptors";
import { LaravelPagination } from "./interface";
import { useLaravelPagination } from "./usePagination";

export default defineComponent({
  components: {
    NPagination,
  },
  props: {
    paginationData: {
      type: Object as PropType<LaravelPagination>,
      required: true,
    },
    adaptor: {
      type: Object as PropType<RouteAdaptorComposition>,
      required: true,
    },
    loading: {
      type: Object as PropType<Ref<boolean>>,
      default: () => ref(false),
    },
  },
  setup(props) {
    const { paginationProps } = useLaravelPagination(
      props.paginationData,
      props.adaptor(),
      props.loading
    );

    return {
      paginationProps,
    };
  },
});
</script>
