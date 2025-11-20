<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import { MlSearch, MlChart, MlSearchTable } from '../index'

const form = ref({
  username: '',
  password: '',
  nickname: '',
  telephone: '',
  email: '',
  status: true,
  rolesId: [],
  isis: ''
})

const searchProps = ref({
  slots: [],
  item: [
    {
      prop: 'nickname',
      formItemProps: {
        label: '用户昵称'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入用户昵称'
        }
      }
    },
    {
      prop: 'username',
      formItemProps: {
        label: '登录ID'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入登录ID'
        }
      }
    },
    {
      prop: 'telephone',
      formItemProps: {
        label: '联系电话'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入联系电话'
        }
      }
    },
    {
      prop: 'status',
      formItemProps: {
        label: '用户状态'
      },
      input: {
        type: 'select',
        props: {
          placeholder: '请选择状态',
          labelWidth: '140px',
          labelKey: 'label',
          valueKey: 'value',
          clearable: true,
          options: [
            {
              label: '停用',
              value: false
            },
            {
              label: '启用',
              value: true
            }
          ]
        }
      }
    },
    {
      prop: 'isis',
      formItemProps: {
        label: '律师名称'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入律师名称'
        }
      }
    }
  ]
})

const options = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
})

onMounted(() => {})
</script>

<template>
  <div class="component-name">
    <div style="width: 400px; height: 400px">
      <MlChart :options="options"></MlChart>
    </div>
    <MlSearch v-bind="searchProps" v-model="form"></MlSearch>
    <MlSearchTable v-model:search="form" :search-props="searchProps" />
  </div>
</template>

<style lang="scss">
@use '../style/index.scss';
</style>
