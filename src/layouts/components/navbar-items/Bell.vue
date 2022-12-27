<script setup lang="ts">
import { IconCalendar, IconMessage, IconNotification } from '@arco-design/web-vue/es/icon'
import type { Component } from 'vue'
import BellMessage from './BellMessage.vue'
import type { BellData, BellTabData } from './interfaces'

const activeKey = ref(0)
const tabList: BellTabData[] = [
  { name: '通知', color: '#FFB400', type: 'notification' },
  { name: '消息', color: '#F53F3F', type: 'message' },
  { name: '待办', color: '#165DFF', type: 'todo' },
]
const iconMap: { [key: string]: Component } = {
  notification: IconNotification,
  message: IconMessage,
  todo: IconCalendar,
}

let notificationData = $ref<BellData[]>([])
let messageData = $ref<BellData[]>([])
let todoData = $ref<BellData[]>([])

function queryData() {
  notificationData = [
    { title: '你收到了5条新消息', date: new Date() },
    { title: '你收到了10条新消息', date: new Date() },
    { title: '你收到了8条新消息', date: new Date() },
    { title: '你收到了5条新消息', date: new Date() },
    { title: '你收到了5条新消息', date: new Date() },
    { title: '你收到了5条新消息', date: new Date() },
  ]
  messageData = [{ title: '正在写页面...', date: new Date() }]
  todoData = [
    { title: '缓存主题配置', date: new Date() },
    { title: '自适应页面', date: new Date() },
  ]
}
queryData()

const getDataByKey = (key: number) => [notificationData, messageData, todoData][key]
const totalCnt = computed(() => {
  let cnt = 0
  if (notificationData?.length > 0)
    cnt += notificationData.length
  if (messageData?.length > 0)
    cnt += messageData.length
  if (todoData?.length > 0)
    cnt += todoData.length
  return cnt
})
</script>

<template>
  <div flex-y-center mt-2px>
    <a-popover trigger="click" position="br" :content-style="{ paddingBottom: 0 }">
      <a-badge :count="totalCnt" dot>
        <button i-carbon-notification icon-btn text-lg />
      </a-badge>
      <template #content>
        <a-tabs v-model:active-key="activeKey" w-420px flex="~ col" items-center type="rounded">
          <a-tab-pane v-for="{ name, type, color }, idx in tabList" :key="idx">
            <template #title>
              <div class="flex-center w-100px">
                <Component :is="iconMap[type]" :size="18" mr-2 />
                {{ name }}
                <a-badge
                  :count="getDataByKey(idx).length || 0" :max-count="99" ml-2
                  :dot-style="{
                    background: color,
                    boxShadow: `0 0 0 2px ${color}`,
                  }"
                />
              </div>
            </template>
            <BellMessage :type="type" :data="getDataByKey(idx)" />
          </a-tab-pane>
        </a-tabs>
        <div class="flex cursor-pointer">
          <div class="flex-1 text-center py-10px">
            <a-button>全部已读</a-button>
          </div>
          <div class="flex-1 text-center py-10px">
            <a-button>查看更多</a-button>
          </div>
        </div>
      </template>
    </a-popover>
  </div>
</template>
