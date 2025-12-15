<script setup lang="ts">
import { ref } from 'vue'
import { MlTreeSelect, MlTreeSelectDialog, MlTreeSelectDrawer } from '../components'

// 定义树节点类型
interface MenuNode {
  id: number
  label: string
  parentId: number | null
  children?: MenuNode[]
}

// 弹窗/抽屉显示状态
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const drawerVisible = ref(false)
const drawerVisible2 = ref(false)

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
  },
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
  },
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

// TreeSelect 组件事件
const handleTreeSelectConfirm = (data: MenuNode | MenuNode[]) => {
  console.log('TreeSelect 选中的数据:', data)
  if (Array.isArray(data)) {
    alert(`TreeSelect 多选: ${data.map((item) => item.label).join(', ')}`)
  } else {
    alert(`TreeSelect 单选: ${data.label}`)
  }
}

const handleTreeSelectCancel = () => {
  console.log('TreeSelect 取消')
}

// Dialog 组件事件
const openDialog = () => {
  dialogVisible.value = true
}

const openDialog2 = () => {
  dialogVisible2.value = true
}

const handleDialogConfirm = (data: MenuNode | MenuNode[]) => {
  console.log('Dialog 单选选中的数据:', data)
  if (!Array.isArray(data)) {
    alert(`Dialog 单选: ${data.label}`)
  }
}

const handleDialogConfirm2 = (data: MenuNode | MenuNode[]) => {
  console.log('Dialog 多选选中的数据:', data)
  if (Array.isArray(data)) {
    alert(`Dialog 多选: ${data.map((item) => item.label).join(', ')}`)
  }
}

const handleDialogClose = () => {
  console.log('Dialog 已关闭')
}

// Drawer 组件事件
const openDrawer = () => {
  drawerVisible.value = true
}

const openDrawer2 = () => {
  drawerVisible2.value = true
}

const handleDrawerConfirm = (data: MenuNode | MenuNode[]) => {
  console.log('Drawer 单选选中的数据:', data)
  if (!Array.isArray(data)) {
    alert(`Drawer 单选: ${data.label}`)
  }
}

const handleDrawerConfirm2 = (data: MenuNode | MenuNode[]) => {
  console.log('Drawer 多选选中的数据:', data)
  if (Array.isArray(data)) {
    alert(`Drawer 多选: ${data.map((item) => item.label).join(', ')}`)
  }
}

const handleDrawerClose = () => {
  console.log('Drawer 已关闭')
}
</script>

