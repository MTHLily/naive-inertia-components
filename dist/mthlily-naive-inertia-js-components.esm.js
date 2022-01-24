import { NDataTable, NSpace, NInputGroup, NInput, NDatePicker, NPagination, NFormItem } from 'naive-ui';
import { computed, ref, watch, defineComponent, resolveComponent, openBlock, createElementBlock, Fragment, createVNode, withCtx, renderList, createBlock, createCommentVNode, createTextVNode, toDisplayString, normalizeProps, guardReactiveProps, renderSlot } from 'vue';
import route from 'ziggy-js';
import _ from 'lodash';
import { Inertia, Method } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-vue3';

const useDefaultAdaptor = () => {
  const visit = function (path, query) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      resetPage: true,
      preserveState: true
    };
    console.log(path, query, options);
  };

  const getQuery = () => {
    console.log("GET QUERY");
    return {
      filter: "hello"
    };
  };

  return {
    visit,
    getQuery
  };
};

const useLaravelPagination = (paginationData, adaptor, loading, overrides) => {
  const handlePageChange = overrides?.handlePageChangeOverride ? overrides.handlePageChangeOverride : page => {
    const query = adaptor.getQuery();
    query.page = page;
    adaptor.visit(paginationData.path, query, {
      resetPage: false,
      preserveScroll: true,
      preserveState: true
    });
  };
  const handlePageSizeChange = overrides?.handlePerPageChangeOverride ? overrides.handlePerPageChangeOverride : perPage => {
    const query = adaptor.getQuery();
    query["page.perPage"] = perPage;
    adaptor.visit(paginationData.path, query);
  };
  const paginationProps = computed(() => {
    return {
      page: paginationData.current_page,
      showSizePicker: true,
      pageSizes: [5, 10, 15],
      pageSize: parseInt(paginationData.per_page),
      itemCount: paginationData.total,
      "onUpdate:page": handlePageChange,
      "onUpdate:pageSize": handlePageSizeChange
    };
  });
  return {
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
    loading
  };
};

const useLaravelDataTable = function (paginationData, unprocessedColumns, adaptor) {
  let loading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ref(false);

  const tableColumnMap = column => {
    const values = { ...column
    };
    if (column.children) values.children = column.children.map(tableColumnMap);

    if (column.sorter) {
      const query = adaptor.getQuery();

      if (query.sort?.split("-").includes(column.key)) {
        if (query.sort.charAt(0) == "-") values.sortOrder = "descend";else values.sortOrder = "ascend";
      }
    }

    if (column.filterType === "text") {
      const query = adaptor.getQuery();
      if (query.filter && query.filter[column.key]) values.filterTextValue = query.filter[column.key];else values.filterTextValue = null;
    }

    if (column.filterType === "daterange") {
      const query = adaptor.getQuery();

      if (query.filter && query.filter[column.key]) {
        values.filterDateRangeValue = query.filter[`${column.key}`].split(",").map(date => new Date(date).getTime());
      } else values.filterDateRangeValue = null;
    }

    return values;
  };

  const columns = ref(unprocessedColumns.map(tableColumnMap));
  const filterColumns = columns.value.filter(column => column.filterType === "text" || column.filterType === "daterange");

  const handleCheckFilter = (filters, column) => {
    const query = adaptor.getQuery();

    if (column?.key) {
      const columnFilters = filters[column.key];
      const filterValue = columnFilters.join(",");
      if (!query.filter) query.filter = {};
      query.filter[column.key] = filterValue;
      adaptor.visit(paginationData.path, query);
    }
  };

  const handleTextFilter = column => {
    loading.value = true;
    const query = adaptor.getQuery();
    const filterValue = column.filterTextValue;
    if (!query.filter) query.filter = {};
    if (query.filter[column.key] == filterValue) return;
    query.filter[column.key] = filterValue;
    adaptor.visit(paginationData.path, query);
  };

  const handleDateRangeFilter = value => {
    const query = adaptor.getQuery();
    const filterValue = value.filterDateRangeValue.map(date => new Date(date).toISOString().split("T")[0]).join(",");
    const filter = query.filter ?? {};
    if (filter[`${value.key}`] == filterValue) return;
    filter[`${value.key}`] = filterValue;
    Object.assign(query, {
      filter
    });
    adaptor.visit(paginationData.path, query);
  };

  const handleSort = option => {
    loading.value = true;
    const query = adaptor.getQuery();
    if (option.order) query.sort = `${option.order == "descend" ? "-" : ""}${option.columnKey}`;else query.sort = null;
    adaptor.visit(paginationData.path, query, {
      preserveState: false
    });
  };

  filterColumns.forEach(column => {
    if (column.filterType === "text") watch(column, _.throttle(handleTextFilter, 1000));
    if (column.filterType === "daterange") watch(column, handleDateRangeFilter);
  });
  return {
    columns,
    filterColumns,
    handleCheckFilter,
    handleTextFilter,
    handleDateRangeFilter,
    handleSort
  };
};

