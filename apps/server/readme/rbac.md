1. 用户表（users）
   存储系统用户基本信息：
   sql

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  password VARCHAR(100) NOT NULL COMMENT '加密后的密码',
  nickname VARCHAR(50) COMMENT '昵称',
  status TINYINT DEFAULT 1 COMMENT '状态（1：正常，0：禁用）',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

2. 角色表（roles）
   存储角色信息：

```sql
CREATE TABLE roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_code VARCHAR(50) NOT NULL UNIQUE COMMENT '角色标识（如：ADMIN、EDITOR）',
  role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
  description VARCHAR(200) COMMENT '角色描述',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

3. 权限表（permissions）
   存储权限信息（通常以 “资源：操作” 形式定义）：

```sql
CREATE TABLE permissions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  perm_code VARCHAR(100) NOT NULL UNIQUE COMMENT '权限标识（如：user:delete、order:view）',
  perm_name VARCHAR(100) NOT NULL COMMENT '权限名称（如：删除用户、查看订单）',
  resource VARCHAR(50) NOT NULL COMMENT '资源（如：user、order、menu）',
  action VARCHAR(50) NOT NULL COMMENT '操作（如：delete、view、edit）',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

4. 用户 - 角色关联表（user_roles）
   建立用户与角色的多对多关系：

```sql
CREATE TABLE user_roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL COMMENT '用户ID',
  role_id BIGINT NOT NULL COMMENT '角色ID',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_role (user_id, role_id), -- 避免重复关联
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```

5. 角色 - 权限关联表（role_permissions）
   建立角色与权限的多对多关系：

```sql
CREATE TABLE role_permissions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL COMMENT '角色ID',
  perm_id BIGINT NOT NULL COMMENT '权限ID',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_role_perm (role_id, perm_id), -- 避免重复关联
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (perm_id) REFERENCES permissions(id) ON DELETE CASCADE
);
```
