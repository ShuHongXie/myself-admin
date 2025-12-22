import type { Directive, DirectiveBinding } from 'vue'
import { usePermission } from '@minilo/store'

interface PermissionBinding extends DirectiveBinding {
  modifiers: {
    all?: boolean
    disable?: boolean
  }
}

// 定义元素上的自定义缓存属性类型（辅助类型提示）
interface PermissionHTMLElement extends HTMLElement {
  __v_permission_original_display?: string
  __v_permission_original_pointer_events?: string
  __v_permission_original_opacity?: string
  __v_permission_original_elem?: HTMLElement // 缓存被移除的原始元素
  __v_permission_parent?: HTMLElement // 缓存父节点
  __v_permission_next_sibling?: Node | null // 缓存下一个兄弟节点（用于恢复位置）
}

/**
 * 权限指令
 * v-permission="'permission:string'" - 精确匹配单个权限
 * v-permission="['permission1', 'permission2']" - 匹配任意一个权限
 * v-permission.all="['permission1', 'permission2']" - 必须拥有所有权限，无权限时移除DOM
 * v-permission.disable="'permission:string'" - 无权限时禁用元素而不是隐藏
 * v-permission.disable.all="['permission1', 'permission2']" - all模式优先，无权限移除DOM；非all模式则禁用
 */
const permission: Directive = {
  mounted(el: PermissionHTMLElement, binding: PermissionBinding) {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()
    const { value, modifiers } = binding
    if (!value) return

    let hasAuth = false
    // 权限检查逻辑（与原逻辑一致）
    if (typeof value === 'string') {
      hasAuth = hasPermission(value)
    } else if (Array.isArray(value)) {
      hasAuth = modifiers.all ? hasAllPermissions(value) : hasAnyPermission(value)
    }

    // 处理all模式：无权限移除DOM，有权限确保DOM存在
    if (modifiers.all) {
      if (!hasAuth) {
        // 缓存原始元素和父/兄弟节点，用于后续恢复
        el.__v_permission_original_elem = el
        el.__v_permission_parent = el.parentElement
        el.__v_permission_next_sibling = el.nextSibling
        // 从DOM中移除元素
        el.remove()
      }
      // all模式下有权限则无需处理（元素原本就存在）
      return
    }

    // 非all模式：保留原有的禁用/隐藏逻辑
    if (modifiers.disable) {
      if (hasAuth) {
        el.removeAttribute('disabled')
        el.classList.remove('is-disabled')
        if (el.__v_permission_original_pointer_events) {
          el.style.pointerEvents = el.__v_permission_original_pointer_events
        }
        if (el.__v_permission_original_opacity) {
          el.style.opacity = el.__v_permission_original_opacity
        }
      } else {
        el.setAttribute('disabled', 'true')
        el.classList.add('is-disabled')
        if (!el.__v_permission_original_pointer_events) {
          el.__v_permission_original_pointer_events = el.style.pointerEvents || ''
        }
        if (!el.__v_permission_original_opacity) {
          el.__v_permission_original_opacity = el.style.opacity || ''
        }
        el.style.pointerEvents = 'none'
        el.style.opacity = '0.5'
      }
    } else {
      if (!hasAuth) {
        if (!el.__v_permission_original_display) {
          el.__v_permission_original_display = el.style.display || ''
        }
        el.style.display = 'none'
      }
    }
  },

  updated(el: PermissionHTMLElement, binding: PermissionBinding) {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()
    const { value, modifiers } = binding
    if (!value) return

    let hasAuth = false
    if (typeof value === 'string') {
      hasAuth = hasPermission(value)
    } else if (Array.isArray(value)) {
      hasAuth = modifiers.all ? hasAllPermissions(value) : hasAnyPermission(value)
    }

    // 处理all模式：权限变化时恢复/移除DOM
    if (modifiers.all) {
      const parent = el.__v_permission_parent
      const nextSibling = el.__v_permission_next_sibling
      const originalElem = el.__v_permission_original_elem

      if (hasAuth) {
        // 有权限：若元素已被移除，重新插入到原位置
        if (originalElem && parent && !originalElem.parentElement) {
          if (nextSibling) {
            parent.insertBefore(originalElem, nextSibling)
          } else {
            parent.appendChild(originalElem)
          }
        }
      } else {
        // 无权限：移除DOM并缓存节点信息
        el.__v_permission_original_elem = el
        el.__v_permission_parent = el.parentElement
        el.__v_permission_next_sibling = el.nextSibling
        el.remove()
      }
      return
    }

    // 非all模式：保留原有的禁用/隐藏更新逻辑
    if (modifiers.disable) {
      if (hasAuth) {
        el.removeAttribute('disabled')
        el.classList.remove('is-disabled')
        if (el.__v_permission_original_pointer_events) {
          el.style.pointerEvents = el.__v_permission_original_pointer_events
        }
        if (el.__v_permission_original_opacity) {
          el.style.opacity = el.__v_permission_original_opacity
        }
      } else {
        el.setAttribute('disabled', 'true')
        el.classList.add('is-disabled')
        if (!el.__v_permission_original_pointer_events) {
          el.__v_permission_original_pointer_events = el.style.pointerEvents || ''
        }
        if (!el.__v_permission_original_opacity) {
          el.__v_permission_original_opacity = el.style.opacity || ''
        }
        el.style.pointerEvents = 'none'
        el.style.opacity = '0.5'
      }
    } else {
      if (hasAuth) {
        el.style.display = el.__v_permission_original_display || ''
      } else {
        if (!el.__v_permission_original_display) {
          el.__v_permission_original_display = el.style.display || ''
        }
        el.style.display = 'none'
      }
    }
  },

  unmounted(el: PermissionHTMLElement) {
    // 清理所有自定义缓存属性，避免内存泄漏
    delete el.__v_permission_original_display
    delete el.__v_permission_original_pointer_events
    delete el.__v_permission_original_opacity
    delete el.__v_permission_original_elem
    delete el.__v_permission_parent
    delete el.__v_permission_next_sibling
  }
}

export default permission
