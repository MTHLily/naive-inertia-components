'use strict';var vue=require('vue'),naiveUi=require('naive-ui'),_=require('lodash'),inertia=require('@inertiajs/inertia'),route=require('ziggy-js'),inertiaVue3=require('@inertiajs/inertia-vue3');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var ___default=/*#__PURE__*/_interopDefaultLegacy(_);var route__default=/*#__PURE__*/_interopDefaultLegacy(route);function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var useDefaultAdaptor = function useDefaultAdaptor() {
  var visit = function visit(path, query) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      resetPage: true,
      preserveState: true
    };
    console.log(path, query, options);
  };

  var getQuery = function getQuery() {
    console.log("GET QUERY");
    return {
      filter: "hello"
    };
  };

  return {
    visit: visit,
    getQuery: getQuery
  };
};var useInertiaAdaptor = function useInertiaAdaptor() {
  var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : vue.ref(false);

  var visit = function visit(path, query) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      resetPage: true,
      preserveScroll: true,
      preserveState: true
    };
    if (options.resetPage && query.page) query.page = 1;
    inertia.Inertia.visit(path, {
      data: query,
      preserveScroll: options.preserveScroll,
      preserveState: options.preserveState,
      replace: true,
      onFinish: function onFinish() {
        loading.value = false;
      }
    });
  };

  var getQuery = function getQuery() {
    return route__default["default"]().params;
  };

  return {
    visit: visit,
    getQuery: getQuery
  };
};var useLaravelPagination = function useLaravelPagination(paginationData, adaptor, loading, overrides) {
  var handlePageChange = overrides !== null && overrides !== void 0 && overrides.handlePageChangeOverride ? overrides.handlePageChangeOverride : function (page) {
    var query = adaptor.getQuery();
    query.page = page;
    adaptor.visit(paginationData.path, query, {
      resetPage: false,
      preserveScroll: true,
      preserveState: true
    });
  };
  var handlePageSizeChange = overrides !== null && overrides !== void 0 && overrides.handlePerPageChangeOverride ? overrides.handlePerPageChangeOverride : function (perPage) {
    var query = adaptor.getQuery();
    query["page.perPage"] = perPage;
    adaptor.visit(paginationData.path, query);
  };
  var paginationProps = vue.computed(function () {
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
    handlePageChange: handlePageChange,
    handlePageSizeChange: handlePageSizeChange,
    paginationProps: paginationProps,
    loading: loading
  };
};var script$4 = vue.defineComponent({
  components: {
    NPagination: naiveUi.NPagination
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
      default: function _default() {
        return vue.ref(false);
      }
    }
  },
  setup: function setup(props) {
    var _useLaravelPagination = useLaravelPagination(props.paginationData, props.adaptor(), props.loading),
        paginationProps = _useLaravelPagination.paginationProps;

    return {
      paginationProps: paginationProps
    };
  }
});function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_n_pagination = vue.resolveComponent("n-pagination");

  return vue.openBlock(), vue.createBlock(_component_n_pagination, vue.normalizeProps(vue.guardReactiveProps(_ctx.paginationProps)), null, 16);
}script$4.render = render$4;var script$3 = vue.defineComponent({
  components: {
    NLaravelPagination: script$4
  },
  props: {
    paginationData: {
      type: Object,
      required: true
    }
  },
  setup: function setup() {
    var adaptor = useInertiaAdaptor;
    return {
      adaptor: adaptor
    };
  }
});function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_n_laravel_pagination = vue.resolveComponent("n-laravel-pagination");

  return vue.openBlock(), vue.createBlock(_component_n_laravel_pagination, {
    "pagination-data": _ctx.paginationData,
    adaptor: _ctx.adaptor
  }, null, 8, ["pagination-data", "adaptor"]);
}script$3.render = render$3;var useLaravelDataTable = function useLaravelDataTable(paginationData, unprocessedColumns, adaptor) {
  var loading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : vue.ref(false);

  var tableColumnMap = function tableColumnMap(column) {
    var values = _objectSpread2({}, column);

    if (column.children) values.children = column.children.map(tableColumnMap);

    if (column.sorter) {
      var _query$sort;

      var query = adaptor.getQuery();

      if ((_query$sort = query.sort) !== null && _query$sort !== void 0 && _query$sort.split("-").includes(column.key)) {
        if (query.sort.charAt(0) == "-") values.sortOrder = "descend";else values.sortOrder = "ascend";
      }
    }

    if (column.filterType === "check") {
      values.filter = true;
    }

    if (column.filterType === "text") {
      var _query = adaptor.getQuery();

      if (_query.filter && _query.filter[column.key]) values.filterTextValue = _query.filter[column.key];else values.filterTextValue = null;
    }

    if (column.filterType === "daterange") {
      var _query2 = adaptor.getQuery();

      if (_query2.filter && _query2.filter[column.key]) {
        values.filterDateRangeValue = _query2.filter["".concat(column.key)].split(",").map(function (date) {
          return new Date(date).getTime();
        });
      } else values.filterDateRangeValue = null;
    }

    return values;
  };

  var columns = vue.ref(unprocessedColumns.map(tableColumnMap));
  var filterColumns = columns.value.filter(function (column) {
    return column.filterType === "text" || column.filterType === "daterange";
  });

  var handleCheckFilter = function handleCheckFilter(filters, column) {
    var query = adaptor.getQuery();

    if (column !== null && column !== void 0 && column.key) {
      var columnFilters = filters[column.key];
      var filterValue = columnFilters.join(",");
      if (!query.filter) query.filter = {};
      query.filter[column.key] = filterValue;
      adaptor.visit(paginationData.path, query);
    }
  };

  var handleTextFilter = function handleTextFilter(column) {
    loading.value = true;
    var query = adaptor.getQuery();
    var filterValue = column.filterTextValue;
    if (!query.filter) query.filter = {};
    if (query.filter[column.key] == filterValue) return;
    query.filter[column.key] = filterValue;
    adaptor.visit(paginationData.path, query);
  };

  var handleDateRangeFilter = function handleDateRangeFilter(value) {
    var _query$filter;

    var query = adaptor.getQuery();
    var filterValue = value.filterDateRangeValue.map(function (date) {
      return new Date(date).toISOString().split("T")[0];
    }).join(",");
    var filter = (_query$filter = query.filter) !== null && _query$filter !== void 0 ? _query$filter : {};
    if (filter["".concat(value.key)] == filterValue) return;
    filter["".concat(value.key)] = filterValue;
    Object.assign(query, {
      filter: filter
    });
    adaptor.visit(paginationData.path, query);
  };

  var handleSort = function handleSort(option) {
    loading.value = true;
    var query = adaptor.getQuery();
    if (option.order) query.sort = "".concat(option.order == "descend" ? "-" : "").concat(option.columnKey);else query.sort = null;
    adaptor.visit(paginationData.path, query, {
      preserveState: false
    });
  };

  var unsubscribe = [];
  filterColumns.forEach(function (column) {
    if (column.filterType === "text") {
      unsubscribe.push(vue.watch(column, ___default["default"].throttle(handleTextFilter, 1000)));
    }

    if (column.filterType === "daterange") unsubscribe.push(vue.watch(column, handleDateRangeFilter));
  });
  vue.onUnmounted(function () {
    unsubscribe.forEach(function (unsub) {
      return unsub();
    });
  });
  return {
    columns: columns,
    filterColumns: filterColumns,
    handleCheckFilter: handleCheckFilter,
    handleTextFilter: handleTextFilter,
    handleDateRangeFilter: handleDateRangeFilter,
    handleSort: handleSort
  };
};var script$2 = vue.defineComponent({
  name: "NLaravelDataTable",
  components: {
    NDataTable: naiveUi.NDataTable,
    NSpace: naiveUi.NSpace,
    NInputGroup: naiveUi.NInputGroup,
    NInput: naiveUi.NInput,
    NDatePicker: naiveUi.NDatePicker
  },
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
      default: function _default() {
        return useDefaultAdaptor;
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props) {
    var loading = vue.ref(props.loading);
    var adaptor = props.adaptor(loading);
    var pagination = vue.computed(function () {
      return useLaravelPagination(props.paginationData, adaptor, loading);
    });
    var datatable = useLaravelDataTable(props.paginationData, props.columns, adaptor, loading);
    return {
      pagination: pagination,
      datatable: datatable
    };
  }
});function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_n_input = vue.resolveComponent("n-input");

  var _component_n_date_picker = vue.resolveComponent("n-date-picker");

  var _component_n_input_group = vue.resolveComponent("n-input-group");

  var _component_n_data_table = vue.resolveComponent("n-data-table");

  var _component_n_space = vue.resolveComponent("n-space");

  return vue.openBlock(), vue.createBlock(_component_n_space, {
    vertical: ""
  }, {
    default: vue.withCtx(function () {
      return [vue.createVNode(_component_n_input_group, null, {
        default: vue.withCtx(function () {
          return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.datatable.filterColumns, function (column) {
            return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
              key: column.key
            }, [column.filterType === 'text' ? (vue.openBlock(), vue.createBlock(_component_n_input, {
              key: 0,
              value: column.filterTextValue,
              "onUpdate:value": function onUpdateValue($event) {
                return column.filterTextValue = $event;
              },
              placeholder: "Filter ".concat(column.title, "...")
            }, null, 8, ["value", "onUpdate:value", "placeholder"])) : vue.createCommentVNode("", true), column.filterType === 'daterange' ? (vue.openBlock(), vue.createBlock(_component_n_date_picker, {
              key: 1,
              value: column.filterDateRangeValue,
              "onUpdate:value": function onUpdateValue($event) {
                return column.filterDateRangeValue = $event;
              },
              type: "daterange",
              placeholder: "Filter $".concat(column.title, "..."),
              clearable: ""
            }, null, 8, ["value", "onUpdate:value", "placeholder"])) : vue.createCommentVNode("", true)], 64);
          }), 128))];
        }),
        _: 1
      }), vue.createVNode(_component_n_data_table, {
        remote: "",
        loading: _ctx.loading,
        columns: _ctx.datatable.columns.value,
        data: _ctx.paginationData.data,
        pagination: _ctx.pagination.paginationProps.value,
        "on-update:sorter": _ctx.datatable.handleSort,
        "on-update:filters": _ctx.datatable.handleCheckFilter
      }, null, 8, ["loading", "columns", "data", "pagination", "on-update:sorter", "on-update:filters"])];
    }),
    _: 1
  });
}script$2.render = render$2;var script$1 = vue.defineComponent({
  name: "NInertiaDataTable",
  components: {
    NLaravelDataTable: script$2
  },
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
  setup: function setup() {
    var adaptor = useInertiaAdaptor;
    return {
      adaptor: adaptor
    };
  }
});function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_n_laravel_data_table = vue.resolveComponent("n-laravel-data-table");

  return vue.openBlock(), vue.createBlock(_component_n_laravel_data_table, {
    columns: _ctx.columns,
    "pagination-data": _ctx.paginationData,
    adaptor: _ctx.adaptor
  }, null, 8, ["columns", "pagination-data", "adaptor"]);
}script$1.render = render$1;var useInertiaFormItem = function useInertiaFormItem() {
  var getFormErrors = function getFormErrors(form, primaryKey, secondaryKeys) {
    var _form$primaryKey;

    var status = {};

    if (form.errors[primaryKey]) {
      status.status = "error";
      status.message = form.errors[primaryKey];
      return status;
    }

    if (!Array.isArray(form[primaryKey])) return status;
    var length = (_form$primaryKey = form[primaryKey]) === null || _form$primaryKey === void 0 ? void 0 : _form$primaryKey.length;

    for (var x = 0; x < length; x++) {
      for (var y = 0; y < secondaryKeys.length; y++) {
        if (form.errors["".concat(primaryKey, ".").concat(x, ".").concat(secondaryKeys[y])]) {
          status.status = "error";
          status.message = form.errors["".concat(primaryKey, ".").concat(x, ".").concat(secondaryKeys[y])];
          status.index = x;
          return status;
        }
      }
    }

    return status;
  };

  return {
    getFormErrors: getFormErrors
  };
};var script = vue.defineComponent({
  components: {
    NFormItem: naiveUi.NFormItem
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
      default: function _default() {
        return [];
      }
    }
  },
  setup: function setup(props) {
    var _useInertiaFormItem = useInertiaFormItem(),
        getFormErrors = _useInertiaFormItem.getFormErrors;

    var errors = vue.computed(function () {
      return getFormErrors(props.form, props.formKey, props.secondaryKeys);
    });
    return {
      errors: errors
    };
  }
});function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_n_form_item = vue.resolveComponent("n-form-item");

  return vue.openBlock(), vue.createBlock(_component_n_form_item, {
    attrs: _ctx.$attrs,
    "validation-status": _ctx.errors.status,
    feedback: _ctx.errors.message
  }, {
    default: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  }, 8, ["attrs", "validation-status", "feedback"]);
}script.render = render;var components=/*#__PURE__*/Object.freeze({__proto__:null,NInertiaDataTable:script$1,NLaravelDataTable:script$2,NInertiaPagination:script$3,NLaravelPagination:script$4,NInertiaFormItem:script});var useInertiaFormHelper = function useInertiaFormHelper() {
  var generateFormSubmssionEvent = function generateFormSubmssionEvent(form, submitRoute) {
    var processing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vue.ref(false);
    var patch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var requestOpts = {
      method: patch ? inertia.Method.PATCH : inertia.Method.POST,
      preserveState: true,
      preserveScroll: true,
      onFinish: function onFinish() {
        if (cb instanceof Function) cb();
        processing.value = false;
      }
    };
    var sendRequest = form === null ? function () {
      inertia.Inertia.visit(submitRoute, requestOpts);
    } : patch ? function () {
      form.value.patch(submitRoute, requestOpts);
    } : function () {
      form.value.post(submitRoute, requestOpts);
    };

    var handleSubmit = function handleSubmit() {
      processing.value = true;
      sendRequest();
    };

    return handleSubmit;
  };

  function generateModelForm(args) {
    var toModelForm = function toModelForm() {
      var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (model === null) {
        var _args$simpleKeys;

        var _values = {};
        (_args$simpleKeys = args.simpleKeys) === null || _args$simpleKeys === void 0 ? void 0 : _args$simpleKeys.forEach(function (key) {
          Object.assign(_values, _defineProperty({}, key, null));
        });
        if (args.complexKeys) Object.entries(args.complexKeys).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              getters = _ref2[1];

          Object.assign(_values, _defineProperty({}, key, getters.get()));
        });
        return inertiaVue3.useForm(_values);
      }

      var values = args.simpleKeys ? ___default["default"].pick(model, args.simpleKeys) : {};
      if (args.complexKeys) for (var _i = 0, _Object$entries = Object.entries(args.complexKeys); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            getters = _Object$entries$_i[1];

        if (getters.set) values[key] = getters.set(model);else model[key];
      }
      return inertiaVue3.useForm(values);
    };

    return toModelForm;
  }

  return {
    generateModelForm: generateModelForm,
    generateFormSubmssionEvent: generateFormSubmssionEvent
  };
};var all=/*#__PURE__*/Object.freeze({__proto__:null,useDefaultAdaptor:useDefaultAdaptor,useInertiaAdaptor:useInertiaAdaptor,NLaravelDataTable:script$2,NInertiaDataTable:script$1,NInertiaFormItem:script,useInertiaFormItem:useInertiaFormItem,useInertiaFormHelper:useInertiaFormHelper,NLaravelPagination:script$4,NInertiaPagination:script$3,useLaravelPagination:useLaravelPagination});var install = function installMthlilyNaiveInertiaJsComponents(app) {
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = install; // To allow individual component use, export components
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== "default") {
    var key = componentName;
    var val = component;
    plugin[key] = val;
  }
});

var exports$1 = _objectSpread2({
  plugin: plugin
}, all);module.exports=exports$1;