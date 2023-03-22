<script setup lang="ts">
const {
  tabIdx = 1,
} = defineProps<{
  tabIdx?: number
}>()

const refForm = ref()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input', 'focus'])

const authStore = useAuthStore()

interface FormModel {
  id?: number
  password: string
  newPass: string
  checkPass: string
}

const baseFormModel: FormModel = {
  id: authStore.user!.id,
  password: '',
  newPass: '',
  checkPass: '',
}
let formModel = $ref<FormModel>({
  ...baseFormModel,
})

function resetFormModel() {
  formModel = {
    ...baseFormModel,
  }
  refForm.value?.clearValidate()
}

watch(() => tabIdx, resetFormModel)

const router = useRouter()
function onSubmit() {
  refForm.value.validate(async (errors: any) => {
    if (errors) return
    Message.success('密码修改成功, 请重新登录')
    useTimeoutFn(() => {
      router.push('/login')
      authStore.logout()
    }, 500)
  })
}
function validatePassword() {
  return {
    validator: (_: any, cb: any) => {
      const { newPass, checkPass } = formModel
      if (newPass === '' || checkPass === '') {
        cb()
      } else {
        if (newPass !== checkPass) cb('两次密码输入不一致')
        else cb()
      }
    },
  }
}

let hideLabel = $ref(false)
const { width } = useWindowSize()
watchEffect(() => hideLabel = unref(width) < 850)
</script>

<template>
  <a-form ref="refForm" :model="formModel" size="large" class="lg:!w-540px  md:!w-440px sm:!w-350px xs:!w-260px mx-auto">
    <a-form-item
      field="password" label="旧密码" hide-asterisk feedback
      :rules="[
        { required: true, message: '旧密码是必须的' },
      ]"
      :validate-trigger="validateTrigger"
      :hide-label="hideLabel"
    >
      <a-input-password
        v-model="formModel.password"
        placeholder="请输入你的旧密码..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="newPass" label="新密码" hide-asterisk feedback
      :rules="[
        { required: true, message: '新密码是必须的' },
      ]"
      :validate-trigger="validateTrigger"
      :hide-label="hideLabel"
    >
      <a-input-password
        v-model="formModel.newPass"
        placeholder="请输入你的新密码..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="checkPass" label="确认新密码" hide-asterisk feedback
      :rules="[
        { required: true, message: '确认新密码是必须的' },
        { ...validatePassword() },
      ]"
      :validate-trigger="validateTrigger"
      :hide-label="hideLabel"
    >
      <a-input-password
        v-model="formModel.checkPass"
        placeholder="请输入确认新密码..."
        allow-clear
      />
    </a-form-item>
    <div m="x-auto y-20px">
      <a-button
        mr-3 font-bold
        type="primary"
        @click="onSubmit"
      >
        更新密码
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
