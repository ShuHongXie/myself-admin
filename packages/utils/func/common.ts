/**
 * 判断url是否是http或https
 * @param {string} url
 * @returns {Boolean}
 */
export function isHttp(url: string) {
  const regex = /^https?:\/\//i
  return regex.test(url)
}
