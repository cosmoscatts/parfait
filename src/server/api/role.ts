export class RoleApi {
  static fetchRoleList() {
    return {
      code: 0,
      data: [
        {
          id: 1,
          name: '管理员',
          description: '管理员',
          createTime: new Date('2022-06-19 09:42:35'),
          updateTime: new Date('2022-06-19 09:42:35'),
        },
        {
          id: 2,
          name: '普通用户',
          description: '普通用户',
          createTime: new Date('2022-06-19 09:42:35'),
          updateTime: new Date('2022-06-19 09:42:35'),
        },
      ],
    }
  }
}
