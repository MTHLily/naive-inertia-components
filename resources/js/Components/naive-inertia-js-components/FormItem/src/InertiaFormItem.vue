<template>
  <n-form-item
    :attrs="$attrs"
    :validation-status="errors.status"
    :feedback="errors.message"
  >
    <slot />
  </n-form-item>
</template>

<script lang="ts">
import { InertiaForm } from "@inertiajs/inertia-vue3";
import { NFormItem } from "naive-ui";
import { computed, defineComponent, PropType } from "vue";
import { useInertiaFormItem } from "./useInertiaFormItem";

export default defineComponent({
  components: {
    NFormItem,
  },
  props: {
    form: {
      type: Object as PropType<InertiaForm<unknown>>,
      required: true,
    },
    formKey: {
      type: String,
      required: true,
    },
    secondaryKeys: {
      type: Object as PropType<string[]>,
      default: () => <string[]>[],
    },
  },
  setup(props) {
    const { getFormErrors } = useInertiaFormItem();
    const errors = computed(() =>
      getFormErrors(props.form, props.formKey, props.secondaryKeys)
    );

    return { errors };
  },
});
</script>
