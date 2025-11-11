import { defineComponent } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

interface RenderProps {
  render: (...args: any[]) => JSX.Element
  scope: any
}

const Render = defineComponent({
  props: {
    render: {
      type: Function
    },
    scope: {
      type: Object,
      default: () => {}
    }
  },
  setup(props: RenderProps) {
    return () => props.render(props.scope.row, props.scope.$index)
  }
})

export default Render