var script$3 = defineComponent({
  name: "LaravelDataTable",
  props: {
    columns: {
      type: Array,
      required: true
    },
    paginationData: {
      type: Object,
      required: true
    },
    adaptor: {
      type: Function,
      default: () => {
        return useDefaultAdaptor;
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NDataTable,
    NSpace,
    NInputGroup,
    NInput,
    NDatePicker
  },

  setup(props) {
    const loading = ref(props.loading);
    const adaptor = props.adaptor(loading);
    const pagination = computed(() => useLaravelPagination(props.paginationData, adaptor, loading));
    const datatable = useLaravelDataTable(props.paginationData, props.columns, adaptor, loading);

    const handleTextFilterUpdate = value => {
      console.log(value);
    };

    return {
      handleTextFilterUpdate,
      pagination,
      datatable,
      route,
      loading
    };
  }

});

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_input = resolveComponent("n-input");

  const _component_n_date_picker = resolveComponent("n-date-picker");

  const _component_n_input_group = resolveComponent("n-input-group");

  const _component_n_data_table = resolveComponent("n-data-table");

  const _component_n_space = resolveComponent("n-space");

  return openBlock(), createElementBlock(Fragment, null, [createVNode(_component_n_space, {
    vertical: ""
  }, {
    default: withCtx(() => [createVNode(_component_n_input_group, null, {
      default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.datatable.filterColumns, column => {
        return openBlock(), createElementBlock(Fragment, {
          key: column.key
        }, [column.filterType === 'text' ? (openBlock(), createBlock(_component_n_input, {
          key: 0,
          value: column.filterTextValue,
          "onUpdate:value": $event => column.filterTextValue = $event,
          placeholder: `Filter ${column.title}...`
        }, null, 8, ["value", "onUpdate:value", "placeholder"])) : createCommentVNode("", true), column.filterType === 'daterange' ? (openBlock(), createBlock(_component_n_date_picker, {
          key: 1,
          value: column.filterDateRangeValue,
          "onUpdate:value": $event => column.filterDateRangeValue = $event,
          type: "daterange",
          placeholder: `Filter $${column.title}...`,
          clearable: ""
        }, null, 8, ["value", "onUpdate:value", "placeholder"])) : createCommentVNode("", true)], 64);
      }), 128))]),
      _: 1
    }), createVNode(_component_n_data_table, {
      remote: "",
      loading: _ctx.loading,
      columns: _ctx.datatable.columns.value,
      data: _ctx.paginationData.data,
      pagination: _ctx.pagination.paginationProps.value,
      "on-update:sorter": _ctx.datatable.handleSort
    }, null, 8, ["loading", "columns", "data", "pagination", "on-update:sorter"])]),
    _: 1
  }), createTextVNode(" " + toDisplayString(_ctx.datatable.columns), 1)], 64);
}

script$3.render = render$3;

const useInertiaAdaptor = function () {
  let loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ref(false);

  const visit = function (path, query) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      resetPage: true,
      preserveScroll: true,
      preserveState: true
    };
    if (options.resetPage && query.page) query.page = 1;
    Inertia.visit(path, {
      data: query,
      preserveScroll: options.preserveScroll,
      preserveState: options.preserveState,
      replace: true,
      onFinish: () => {
        loading.value = false;
      }
    });
  };

  const getQuery = () => {
    const query = window.location.search.substring(1).split("&").map(queryPart => queryPart.split("=")).reduce((carry, queryPart) => {
      const queryPair = {};
      queryPair[queryPart[0]] = queryPart[1];
      return Object.assign(carry, queryPair);
    }, {});
    console.log(route().params, query);
    return route().params;
  };

  return {
    visit,
    getQuery
  };
};

var script$2 = defineComponent({
  name: "LaravelDataTable",
  props: {
    columns: {
      type: Array,
      required: true
    },
    paginationData: {
      type: Object,
      required: true
    }
  },
  components: {
    NLaravelDataTable: script$3
  },

  setup() {
    const adaptor = useInertiaAdaptor;
    return {
      adaptor
    };
  }

});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_laravel_data_table = resolveComponent("n-laravel-data-table");

  return openBlock(), createBlock(_component_n_laravel_data_table, {
    columns: _ctx.columns,
    "pagination-data": _ctx.paginationData,
    adaptor: _ctx.adaptor
  }, null, 8, ["columns", "pagination-data", "adaptor"]);
}

