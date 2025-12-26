declare module 'vue-cropper' {
  import type { DefineComponent } from 'vue'
  export const VueCropper: DefineComponent<any, any, any>
  export default VueCropper
}

declare module 'vue-cropper/dist/index.css'

declare module '*/vue-cropper.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}
