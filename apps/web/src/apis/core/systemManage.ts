import instance from '../instance'

// 获取角色列表
export const getRolesList = () => instance.get('/role/allRoles')

// 更新用户信息
export const updateUser = (data: any) => instance.put('/user', data)

// 创建新用户
export const createUserByAdmin = (data: any) => instance.post('/user', data)

// 删除用户
export const deleteUser = (userId: number) => instance.delete(`/user/${userId}`)

// 获取用户信息
export const getRoleById = (roleId: number) => instance.get(`/role/${roleId}`)

// 更新角色信息
export const updateRole = (roleId: number, data: any) => instance.put(`/role/${roleId}`, data)

// 创建新角色
export const createRole = (data: any) => instance.post('/role', data)

// 删除角色
export const deleteRole = (roleId: number) => instance.delete(`/role/${roleId}`)

// 获取菜单树
export const getMenuTree = () => instance.get('/menu/info')
