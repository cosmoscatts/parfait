export class UserApi {
  static fetchUserList() {
    return {
      code: 0,
      data: [
        {
          id: 1,
          username: 'zhangsan',
          name: '张三',
          password: 123456,
          avatar: null,
          phone: '13588822192',
          email: 'hahahahaha@163.com',
          roleId: 1,
          role: {
            id: 1,
            name: '管理员',
            description: '管理员',
            createTime: new Date('2022-06-19 09:42:35'),
            updateTime: new Date('2022-06-19 09:42:35'),
          },
          createTime: new Date('2022-06-19 09:42:35'),
          updateTime: new Date('2022-06-19 09:42:35'),
        },
        {
          id: 2,
          username: 'lisi',
          name: '李四',
          password: 123456,
          avatar: null,
          phone: '15281926679',
          email: 'hahahahaha@163.com',
          roleId: 2,
          role: {
            id: 2,
            name: '普通用户',
            description: '普通用户',
            createTime: new Date('2022-06-19 09:42:35'),
            updateTime: new Date('2022-06-19 09:42:35'),
          },
          createTime: new Date('2022-06-19 09:42:35'),
          updateTime: new Date('2022-06-19 09:42:35'),
        },
      ],
    }
  }
}
