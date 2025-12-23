import permission from './permission'

export { permission }

export default {
  install(app: any) {
    app.directive('permission', permission)
  }
}
