<script setup lang="ts">
import { ref } from 'vue'
import { MlTreeSelectDialog } from '../components'

// 定义树节点类型
interface MenuNode {
  id: number
  label: string
  parentId: number | null
  children?: MenuNode[]
}

// 弹窗显示状态
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)

// 树形数据
const menuData = ref<MenuNode[]>([
  {
    id: 1,
    label: '系统管理',
    parentId: null,
    children: [
      {
        id: 11,
        label: '用户管理',
        parentId: 1,
        children: [
          { id: 111, label: '用户列表', parentId: 11 },
          { id: 112, label: '用户详情', parentId: 11 }
        ]
      },
      {
        id: 12,
        label: '角色管理',
        parentId: 1,
        children: [
          { id: 121, label: '角色列表', parentId: 12 },
          { id: 122, label: '权限配置', parentId: 12 }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '内容管理',
    parentId: null,
    children: [
      { id: 21, label: '文章管理', parentId: 2 },
      { id: 22, label: '分类管理', parentId: 2 }
    ]
  },
  {
    id: 3,
    label: '数据统计',
    parentId: null,
    children: [
      { id: 31, label: '访问统计', parentId: 3 },
      { id: 32, label: '用户统计', parentId: 3 }
    ]
  }
])

// 默认选中的节点
const defaultSelectedKeys = ref([11])
const defaultSelectedKeys2 = ref([1, 21])

// 打开弹窗
const openDialog = () => {
  dialogVisible.value = true
}

const openDialog2 = () => {
  dialogVisible2.value = true
}

// 确认选择（单选）
const handleConfirm = (data: MenuNode | MenuNode[]) => {
  if (Array.isArray(data)) {
    console.log('单选模式不应该返回数组')
    return
  }
  console.log('单选选中的数据:', data)
  alert(`选中菜单: ${data.label}`)
}

// 确认选择（多选）
const handleConfirm2 = (data: MenuNode | MenuNode[]) => {
  if (!Array.isArray(data)) {
    console.log('多选模式应该返回数组')
    return
  }
  console.log('多选选中的数据:', data)
  const labels = data.map((item) => item.label).join(', ')
  alert(`选中菜单: ${labels}`)
}

// 弹窗关闭
const handleClose = () => {
  console.log('弹窗已关闭')
}
</script>

<template>
  <div class="tree-select-dialog-demo">
    <h2>TreeSelectDialog 树形选择弹窗</h2>

    <!-- 示例 1: 单选模式 -->
    <div class="demo-section">
      <h3>1. 单选模式</h3>
      <p>点击节点即可选择，只能选择一个节点</p>
      <el-button type="primary" @click="openDialog">打开单选弹窗</el-button>

      <MlTreeSelectDialog
        v-model="dialogVisible"
        title="选择菜单（单选）"
        width="600px"
        :tree-data="menuData"
        :tree-props="{ label: 'label', children: 'children' }"
        :default-selected-keys="defaultSelectedKeys"
        :multiple="false"
        @confirm="handleConfirm"
        @close="handleClose"
      />
    </div>

    <!-- 示例 2: 多选模式 -->
    <div class="demo-section">
      <h3>2. 多选模式</h3>
      <p>勾选复选框可选择多个节点</p>
      <el-button type="primary" @click="openDialog2">打开多选弹窗</el-button>

      <MlTreeSelectDialog
        v-model="dialogVisible2"
        title="选择菜单（多选）"
        width="600px"
        :tree-data="menuData"
        :tree-props="{ label: 'label', children: 'children' }"
        :default-selected-keys="defaultSelectedKeys2"
        :multiple="true"
        :default-expand-all="true"
        @confirm="handleConfirm2"
        @close="handleClose"
      />
    </div>

    <!-- 代码示例 -->
    <div class="demo-section">
      <h3>3. 代码示例</h3>
      <pre><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { MlTreeSelectDialog } from '@minilo/ui'

interface MenuNode {
  id: number
  label: string
  children?: MenuNode[]
}

const dialogVisible = ref(false)
const menuData = ref&lt;MenuNode[]&gt;([...])

const handleConfirm = (data: MenuNode | MenuNode[]) =&gt; {
  console.log('选中的数据:', data)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;el-button @click="dialogVisible = true"&gt;打开弹窗&lt;/el-button&gt;

  &lt;MlTreeSelectDialog
    v-model="dialogVisible"
    title="选择菜单"
    :tree-data="menuData"
    :tree-props="{ label: 'label', children: 'children' }"
    :multiple="false"
    @confirm="handleConfirm"
  /&gt;
&lt;/template&gt;</code></pre>
    </div>

    <!-- API 说明 -->
    <div class="demo-section">
      <h3>4. Props 属性</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>v-model</td>
            <td>弹窗显示状态</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>title</td>
            <td>弹窗标题</td>
            <td>string</td>
            <td>'树形选择'</td>
          </tr>
          <tr>
            <td>width</td>
            <td>弹窗宽度</td>
            <td>string</td>
            <td>'500px'</td>
          </tr>
          <tr>
            <td>treeData</td>
            <td>树形数据</td>
            <td>T[]</td>
            <td>-</td>
          </tr>
          <tr>
            <td>treeProps</td>
            <td>树形配置（同 Element Plus Tree）</td>
            <td>Record&lt;string, any&gt;</td>
            <td>{ label: 'label', children: 'children' }</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>是否多选</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>defaultExpandAll</td>
            <td>是否默认展开所有节点</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>defaultSelectedKeys</td>
            <td>默认选中的节点 key 数组</td>
            <td>any[]</td>
            <td>[]</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="demo-section">
      <h3>5. Events 事件</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>回调参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>confirm</td>
            <td>确认选择时触发</td>
            <td>(selectedData: T | T[]) =&gt; void</td>
          </tr>
          <tr>
            <td>close</td>
            <td>弹窗关闭时触发</td>
            <td>() =&gt; void</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.tree-select-dialog-demo {
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.demo-section h3 {
  margin-top: 0;
  color: #409eff;
}

.demo-section p {
  color: #606266;
  margin-bottom: 16px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.api-table th,
.api-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.api-table th {
  background: #f5f7fa;
  font-weight: 600;
  color: #606266;
}

.api-table tr:last-child td {
  border-bottom: none;
}

pre {
  background: #282c34;
  color: #abb2bf;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

pre code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