script$2.render = render$2;

var script$1 = defineComponent({
  components: {
    NPagination
  },
  props: {
    paginationData: {
      type: Object,
      required: true
    },
    adaptor: {
      type: Object,
      required: true
    },
    loading: {
      type: Object,
      default: () => ref(false)
    }
  },

  setup(props) {
    const {
      paginationProps
    } = useLaravelPagination(props.paginationData, props.adaptor(), props.loading);
    return {
      paginationProps
    };
  }

});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_pagination = resolveComponent("n-pagination");

  return openBlock(), createBlock(_component_n_pagination, normalizeProps(guardReactiveProps(_ctx.paginationProps)), null, 16);
}

script$1.render = render$1;

var script = defineComponent({
  components: {
    NFormItem
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    formKey: {
      type: String,
      required: true
    },
    secondaryKeys: {
      type: Object,
      default: () => []
    }
  },

  setup(props) {
    const {
      getFormErrors
    } = useInertiaFormItem();
    const errors = computed(() => getFormErrors(props.form, props.formKey, props.secondaryKeys));
    return {
      errors
    };
  }

});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_form_item = resolveComponent("n-form-item");

  return openBlock(), createBlock(_component_n_form_item, {
    attrs: _ctx.$attrs,
    "validation-status": _ctx.errors.status,
    feedback: _ctx.errors.message
  }, {
    default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
    _: 3
  }, 8, ["attrs", "validation-status", "feedback"]);
}

script.render = render;

const useInertiaFormItem = () => {
  const getFormErrors = (form, primaryKey, secondaryKeys) => {
    const status = {};

    if (form.errors[primaryKey]) {
      status.status = "error";
      status.message = form.errors[primaryKey];
      return status;
    }

    if (!Array.isArray(form[primaryKey])) return status;
    const length = form[primaryKey]?.length;

    for (let x = 0; x < length; x++) for (let y = 0; y < secondaryKeys.length; y++) if (form.errors[`${primaryKey}.${x}.${secondaryKeys[y]}`]) {
      status.status = "error";
      status.message = form.errors[`${primaryKey}.${x}.${secondaryKeys[y]}`];
      status.index = x;
      return status;
    }

    return status;
  };

  return {
    getFormErrors
  };
};

const useInertiaFormHelper = () => {
  const generateFormSubmssionEvent = function (form, submitRoute) {
    let processing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ref(false);
    let patch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    const requestOpts = {
      method: patch ? Method.PATCH : Method.POST,
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        if (cb instanceof Function) cb();
        processing.value = false;
      }
    };
    const sendRequest = form === null ? () => {
      Inertia.visit(submitRoute, requestOpts);
    } : patch ? () => {
      form.value.patch(submitRoute, requestOpts);
    } : () => {
      form.value.post(submitRoute, requestOpts);
    };

    const handleSubmit = () => {
      processing.value = true;
      sendRequest();
    };

    return handleSubmit;
  };

  const generateModelForm = args => {
    const toModelForm = function () {
      let model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (model === null) {
        const values = {};
        args.simpleKeys?.forEach(key => {
          Object.assign(values, {
            [key]: null
          });
        });
        if (args.complexKeys) for (const [key, getters] of Object.entries(args.complexKeys)) {
          Object.assign(values, {
            [key]: getters?.get()
          });
        }
        return useForm(values);
      }

      const values = args.simpleKeys ? _.pick(model, args.simpleKeys) : {};
      if (args.complexKeys) for (const [key, getters] of Object.entries(args.complexKeys)) {
        values[key] = getters.set ? getters.set(model) : model[key];
      }
      return useForm(values);
    };

    return toModelForm;
  };

  return {
    generateModelForm,
    generateFormSubmssionEvent
  };
};

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  NLaravelDataTable: script$3,
  NInertiaDataTable: script$2,
  NLaravelPagination: script$1,
  useDefaultAdaptor: useDefaultAdaptor,
  useInertiaAdaptor: useInertiaAdaptor,
  NInertiaFormItem: script,
  useInertiaFormItem: useInertiaFormItem,
  useInertiaFormHelper: useInertiaFormHelper
});

// Import vue components

const install = function installMthlilyNaiveInertiaJsComponents(app) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export { script$2 as NInertiaDataTable, script as NInertiaFormItem, script$3 as NLaravelDataTable, script$1 as NLaravelPagination, install as default, useDefaultAdaptor, useInertiaAdaptor, useInertiaFormHelper, useInertiaFormItem };
