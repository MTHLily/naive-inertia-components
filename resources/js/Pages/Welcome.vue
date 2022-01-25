<template>
  <Head title="Welcome" />
  <!-- <n-inertia-data-table :pagination-data="users" :columns="table.columns" /> -->
  <package-table :pagination-data="users" :columns="table.columns" />
  <n-form>
    <n-inertia-form-item :form="form" form-key="name" label="Name">
      <n-input v-model:value="form.name" />
    </n-inertia-form-item>
    <n-inertia-form-item :form="form" form-key="email" label="Email">
      <n-input v-model:value="form.email" />
    </n-inertia-form-item>
    <n-inertia-form-item :form="form" form-key="password" label="Password">
      <n-input v-model:value="form.password" type="password" />
    </n-inertia-form-item>
    <n-inertia-form-item
      :form="form"
      form-key="password_confirmation"
      label="password_confirmation"
    >
      <n-input v-model:value="form.password_confirmation" type="password" />
    </n-inertia-form-item>
    <n-button :loading="processing" @click="handleSubmit">Submit</n-button>
  </n-form>
  <pre>{{ users }}</pre>
  <div>Hello World!</div>
</template>

<script lang="ts">
import {
  NInertiaDataTable,
  NInertiaFormItem,
} from "@/Components/naive-inertia-js-components";
import {
  LaravelDataTableColumns,
  LaravelPagination,
} from "@/Components/naive-inertia-js-components";

import { NLaravelDataTable as PackageTable } from "naive-inertia-components";

import { ModelFormGenerator } from "@/Components/naive-inertia-js-components/Helpers/useFormHelper";
import { useInertiaFormHelper } from "@/Components/naive-inertia-js-components/Helpers";
import { User } from "@/Types/models";
import { Head } from "@inertiajs/inertia-vue3";
import { NButton, NForm, NInput } from "naive-ui";
import { defineComponent, PropType, ref } from "vue";
import route from "ziggy-js";

export default defineComponent({
  components: {
    PackageTable,
    NInertiaFormItem,
    Head,
    NForm,
    NInput,
    NButton,
  },
  props: {
    users: {
      type: Object as PropType<LaravelPagination<User>>,
      required: true,
    },
  },
  setup(props) {
    const columns = <LaravelDataTableColumns>[
      {
        key: "id",
        title: "ID",
        sorter: true,
        filter: true,
        filterOptions: [
          {
            label: "1",
            value: 1,
          },
        ],
      },
      {
        key: "name",
        title: "Name",
        sorter: true,
        filterType: "text",
      },
      {
        key: "created_at",
        title: "Join Date",
        sorter: true,
        filterType: "daterange",
      },
    ];
    const { generateFormSubmssionEvent, generateModelForm } =
      useInertiaFormHelper();

    const toModelForm = (
      generateModelForm as ModelFormGenerator<
        User & { password?: string; password_confirmation?: string }
      >
    )({
      simpleKeys: ["id", "name", "email"],
      complexKeys: {
        created_at: {
          get: () => {
            return new Date();
          },
        },
      },
    });

    const form = ref(toModelForm(props.users.data[0]));
    console.log("MODEL FORM", form.value);

    const routeValue = route("home");
    const processing = ref(false);
    const handleSubmit = generateFormSubmssionEvent(
      form,
      route("register"),
      processing
    );

    return { processing, handleSubmit, form, routeValue, table: { columns } };
  },
});
</script>
