<script setup lang="ts">
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon'

const {
  avatar = undefined,
} = defineProps<{
  avatar?: string
}>()
const emit = defineEmits(['update:avatar'])

const file = ref()
watch(() => avatar, (val) => {
  if (val) {
    file.value = {
      url: avatar,
    }
  }
})

function onChange(_: any, currentFile: any) {
  file.value = {
    ...currentFile,
  }
  emit('update:avatar', file.value.url)
}
function onProgress(currentFile: any) {
  file.value = currentFile
}
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <a-upload
      action="/"
      :file-list="file ? [file] : []"
      :show-file-list="false"
      :image-preview="true"
      @change="onChange"
      @progress="onProgress"
    >
      <template #upload-button>
        <div
          :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
        >
          <div
            v-if="file && file.url"
            class="arco-upload-list-picture custom-upload-avatar"
          >
            <img :src="file.url">
            <div class="arco-upload-list-picture-mask">
              <IconEdit />
            </div>
            <a-progress
              v-if="file.status === 'uploading' && file.percent < 100"
              :percent="file.percent"
              type="circle"
              size="mini"
              :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
            />
          </div>
          <div v-else class="arco-upload-picture-card">
            <div class="arco-upload-picture-card-text">
              <IconPlus />
              <div style="margin-top: 10px; font-weight: 600">
                上传
              </div>
            </div>
          </div>
        </div>
      </template>
    </a-upload>
  </a-space>
</template>
