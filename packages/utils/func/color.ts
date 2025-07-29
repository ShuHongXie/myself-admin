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

export { convertToHsl }
