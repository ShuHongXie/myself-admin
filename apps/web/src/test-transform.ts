// 测试文件用于验证 TypeScript 转换插件

function handleError() {
  try {
    throw new Error('Test error')
  } catch (e) {
    return e // 这行应该被转换为 return Promise.reject(e)
  }
}

function handleSuccess() {
  const e = 'success'
  return e // 这行不应该被转换，因为它不是错误处理上下文
}

export { handleError, handleSuccess }
