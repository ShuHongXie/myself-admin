import { defineComponent, mergeModels, useModel, ref, onMounted, resolveDirective, createElementBlock, openBlock, createCommentVNode, createVNode, renderSlot, withDirectives, createElementVNode, mergeProps, createSlots, renderList, withCtx, createBlock, unref, Fragment } from 'vue';
import _sfc_main$1 from '../search/index.vue2.mjs';
import { searchTableProps, RequestMethodType } from './props.mjs';
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { initRequestInstance, getNestedValue } from '@minilo/utils';
import Render from './render.mjs';

const _hoisted_1 = { class: "search-table" };
const _hoisted_2 = { class: "search-table__pagination" };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "MsSearchTable" },
  __name: "index",
  props: /* @__PURE__ */ mergeModels(searchTableProps, {
    "search": { type: Object },
    "searchModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels([
    "select",
    "select-all",
    "selection-change",
    "reset",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-click",
    "cell-dblclick",
    "row-click",
    "row-contextmenu",
    "row-dblclick",
    "header-click",
    "header-contextmenu",
    "sort-change",
    "filter-change",
    "current-change",
    "header-dragend",
    "expand-change"
  ], ["update:search"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const searchModel = useModel(__props, "search");
    const props = __props;
    const emit = __emit;
    const axios = initRequestInstance({
      baseURL: "",
      headers: props.headers
    });
    const data = ref([]);
    const loading = ref(false);
    const pagination = ref({
      currentPage: 1,
      pageSize: 20,
      total: 100
    });
    const handleSearch = async (reset2 = true) => {
      try {
        if (reset2) {
          pagination.value.currentPage = 1;
        }
        const defaultParams = {
          ...searchModel.value
        };
        if (props.showPagination) {
          Object.assign(defaultParams, {
            pageSize: pagination.value.pageSize,
            currentPage: pagination.value.currentPage
          });
        }
        const params = props.paramsHandler ? props.paramsHandler(defaultParams) : defaultParams;
        const requestParams = [RequestMethodType.GET, RequestMethodType.DELETE].includes(
          props.methodType
        ) ? { params } : params;
        loading.value = true;
        const res = await axios[props.methodType](
          props.url,
          requestParams
        );
        data.value = getNestedValue(res, props.responseDataField);
        if (props.showPagination) {
          pagination.value.total = getNestedValue(res, props.responseTotalField);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };
    const submit = () => {
      handleSearch();
    };
    const reset = () => {
      emit("reset");
      handleSearch();
    };
    onMounted(() => {
      handleSearch();
    });
    __expose({
      handleSearch
    });
    const emitEventHandler = (...args) => {
      emit(args[0], ...args.slice(1));
    };
    return (_ctx, _cache) => {
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createCommentVNode(" "),
        createVNode(_sfc_main$1, mergeProps({
          onSubmit: submit,
          onReset: reset,
          modelValue: searchModel.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchModel.value = $event)
        }, _ctx.searchProps), createSlots({
          _: 2
          /* DYNAMIC */
        }, [
          renderList(_ctx.searchProps.slots, (item) => {
            return {
              name: item.prop,
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, item.prop)
              ])
            };
          })
        ]), 1040, ["modelValue"]),
        renderSlot(_ctx.$slots, "prefix"),
        withDirectives((openBlock(), createBlock(unref(ElTable), mergeProps({
          onSelect: _cache[1] || (_cache[1] = (selection, row) => emitEventHandler("select", selection, row)),
          onSelectAll: _cache[2] || (_cache[2] = (selection) => emitEventHandler("select-all", selection)),
          onSelectionChange: _cache[3] || (_cache[3] = (selection) => emitEventHandler("selection-change", selection)),
          onCellMouseEnter: _cache[4] || (_cache[4] = (row, column, cell, event) => emitEventHandler("cell-mouse-enter", row, column, cell, event)),
          onCellMouseLeave: _cache[5] || (_cache[5] = (row, column, cell, event) => emitEventHandler("cell-mouse-leave", row, column, cell, event)),
          onCellClick: _cache[6] || (_cache[6] = (row, column, cell, event) => emitEventHandler("cell-click", row, column, cell, event)),
          onCellDblclick: _cache[7] || (_cache[7] = (row, column, cell, event) => emitEventHandler("cell-dblclick", row, column, cell, event)),
          onRowClick: _cache[8] || (_cache[8] = (row, event, column) => emitEventHandler("row-click", row, event, column)),
          onRowDblclick: _cache[9] || (_cache[9] = (row, event) => emitEventHandler("row-dblclick", row, event)),
          onRowContextmenu: _cache[10] || (_cache[10] = (row, event) => emitEventHandler("row-contextmenu", row, event)),
          onHeaderClick: _cache[11] || (_cache[11] = (column, event) => emitEventHandler("header-click", column, event)),
          onSortChange: _cache[12] || (_cache[12] = (args) => emitEventHandler("sort-change", args)),
          onFilterChange: _cache[13] || (_cache[13] = (filters) => emitEventHandler("filter-change", filters)),
          onCurrentChange: _cache[14] || (_cache[14] = (currentRow, oldCurrentRow) => emitEventHandler("current-change", currentRow, oldCurrentRow)),
          onHeaderDragend: _cache[15] || (_cache[15] = (newWidth, oldWidth, column, event) => emitEventHandler("header-dragend", newWidth, oldWidth, column, event)),
          onExpandChange: _cache[16] || (_cache[16] = (row, expanded) => emitEventHandler("expand-change", row, expanded)),
          class: "search-table__content"
        }, _ctx.tableProps, {
          border: true,
          data: data.value
        }), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.columns, (item, index) => {
                return openBlock(), createBlock(
                  unref(ElTableColumn),
                  mergeProps({ key: index }, { ref_for: true }, item),
                  {
                    default: withCtx((scope) => [
                      item.slotName ? renderSlot(_ctx.$slots, item.slotName, {
                        key: 0,
                        index: scope.$index,
                        row: scope.row
                      }) : createCommentVNode("v-if", true),
                      item.render ? (openBlock(), createBlock(unref(Render), {
                        key: 1,
                        scope,
                        render: item.render
                      }, null, 8, ["scope", "render"])) : createCommentVNode("v-if", true)
                    ]),
                    _: 2
                    /* DYNAMIC */
                  },
                  1040
                  /* FULL_PROPS, DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["data"])), [
          [
            _directive_loading,
            loading.value,
            void 0,
            { lock: true }
          ]
        ]),
        createElementVNode("div", _hoisted_2, [
          _ctx.showPagination ? (openBlock(), createBlock(unref(ElPagination), {
            key: 0,
            onChange: _cache[17] || (_cache[17] = ($event) => handleSearch(false)),
            style: { "margin-top": "10px" },
            background: "",
            layout: "total, sizes, prev, pager, next, jumper",
            "page-size": pagination.value.pageSize,
            "onUpdate:pageSize": _cache[18] || (_cache[18] = ($event) => pagination.value.pageSize = $event),
            "current-page": pagination.value.currentPage,
            "onUpdate:currentPage": _cache[19] || (_cache[19] = ($event) => pagination.value.currentPage = $event),
            total: pagination.value.total
          }, null, 8, ["page-size", "current-page", "total"])) : createCommentVNode("v-if", true)
        ]),
        renderSlot(_ctx.$slots, "suffix")
      ]);
    };
  }
});

export { _sfc_main as default };
