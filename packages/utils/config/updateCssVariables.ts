import type { Config } from './types'
import { getColors } from 'theme-colors'
import { convertToHsl, TinyColor } from '../func'

function executeUpdateCSSVariables(
  variables: { [key: string]: string },
  id = '__minilo-styles__'
): void {
  // 获取或创建内联样式表元素
  const styleElement = document.querySelector(`#${id}`) || document.createElement('style')

  styleElement.id = id

  // 构建要更新的 CSS 变量的样式文本
  let cssText = ':root {'
  for (const key in variables) {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      cssText += `${key}: ${variables[key]};`
    }
  }
  cssText += '}'

  // 将样式文本赋值给内联样式表
  styleElement.textContent = cssText

  // 将内联样式表添加到文档头部
  if (!document.querySelector(`#${id}`)) {
    setTimeout(() => {
      document.head.append(styleElement)
    })
  }
}

interface ColorItem {
  alias?: string
  color?: string
  name?: string
}

// 根据某个色值生成色值阶梯对象，key=500时为其默认初始值，也就是默认参数
function generatorColorVariables(colorItems: ColorItem[]) {
  const colorVariables: Record<string, string> = {}

  colorItems.forEach(({ alias, color, name }) => {
    if (color) {
      const colorsMap = getColors(new TinyColor(color).toHexString())
      let mainColor = colorsMap['500']
      const colorKeys = Object.keys(colorsMap)
      colorKeys.forEach((key) => {
        const colorValue = colorsMap[key]
        if (colorValue) {
          const hslColor = convertToHsl(colorValue)
          colorVariables[`--${name}-${key}`] = hslColor
          if (alias) {
            colorVariables[`--${alias}-${key}`] = hslColor
          }

          if (key === '500') {
            mainColor = hslColor
          }
        }
      })
      if (alias && mainColor) {
        colorVariables[`--${alias}`] = mainColor
      }
    }
  })
  return colorVariables
}

function updateCSSVariables(config: Config) {
  const theme = config?.theme ?? {}

  if (
    Reflect.has(theme, 'colorPrimary') ||
    Reflect.has(theme, 'colorDestructive') ||
    Reflect.has(theme, 'colorSuccess') ||
    Reflect.has(theme, 'colorWarning')
  ) {
    updateMainColorVariables(config)
  }
}

function updateMainColorVariables(config: Config) {
  if (!config.theme) {
    return
  }
  const { colorDestructive, colorPrimary, colorSuccess, colorWarning } = config.theme
  const colorVariables = generatorColorVariables([
    { color: colorPrimary, name: 'primary' },
    { alias: 'warning', color: colorWarning, name: 'yellow' },
    { alias: 'success', color: colorSuccess, name: 'green' },
    { alias: 'destructive', color: colorDestructive, name: 'red' }
  ])

  // 要设置的 CSS 变量映射
  const colorMappings = {
    '--green-500': '--success',
    '--primary-500': '--primary',
    '--red-500': '--destructive',
    '--yellow-500': '--warning'
  }

  // 统一处理颜色变量的更新
  Object.entries(colorMappings).forEach(([sourceVar, targetVar]) => {
    const colorValue = colorVariables[sourceVar]
    if (colorValue) {
      document.documentElement.style.setProperty(targetVar, colorValue)
    }
  })

  executeUpdateCSSVariables(colorVariables)
}

export { updateCSSVariables, executeUpdateCSSVariables, generatorColorVariables }
