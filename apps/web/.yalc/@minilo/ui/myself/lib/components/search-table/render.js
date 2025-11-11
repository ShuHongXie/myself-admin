'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const Render = vue.defineComponent({
  props: {
    render: {
      type: Function
    },
    scope: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props) {
    return () => props.render(props.scope.row, props.scope.$index);
  }
});

exports.default = Render;
