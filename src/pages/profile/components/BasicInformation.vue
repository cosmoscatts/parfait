<script setup lang="ts">
import type { User } from '~/types'

const {
  tabIdx = 1,
} = defineProps<{
  tabIdx?: number
}>()
type FormModel = Pick<User, 'id' | 'username' | 'name'>

const refForm = ref()
const authStore = useAuthStore()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])
const getBaseFormModel = () => {
  const { id, username, name } = G.clone(authStore.user!)
  return {
    id,
    username,
    name,
  }
}
let formModel = $ref<FormModel>(getBaseFormModel())
const resetFormModel = () => {
  formModel = getBaseFormModel()
  refForm.value?.clearValidate()
}
watch(() => tabIdx, resetFormModel)

function onSubmit() {
  refForm.value.validate(async (errors: any) => {
    if (errors) return
    UserApi
      .updateUser(JSON.parse(JSON.stringify(formModel)))
      .then(({ code, message }) => {
        if (code !== 0) {
          Message.error(message || '信息更新失败')
          return
        }
        Message.success('信息更新成功')
        authStore.updateUser({
          ...G.clone(authStore.user),
          name: formModel.name,
        })
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
</template>
