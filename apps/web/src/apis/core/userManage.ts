import instance from '../instance'

// 获取角色列表
export const getRolesList = () => instance.get('/role/allRoles')

// 更新用户信息
export const updateUser = (data: any) => instance.put('/user', data)

// 创建新用户
export const createUserByAdmin = (data: any) => instance.post('/user', data)

// 删除用户
export const deleteUser = (userId: number) => instance.delete(`/user/${userId}`)
