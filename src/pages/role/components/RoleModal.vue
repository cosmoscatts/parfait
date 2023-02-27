<script setup lang="ts">
import type { TreeNodeData } from '@arco-design/web-vue'
import type { Role } from '~/types'

const {
  visible = false,
  role = {},
  type = 'add',
  menuTreeData = [],
} = defineProps<{
  visible?: boolean
  role?: Role
  type?: 'add' | 'edit'
  menuTreeData?: TreeNodeData[]
}>()
const emits = defineEmits(['update:visible', 'saveRole'])

const refForm = ref()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])
const baseFormModel = {
  id: undefined,
  name: '',
  description: '',
  menuIdList: [],
}
type FormModel = Omit<Role, 'createTime' | 'updateTime'>

const formModel = reactive<FormModel>({
  ...baseFormModel,
})

const { loading, startLoading, endLoading } = useLoading()
function assign() {
  const target = (visible && type === 'edit')
    ? unref(role)
    : baseFormModel
  for (const [k, v] of Object.entries(target)) {
    if (!Object.prototype.hasOwnProperty.call(formModel, k)) continue
    formModel[k as keyof FormModel] = v
  }
}
watch(() => visible, (val) => {
  if (val) assign()
  endLoading()
  refForm.value?.clearValidate()
})

function handleOk() {
  refForm.value.validate((errors: any) => {
    if (errors) return
    startLoading()
    emits('saveRole', JSON.parse(JSON.stringify(formModel)))
  })
}

const allCheckedKeys = $computed<number[]>(() => {
  const keys: number[] = []
  const dfs = (keys: number[], node: TreeNodeData) => {
    if (node.key) keys.push(node.key as number)
    if (node.children?.length) {
      node.children.forEach((i: TreeNodeData) => dfs(keys, i))
    }
  }
  menuTreeData.forEach((i: TreeNodeData) => dfs(keys, i))
  return keys
})

const isAllChecked = $computed(() => {
  return [
    formModel.menuIdList,
    formModel.menuIdList?.length,
    formModel.menuIdList?.length === allCheckedKeys.length,
  ].filter(Boolean).length === 3
})

const toggleChecked = () => {
  formModel.menuIdList = isAllChecked
    ? []
    : allCheckedKeys
}

defineExpose({ endLoading })
</script>

<template>
  <a-modal
    :visible="visible"
    :width="600"
    :mask-closable="false"
    :ok-loading="loading"
    :ok-text="['添加', '更新'][Number(type === 'edit')]"
    @ok="handleOk"
    @cancel="$emit('update:visible', false)"
  >
    <template #title>
      {{ ['添加角色', '编辑角色'][type === 'add' ? 0 : 1] }}
    </template>
    <a-form ref="refForm" :model="formModel" auto-label-width size="large">
      <a-form-item
        field="name" label="角色名称" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色名称是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input
          v-model="formModel.name"
          placeholder="请输入角色名称..."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="description" label="角色描述" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色描述是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input
          v-model="formModel.description"
          placeholder="请输入角色描述..."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="menuIdList" label="角色权限" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色权限是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <div flex="~ col" wfull max-h-350px of-y-auto>
          <a-button
            type="text" font-bold w100px
            @click="toggleChecked"
          >
            {{ ['全选', '取消全选'][Number(isAllChecked)] }}
          </a-button>
          <a-tree
            v-if="menuTreeData?.length > 0"
            v-model:checked-keys="formModel.menuIdList"
            :checkable="true"
            :show-line="true"
            :data="menuTreeData"
          />
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