<template>
  <div class="tree-select-demo">
    <h1>树形选择组件库</h1>

    <!-- ==================== TreeSelect 核心组件 ==================== -->
    <section class="component-section">
      <h2>1. MlTreeSelect 核心组件</h2>
      <p class="section-desc">核心树形选择组件，可嵌入到任意容器中使用</p>

      <!-- 单选示例 -->
      <div class="demo-section">
        <h3>1.1 单选模式</h3>
        <div class="demo-content">
          <MlTreeSelect
            :tree-data="menuData"
            :tree-props="{ label: 'label', children: 'children' }"
            :default-selected-keys="defaultSelectedKeys"
            :multiple="false"
            :show-search="true"
            @confirm="handleTreeSelectConfirm"
            @cancel="handleTreeSelectCancel"
          />
        </div>
      </div>

      <!-- 多选示例 -->
      <div class="demo-section">
        <h3>1.2 多选模式</h3>
        <div class="demo-content">
          <MlTreeSelect
            :tree-data="menuData"
            :tree-props="{ label: 'label', children: 'children' }"
            :default-selected-keys="defaultSelectedKeys2"
            :multiple="true"
            :show-search="true"
            @confirm="handleTreeSelectConfirm"
            @cancel="handleTreeSelectCancel"
          />
        </div>
      </div>
    </section>

    <!-- ==================== TreeSelectDialog 组件 ==================== -->
    <section class="component-section">
      <h2>2. MlTreeSelectDialog 弹窗组件</h2>
      <p class="section-desc">使用 el-dialog 包裹的树形选择组件</p>

      <!-- 单选示例 -->
      <div class="demo-section">
        <h3>2.1 单选模式</h3>
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
          @confirm="handleDialogConfirm"
          @close="handleDialogClose"
        />
      </div>

      <!-- 多选示例 -->
      <div class="demo-section">
        <h3>2.2 多选模式</h3>
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
          @confirm="handleDialogConfirm2"
          @close="handleDialogClose"
        />
      </div>
    </section>

    <!-- ==================== TreeSelectDrawer 组件 ==================== -->
    <section class="component-section">
      <h2>3. MlTreeSelectDrawer 抽屉组件</h2>
      <p class="section-desc">使用 el-drawer 包裹的树形选择组件</p>

      <!-- 单选示例 -->
      <div class="demo-section">
        <h3>3.1 单选模式</h3>
        <p>点击节点即可选择，只能选择一个节点</p>
        <el-button type="success" @click="openDrawer">打开单选抽屉</el-button>

        <MlTreeSelectDrawer
          v-model="drawerVisible"
          title="选择菜单（单选）"
          size="400px"
          direction="rtl"
          :tree-data="menuData"
          :tree-props="{ label: 'label', children: 'children' }"
          :default-selected-keys="defaultSelectedKeys"
          :multiple="false"
          @confirm="handleDrawerConfirm"
          @close="handleDrawerClose"
        />
      </div>

      <!-- 多选示例 -->
      <div class="demo-section">
        <h3>3.2 多选模式</h3>
        <p>勾选复选框可选择多个节点</p>
        <el-button type="success" @click="openDrawer2">打开多选抽屉</el-button>

        <MlTreeSelectDrawer
          v-model="drawerVisible2"
          title="选择菜单（多选）"
          size="450px"
          direction="rtl"
          :tree-data="menuData"
          :tree-props="{ label: 'label', children: 'children' }"
          :default-selected-keys="defaultSelectedKeys2"
          :multiple="true"
          :default-expand-all="true"
          @confirm="handleDrawerConfirm2"
          @close="handleDrawerClose"
        />
      </div>
    </section>

    <!-- ==================== API 文档 ==================== -->
    <section class="component-section">
      <h2>4. API 文档</h2>

      <!-- TreeSelect Props -->
      <div class="demo-section">
        <h3>4.1 MlTreeSelect Props</h3>
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
            <tr>
              <td>nodeKey</td>
              <td>节点唯一标识字段</td>
              <td>string</td>
              <td>'id'</td>
            </tr>
            <tr>
              <td>showSearch</td>
              <td>是否显示搜索框</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TreeSelect Events -->
      <div class="demo-section">
        <h3>4.2 MlTreeSelect Events</h3>
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
              <td>cancel</td>
              <td>取消选择时触发</td>
              <td>() =&gt; void</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TreeSelect Expose -->
      <div class="demo-section">
        <h3>4.3 MlTreeSelect Expose 方法</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>返回值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>reset()</td>
              <td>重置选择状态</td>
              <td>void</td>
            </tr>
            <tr>
              <td>getSelectedData()</td>
              <td>获取选中的数据</td>
              <td>T | T[]</td>
            </tr>
            <tr>
              <td>getSelectedKeys()</td>
              <td>获取选中的 keys</td>
              <td>any[]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Dialog 额外 Props -->
      <div class="demo-section">
        <h3>4.4 MlTreeSelectDialog 额外 Props</h3>
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
          </tbody>
        </table>
      </div>

      <!-- Drawer 额外 Props -->
      <div class="demo-section">
        <h3>4.5 MlTreeSelectDrawer 额外 Props</h3>
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
              <td>抽屉显示状态</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>title</td>
              <td>抽屉标题</td>
              <td>string</td>
              <td>'树形选择'</td>
            </tr>
            <tr>
              <td>size</td>
              <td>抽屉尺寸</td>
              <td>string | number</td>
              <td>'400px'</td>
            </tr>
            <tr>
              <td>direction</td>
              <td>抽屉方向</td>
              <td>'rtl' | 'ltr' | 'ttb' | 'btt'</td>
              <td>'rtl'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tree-select-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.tree-select-demo h1 {
  text-align: center;
  color: #303133;
  margin-bottom: 40px;
}

.component-section {
  margin-bottom: 60px;
}

.component-section > h2 {
  color: #303133;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.section-desc {
  color: #909399;
  margin-bottom: 20px;
}

.demo-section {
  margin-bottom: 30px;
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

.demo-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
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
