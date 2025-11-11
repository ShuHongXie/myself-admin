import { defineComponent } from 'vue';

const Render = defineComponent({
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

export { Render as default };
