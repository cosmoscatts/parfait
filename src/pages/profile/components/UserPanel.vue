<script lang="ts" setup>
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces'
import { IconCamera, IconEye } from '@arco-design/web-vue/es/icon'

const authStore = useAuthStore()
const avatar = computed(() => authStore.user?.avatar)
const getFileUrl = () => authStore.user?.avatar
  ? {
      url: authStore.user.avatar,
    } as FileItem
  : undefined
const file = ref<FileItem | undefined>(getFileUrl())
watch(avatar, () => file.value = getFileUrl())

function onChange(_: FileItem[], currentFile: FileItem) {
  file.value = {
    ...currentFile,
  }
  getBase64(file.value!.file!).then(async (imageAsDateURL) => {
    // const formData = {
    //   id: unref(user)?.id,
    //   avatar: imageAsDateURL,
    // }
    // const { code } = await UserApi.updateAvatar(formData) as any
    // if (code === 0) {
    Message.success('上传成功')
    authStore.updateUser({
      ...authStore.user,
      avatar: imageAsDateURL as string,
    })
    // }
    // else {
    //   Message.error('上传失败')
    // }
  })
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let imageAsDateURL = ''
    reader.readAsDataURL(file)
    reader.onload = (data) => {
      const res: any = data.target || data.srcElement
      imageAsDateURL = res.result
    }
    reader.onerror = (err) => {
      reject(err)
    }
    reader.onloadend = () => {
      resolve(imageAsDateURL)
    }
  })
}

const { width } = useWindowSize()
const imagePreviewVisible = ref(false)
const data = computed(() => {
  const _data = [
    {
      label: '账号',
      value: authStore.user?.username || '',
    },
    {
      label: '名称',
      value: authStore.user?.name || '',
    },
    {
      label: '创建时间',
      value: formatDate(authStore.user?.createTime),
    },
  ]
  return unref(width) < 1000
    ? _data.slice(0, 2)
    : _data
})

function beforeUpload(file: any): Promise<boolean | File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image')) {
      Message.error('请上传图片')
      return resolve(false)
    }
    resolve(true)
  })
}
</script>

<template>
  <a-card :bordered="false">
    <a-space :size="64" pl-25px>
      <a-upload
        :auto-upload="false"
        list-type="picture-card"
        :file-list="file ? [file] : []"
        :show-file-list="false"
        :image-preview="true"
        @change="onChange"
        @before-upload="beforeUpload"
      >
        <template #upload-button>
          <a-avatar :size="100" class="info-avatar" trigger-type="mask">
            <template #trigger-icon>
              <IconCamera text-24px />
            </template>
            <img v-if="file" :src="file.url">
          </a-avatar>
        </template>
      </a-upload>
      <div v-if="file?.url">
        <a-button type="text" @click="imagePreviewVisible = true">
          <IconEye />
          预览
        </a-button>
        <a-image-preview
          v-model:visible="imagePreviewVisible"
          :src="file.url"
        />
      </div>
      <a-descriptions
        lt-sm="hidden"
        :data="data"
        :column="2"
        align="right"
        :layout="width < 1000 ? 'horizontal' : 'inline-horizontal'"
        :label-style="{
          width: '100px',
          fontWeight: 'bold',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '180px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      />
    </a-space>
  </a-card>
</template>
