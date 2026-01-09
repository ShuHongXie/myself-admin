import { onUnmounted, ref, watch } from 'vue'

/**
 * 表单草稿自动保存 Hooks
 * @param {string} key - 存储键名
 * @param {Object} formData - 表单响应式数据
 * @param {number} interval - 自动保存间隔（秒，默认30秒）
 * @param {number} expire - 草稿过期时间（秒，默认7天）
 * @returns {Object} 保存状态和手动操作方法
 */
const useFormAutoSave = (key, formData, interval = 30, expire = 60 * 60 * 24 * 7) => {
  // 复用带过期的本地存储
  const { value: draftData, setValue: saveToStorage } = useLocalStorageWithExpire(key, {}, expire)
  // 自动保存定时器
  let autoSaveTimer = null
  // 是否有未保存的修改
  const hasChange = ref(false)
  // 最后保存时间
  const lastSaveTime = ref(null)

  // 对比表单数据和草稿数据，判断是否修改
  const checkChange = () => {
    hasChange.value = JSON.stringify(formData) !== JSON.stringify(draftData)
  }

  // 手动保存草稿
  const saveDraft = () => {
    saveToStorage({ ...formData })
    lastSaveTime.value = new Date().toLocaleString()
    hasChange.value = false
  }

  // 恢复草稿到表单
  const restoreDraft = () => {
    Object.keys(draftData).forEach((key) => {
      formData[key] = draftData[key]
    })
    hasChange.value = false
  }

  // 清空草稿
  const clearDraft = () => {
    saveToStorage({})
    lastSaveTime.value = null
    hasChange.value = false
  }

  // 启动自动保存
  const startAutoSave = () => {
    autoSaveTimer = setInterval(() => {
      if (hasChange.value) saveDraft()
    }, interval * 1000)
  }

  // 停止自动保存
  const stopAutoSave = () => {
    clearInterval(autoSaveTimer)
  }

  // 监听表单变化，标记“未保存”
  watch(formData, checkChange, { deep: true, immediate: true })

  // 组件卸载时停止自动保存+手动保存一次
  onUnmounted(() => {
    stopAutoSave()
    if (hasChange.value) saveDraft()
  })

  // 初始化启动自动保存
  startAutoSave()

  return {
    hasChange,
    lastSaveTime,
    saveDraft,
    restoreDraft,
    clearDraft,
    stopAutoSave,
    startAutoSave
  }
}
