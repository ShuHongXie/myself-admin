import { Injectable } from '@nestjs/common'
import { ResultData } from '@utils/ResultData'

@Injectable()
export class MockService {
  // 虚拟用户列表数据
  private mockUsers = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', status: 1 },
    { id: 2, name: '李四', email: 'lisi@example.com', status: 0 },
    { id: 3, name: '王五', email: 'wangwu@example.com', status: 1 },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 1 },
    { id: 5, name: '孙七', email: 'sunqi@example.com', status: 0 },
    { id: 6, name: '周八', email: 'zhouba@example.com', status: 1 },
    { id: 7, name: '吴九', email: 'wujiu@example.com', status: 0 },
    { id: 8, name: '郑十', email: 'zhengshi@example.com', status: 1 },
    { id: 9, name: '陈十一', email: 'chenshi@example.com', status: 1 },
    { id: 10, name: '刘十二', email: 'liushi@example.com', status: 0 }
  ]

  getMockUserList(data: any) {
    try {
      const { name, status, currentPage = 1, pageSize = 10 } = data

      // 过滤数据
      let filteredUsers = [...this.mockUsers]

      // 按名称过滤
      if (name && name.trim()) {
        filteredUsers = filteredUsers.filter((user) => user.name.includes(name))
      }

      // 按状态过滤
      if (status !== undefined && status !== '') {
        filteredUsers = filteredUsers.filter((user) => user.status === status)
      }

      // 分页
      const total = this.mockUsers.length
      const start = (currentPage - 1) * pageSize
      const end = start + pageSize
      const result = this.mockUsers

      return ResultData.success('获取用户列表成功', {
        result,
        total: total
        // total,
        // pageSize,
        // currentPage,
        // totalPages: Math.ceil(total / pageSize)
      })
    } catch (error) {
      return ResultData.fail('获取用户列表失败')
    }
  }
}
