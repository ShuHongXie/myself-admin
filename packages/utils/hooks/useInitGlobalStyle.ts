import { watch } from 'vue'
import { convertToRgb } from '../func'
import { userConfig } from '../config'
import { executeUpdateCSSVariables } from '../config'

// 初始化全局样式
export const useInitGlobalStyle = () => {
  const rootStyles = getComputedStyle(document.documentElement)

  const getCssVariableValueRaw = (variable: string) => {
    return rootStyles.getPropertyValue(variable)
  }

  const getCssVariableValue = (variable: string, isColor: boolean = true) => {
    const value = getCssVariableValueRaw(variable)
    return isColor ? convertToRgb(`hsl(${value})`) : value
  }

  watch(
    () => userConfig.theme,
    () => {
      const background = getCssVariableValue('--background')
      const border = getCssVariableValue('--border')
      const accent = getCssVariableValue('--accent')
      const variables: Record<string, string> = {
        '--el-bg-color': background,
        '--el-bg-color-overlay': getCssVariableValue('--popover'),
        '--el-bg-color-page': getCssVariableValue('--background-deep'),
        '--el-border-color': border,
        '--el-border-color-dark': border,
        '--el-border-color-extra-light': border,
        '--el-border-color-hover': accent,
        '--el-border-color-light': border,
        '--el-border-color-lighter': border,
        '--el-border-radius-base': getCssVariableValue('--radius', false),
        '--el-color-danger': getCssVariableValue('--destructive-500'),
        '--el-color-primary': getCssVariableValue('--primary-500'),
        '--el-color-primary-dark-2': getCssVariableValue('--primary-600'),
        '--el-color-primary-light-3': getCssVariableValue('--primary-400'),
        '--el-color-primary-light-5': getCssVariableValue('--primary-300'),
        '--el-color-primary-light-7': getCssVariableValue('--primary-200'),
        '--el-color-primary-light-8': getCssVariableValue('--primary-100'),
        '--el-color-primary-light-9': getCssVariableValue('--primary-50'),
        '--el-color-success': getCssVariableValue('--success-500'),
        '--el-fill-color': getCssVariableValue('--accent'),
        '--el-fill-color-blank': background,
        '--el-fill-color-light': getCssVariableValue('--accent'),
        '--el-fill-color-lighter': getCssVariableValue('--accent-lighter'),
        '--el-fill-color-dark': getCssVariableValue('--accent-dark'),
        '--el-fill-color-darker': getCssVariableValue('--accent-darker'),
        // 解决ElLoading背景色问题
        '--el-mask-color': 'rgba(255,255,255,.9)',
        '--el-text-color-primary': getCssVariableValue('--foreground'),
        '--el-text-color-regular': getCssVariableValue('--foreground')
      }

      executeUpdateCSSVariables(variables, `__myself_design_styles__`)
    },
    { immediate: true }
  )
}
