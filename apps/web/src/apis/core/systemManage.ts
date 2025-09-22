import instance from '../instance'

// 用户登录
export const login = (data: { username: string; password: string; code: string }) =>
  instance.post('/user/login', data)

// 获取验证码
export const getCaptcha = () => instance.get('/user/captcha')

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

// 获取菜单详情
export const getMenuDetail = (menuId: number) => instance.get(`/menu/${menuId}`)

// 删除菜单
export const deleteMenu = (menuId: number) => instance.delete(`/menu/${menuId}`)

// 更新菜单
export const updateMenu = (menuId: number, data: any) => instance.put(`/menu/${menuId}`, data)

// 创建菜单
export const createMenu = (data: any) => instance.post('/menu', data)

// 获取用户按钮权限
export const getUserButtonPermissions = () => instance.get('/menu/buttonPermissions')
