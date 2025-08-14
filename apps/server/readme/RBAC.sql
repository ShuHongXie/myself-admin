drop table if exists sys_employee;
create table sys_employee (
  employee_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '唯一id',
  username VARCHAR(60) NOT NULL COMMENT '用户名',
  password VARCHAR(60) NOT NULL COMMENT '密码',
  nickname VARCHAR(60) DEFAULT NULL COMMENT '员工昵称',
  enable INT(10) DEFAULT 1 COMMENT '员工账户是否可用',
  create_time DATETIME NULL COMMENT '员工创建时间',
  update_time datetime comment '员工更新时间'
) COMMENT='员工信息表' ENGINE=InnoDB;

INSERT INTO sys_employee VALUES (11, '13005322685', '$2b$10$cZi5SHA917IAv9MgTHYqk.d4V6/tg5FmOEEHDN.EAHBA7oFyS1b/m', '13005322685', 1, '2024-09-10 21:42:43', NULL);


drop table if exists sys_role;
create table sys_role (
  role_id int(10) not null primary key auto_increment comment '角色id',
  role_name varchar(20) not null comment '角色名称',
  role_key varchar(100) not null comment '角色权限字符串',
  role_sort int(4) not null comment '显示顺序',
  create_time datetime comment '角色创建时间',
  update_time datetime comment '角色更新时间'
) COMMENT='角色信息表' ENGINE=InnoDB;

-- 插入默认数据
-- insert into sys_role values (1, '超级管理员', 'admin', 1, '2024-09-10', NULL);


drop table if exists sys_employee_role;
create table sys_employee_role (
  employee_id int(10) not null comment '用户id',
  role_id int(10) not null comment '角色id',
  primary key(employee_id, role_id)
) COMMENT='用户和角色关联表' ENGINE=InnoDB;

drop table if exists sys_menu;
create table sys_menu (
  menu_id int(10) not null primary key auto_increment comment '菜单id',
  menu_name varchar(64) not null comment '菜单名称',
  parent_id int(10) default 0 comment '父级菜单名称',
  order_num int(4) default 0 comment '显示顺序',
  path varchar(200) default '' comment '路由地址',
  is_cache int(1) default 0 comment '是否缓存（0缓存 1不缓存）',
  route_name varchar(50)  default '' comment '路由名称',
  menu_type char(1) default '' comment '菜单类型（M目录 C菜单 F按钮',
  visible char(1) default 0 comment '菜单状态（0显示 1隐藏）',
  icon varchar(100) default '' comment '菜单图标',
  remark varchar(500) default '' comment '备注',
  create_time datetime comment '创建时间',
  update_time datetime comment '更新时间'
) COMMENT='菜单权限表' ENGINE=InnoDB;


drop table if exists sys_role_menu;
create table sys_role_menu (
  role_id int(10) not null comment '角色id',
  menu_id int(10) not null comment '菜单id',
  primary key(role_id, menu_id)
) COMMENT='角色和菜单关联表' ENGINE=InnoDB;
