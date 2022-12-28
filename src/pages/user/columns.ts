import type { TableColumnData } from '@arco-design/web-vue'

export const columns: TableColumnData[] = [
  {
    title: '序号',
    dataIndex: 'id',
    slotName: 'id',
    align: 'center',
  },
  {
    title: '用户账号',
    dataIndex: 'username',
    slotName: 'username',
    align: 'center',
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    slotName: 'name',
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    slotName: 'roleId',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    slotName: 'createTime',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    slotName: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    align: 'center',
  },
]
