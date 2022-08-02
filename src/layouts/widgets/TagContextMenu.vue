<script setup lang="ts">
import { IconArrowLeft, IconArrowRight, IconCloseCircle, IconRefresh } from '@arco-design/web-vue/es/icon'
import type { Tag } from '~/types'

const {
  index = -1,
  tags = [],
  hasLeftTags = true,
  hasRightTags = true,
} = defineProps<{
  index?: number
  tags?: Tag[]
  hasLeftTags?: boolean
  hasRightTags?: boolean
}>()

const router = useRouter()
const { removerOthers, removeTagsByList } = useTagsStore()

function refresh() {
  const tag = tags[index]
  if (!tag)
    return
  const { fullPath } = tag
  nextTick(() => {
    router.replace({
      path: `/redirect${fullPath}`,
    })
  })
}

function closeLeft() {
  if (!hasLeftTags)
    return
  const tag = tags[index]
  if (!tag)
    return
  const { fullPath } = tag
  router.push(fullPath!)
  removeTagsByList(tags.slice(0, index) || [])
}

function closeRight() {
  if (!hasRightTags)
    return
  const tag = tags[index]
  if (!tag)
    return
  const { fullPath } = tag
  router.push(fullPath!)
  removeTagsByList(tags.slice(index + 1) || [])
}

function closeOthers() {
  if (tags.length === 1)
    return
  const tag = tags[index]
  if (!tag)
    return
  const { fullPath } = tag
  router.push(fullPath!)
  removerOthers(tag)
}
</script>

<template>
  <a-doption @click="refresh">
    <template #icon>
      <IconRefresh />
    </template>
    刷新当前
  </a-doption>
  <a-doption :disabled="!hasLeftTags" @click="closeLeft">
    <template #icon>
      <IconArrowLeft />
    </template>
    关闭左边
  </a-doption>
  <a-doption :disabled="!hasRightTags" @click="closeRight">
    <template #icon>
      <IconArrowRight />
    </template>
    关闭右边
  </a-doption>
  <a-doption :disabled="tags.length <= 1" @click="closeOthers">
    <template #icon>
      <IconCloseCircle />
    </template>
    关闭其他
  </a-doption>
</template>
