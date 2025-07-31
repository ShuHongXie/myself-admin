import { TinyColor } from '@ctrl/tinycolor'

// 将颜色转换为HSL格式
function convertToHsl(color: string): string {
  // 使用TinyColor库将颜色转换为HSL格式
  const { a, h, l, s } = new TinyColor(color).toHsl()
  // 将HSL格式转换为字符串
  const hsl = `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`
  // 如果颜色的透明度小于1，则返回带有透明度的HSL格式
  return a < 1 ? `${hsl} ${a}` : hsl
}

/**
 * 将颜色转换为RGB颜色字符串
 * TinyColor无法处理hsl内包含'deg'、'grad'、'rad'或'turn'的字符串
 * 比如 hsl(231deg 98% 65%)将被解析为rgb(0, 0, 0)
 * 这里在转换之前先将这些单位去掉
 * @param str 表示HLS颜色值的字符串
 * @returns 如果颜色值有效，则返回对应的RGB颜色字符串；如果无效，则返回rgb(0, 0, 0)
 */
function convertToRgb(str: string): string {
  return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toRgbString()
}

export { convertToHsl, convertToRgb, TinyColor }
