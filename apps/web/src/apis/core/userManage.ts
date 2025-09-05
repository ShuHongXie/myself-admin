import instance from '../instance'

// 获取角色列表
export const getRolesList = () => instance.get('/role/list')
