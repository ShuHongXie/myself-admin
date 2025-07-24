<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <div class="not-found-flag">404</div>
    <div class="not-found-content">
      <span class="title-header">系统提示</span>
      <span class="title-text">特朗普说这个页面你不能进......</span>
      <span class="title-tip"
        >请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</span
      >
      <div><el-button type="primary">返回上一页</el-button></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  &-flag {
    font-size: 150px;
    font-weight: bold;
    border-right: 1px solid #000;
    padding-right: 14px;
    color: #000;
  }
  &-content {
    padding-left: 14px;
    text-align: left;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    .title {
      &-header {
        font-size: 30px;
        font-weight: bold;
        line-height: 40px;
        margin-bottom: 10px;
        color: var(--el-color-primary);
      }
      &-text {
        font-size: 18px;
        line-height: 24px;
        color: var(--el-color-primary);
        margin-bottom: 10px;
      }
      &-tip {
        font-size: 13px;
        line-height: 20px;
        color: grey;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
