# Vitest 测试配置说明

## 概述

已为 `@minilo/ui` 组件库配置完成 Vitest 测试环境。

## 已安装的依赖

- `vitest ^4.0.16` - 测试运行器
- `@vue/test-utils ^2.4.6` - Vue 组件测试工具
- `@vitest/ui ^4.0.16` - 测试 UI 界面
- `@vitest/coverage-v8 ^4.0.16` - 代码覆盖率工具
- `happy-dom ^20.0.11` - DOM 环境模拟
- `jsdom ^27.3.0` - DOM 环境模拟（备选）

## 配置文件

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  test: {
    environment: 'happy-dom', // 使用 happy-dom 作为测试环境
    globals: true, // 全局使用 describe、it、expect 等 API
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'build-script/', 'docs/', '*.config.ts', '**/*.d.ts']
    }
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, 'src'),
      minilo: resolve(__dirname, 'src/components')
    }
  }
})
```

## 可用的测试命令

```bash
# 运行测试（watch 模式）
pnpm test

# 运行测试（单次运行）
pnpm test -- --run

# 使用 UI 界面运行测试
pnpm test:ui

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 运行原有的 gulp 测试
pnpm test:gulp
```

## 测试文件示例

### 工具函数测试

```typescript
// src/utils/__tests__/utils.spec.ts
import { describe, it, expect } from 'vitest'
import { bem } from '../index'

describe('Utils 工具函数', () => {
  it('bem 函数应该正常工作', () => {
    expect(bem('button')).toBe('ml-button')
    expect(bem('button', 'icon')).toBe('ml-button__icon')
    expect(bem('button', '', 'primary')).toBe('ml-button--primary')
  })
})
```

### Vue 组件测试（需要额外配置）

对于 Vue 组件测试，特别是使用了 Element Plus 的组件，需要在测试中提供全局组件注册：

```typescript
import { mount } from '@vue/test-utils'
import { ElButton } from 'element-plus'
import YourComponent from '../YourComponent.vue'

describe('YourComponent', () => {
  it('should render', () => {
    const wrapper = mount(YourComponent, {
      global: {
        components: {
          ElButton // 注册需要的 Element Plus 组件
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
```

## 测试文件位置

推荐在每个组件或模块目录下创建 `__tests__` 文件夹：

```
src/
├── components/
│   ├── button/
│   │   ├── __tests__/
│   │   │   └── button.spec.ts
│   │   ├── index.vue
│   │   └── type.ts
│   └── ...
├── utils/
│   ├── __tests__/
│   │   └── utils.spec.ts
│   └── index.ts
```

## 注意事项

1. **使用 happy-dom**：配置中使用 `happy-dom` 而不是 `jsdom`，因为在当前项目环境中更稳定
2. **全局 API**：已开启 `globals: true`，可以直接使用 `describe`、`it`、`expect` 等 API，无需导入
3. **覆盖率排除**：已配置排除 `node_modules`、`build-script`、`docs` 等目录
4. **别名支持**：测试中可以使用 `#` 和 `minilo` 别名引用模块

## 下一步

- 为组件库中的各个组件编写测试用例
- 配置 CI/CD 自动运行测试
- 设置代码覆盖率阈值
- 添加更多测试工具（如 Mock、Spy 等）

## 测试状态

✅ 基础配置完成
✅ 工具函数测试通过
✅ 覆盖率报告正常生成
⚠️ Vue 组件测试需要针对具体组件进行配置
