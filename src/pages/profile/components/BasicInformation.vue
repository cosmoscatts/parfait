<!-- <script setup lang="ts">
import type { User } from '~/types'

const {
  tabIdx = 1,
} = defineProps<{
  tabIdx?: number
}>()

const refForm = ref()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

function getBaseFormModel() {
  const { id, username, name } = JSON.parse(JSON.stringify(unref(user))) as User
  return {
    id,
    username,
    name,
  }
}

let formModel = $ref<Record<string, any>>(getBaseFormModel())
function resetFormModel() {
  formModel = getBaseFormModel()
  refForm.value && refForm.value.clearValidate()
}

watch(() => tabIdx, resetFormModel)

function onSubmit() {
  refForm.value.validate(async (errors: any) => {
    if (errors)
      return
    const { id, username, name } = JSON.parse(JSON.stringify(unref(formModel)))
    const { code } = await UserApi.updateUser({
      id,
      username,
      name,
    }) as any
    if (code !== 0) {
      Message.error('信息更新失败')
      return
    }
    Message.success('信息更新成功')
    const userClone = JSON.parse(JSON.stringify(unref(user)))
    userStore.updateUser({
      ...userClone,
      name,
    })
  })
}
</script>

<template>
  <a-form ref="refForm" :model="formModel" size="large" class="lg:!w-540px  md:!w-440px sm:!w-350px xs:!w-260px mx-auto">
    <a-form-item
      field="name" label="名称" hide-asterisk feedback
      :rules="[
        { required: true, message: '名称是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.name"
        placeholder="请输入名称..."
        allow-clear
      />
    </a-form-item>
    <div m="x-auto y-20px">
      <a-button
        mr-3 font-bold
        type="primary"
        @click="onSubmit"
      >
        更新信息
      </a-button>
      <a-button
        font-bold
        @click="resetFormModel"
      >
        重置
      </a-button>
    </div>
  </a-form>
</template> -->
