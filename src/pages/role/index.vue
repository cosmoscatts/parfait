<script setup lang="ts">
import { IconFolder, IconPlus, IconSubscribe } from '@arco-design/web-vue/es/icon'
import type { TreeNodeData } from '@arco-design/web-vue'
import RoleSearchForm from './components/RoleSearchForm.vue'
import RoleModal from './components/RoleModal.vue'
import { columns } from './columns'
import type { Menu, Pagination, Role } from '~/types'

const authStore = useAuthStore()
const { loading, startLoading, endLoading } = useLoading()
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
let tabledata = $ref<Role[]>([])

interface FetchQuery extends Pagination {
  name?: string
  createTime?: [string, string]
  updateTime?: [string, string]
}

function fetchRoleData(params: FetchQuery) {
  params = { ...basePagination, ...params }
  startLoading()
  RoleApi
    .fetchRoleList(params)
    .then(({ data: { records = [], total } }) => {
      tabledata = records
      pagination.current = params.current
      pagination.total = total
    })
    .finally(() => useTimeoutFn(endLoading, 500))
}

const refSearchForm = ref()
function onPageChange(current: number) {
  if (!refSearchForm.value) return
  const params = JSON.parse(JSON.stringify(refSearchForm.value.formModel))
  fetchRoleData({ ...params, current })
}
function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}

function deleteRole({ id, name = '' }: Role) {
  if (id === authStore.user?.roleId) {
    Message.error('当前登录用户所属角色不可删除')
    return
  }
  const content = name === ''
    ? '确定要删除该角色吗?'
    : `确定要删除角色 (${name}) 吗?`
  Modal.info({
    title: '删除确认',
    content,
    hideCancel: false,
    onOk: () => {
      RoleApi
        .deleteRole({ id })
        .then(({ code, message }) => {
          if (code !== 0) {
            Message.error(message || '角色删除失败')
            return
          }
          Message.success('角色删除成功')
          onPageChange(pagination.current)
        })
    },
  })
}

let menuTreeData = $ref<TreeNodeData[]>()
function fetchMenuTreeData() {
  MenuApi
    .fetchMenuList()
    .then(({ data }) => {
      menuTreeData = data.map((i: Menu) => ({
        key: i.id,
        title: i.title,
        icon: () => h(IconFolder),
        children: i.children?.map((j: Menu) => ({
          key: j.id,
          title: j.title,
          icon: () => h(IconSubscribe),
        })) || [],
      } as unknown as TreeNodeData)) || []
    })
}
fetchMenuTreeData()

const router = useRouter()

let modalVisible = $ref(false)
let modalType = $ref<'add' | 'edit'>('add')
let selectedRole = $ref<Role>({})

function showModal(type: 'add' | 'edit', role = {}) {
  modalType = type
  selectedRole = role
  modalVisible = true
}

const refModal = ref()
async function saveRole(data: Role) {
  const { addRole: add, updateRole: update } = RoleApi
  const fn = [add, update][Number(modalType === 'edit')]
  fn(data)
    .then(({ code, message }) => {
      if (code !== 0) {
        Message.error(message || '保存失败')
        return
      }
      Message.success('保存成功')
      useTimeoutFn(() => {
        modalVisible = false
        onPageChange(pagination.current)
        if (
          modalType === 'edit'
          && authStore.user?.roleId === data.id
          && checkRoleMenuListChanged(data)
        ) {
          Message.warning('当前角色权限发生改变, 请重新登录')
          router.push('/login')
          authStore.logout()
        }
      }, 500)
    })
    .finally(() => refModal.value?.endLoading())
}

function checkRoleMenuListChanged(newRole: Role) {
  const originMenuIdList = authStore.menus.map(i => i.id)
  if (originMenuIdList.length !== newRole.menuIdList!.length) return true
  let changed = false
  let idx = 0
  const checkList = newRole.menuIdList!
  while (!changed && idx < checkList.length) {
    if (!originMenuIdList.includes(checkList[idx])) {
      changed = true
      break
    }
    idx++
  }
  return changed
}
</script>

<template>
  <div>
    <a-card title="查询角色">
      <template #extra>
        <a-button type="text" size="small" font-bold @click="showModal('add')">
          <template #icon>
            <IconPlus />
          </template>
          添加
        </a-button>
      </template>
      <RoleSearchForm ref="refSearchForm" @fetch-data="fetchRoleData" />
      <a-table
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data="tabledata"
        :bordered="false"
        :pagination="pagination.total! > pagination.pageSize ? pagination : false"
        @page-change="onPageChange"
      >
        <template #id="{ rowIndex }">
          {{ formatRowIndex(rowIndex) }}
        </template>
        <template #name="{ record }">
          <span text-primary font-bold>{{ record.name ?? '无' }}</span>
        </template>
        <template #createTime="{ record }">
          {{ formatDate(record.createTime) }}
        </template>
        <template #updateTime="{ record }">
          {{ formatDate(record.updateTime) }}
        </template>
        <template #action="{ record }">
          <a-button type="text" size="small" font-bold @click="showModal('edit', record)">
            编辑
          </a-button>
          <a-button type="text" size="small" font-bold @click="deleteRole(record)">
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>
    <RoleModal
      ref="refModal"
      v-model:visible="modalVisible"
      :type="modalType"
      :role="selectedRole"
      :menu-tree-data="menuTreeData"
      @save-role="saveRole"
    />
  </div>
</template>
